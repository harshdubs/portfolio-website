import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FloatingShapes from './FloatingShapes'
import MagneticButton from './MagneticButton'
import { CharReveal } from './TextReveal'

const titles = ['Data & IoT Engineer', 'Data Analyst', 'Software Developer']

function ParticleCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let w, h

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 20 : 50
    const particles = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        baseR: Math.random() * 1.5 + 0.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < count; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Mouse repulsion
        const dmx = p.x - mx
        const dmy = p.y - my
        const distMouse = Math.sqrt(dmx * dmx + dmy * dmy)
        if (distMouse < 150) {
          const force = (150 - distMouse) / 150
          p.x += (dmx / distMouse) * force * 2
          p.y += (dmy / distMouse) * force * 2
          p.r = p.baseR + force * 2 // grow near cursor
        } else {
          p.r += (p.baseR - p.r) * 0.05
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = distMouse < 150
          ? `rgba(0, 255, 136, ${0.15 + (150 - distMouse) / 150 * 0.3})`
          : 'rgba(0, 255, 136, 0.12)'
        ctx.fill()
      }

      ctx.lineWidth = 0.4
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < 14400) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.04 * (1 - dist / 120)})`
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const tick = useCallback(() => {
    const current = titles[titleIndex]
    if (!isDeleting && charIndex < current.length) {
      return { next: charIndex + 1, delay: 80 }
    } else if (!isDeleting && charIndex === current.length) {
      return { pause: true, delay: 2000 }
    } else if (isDeleting && charIndex > 0) {
      return { next: charIndex - 1, delay: 40 }
    }
    return null
  }, [charIndex, isDeleting, titleIndex])

  useEffect(() => {
    const result = tick()
    if (!result) {
      setIsDeleting(false)
      setTitleIndex((titleIndex + 1) % titles.length)
      return
    }
    const timeout = setTimeout(() => {
      if (result.pause) {
        setIsDeleting(true)
      } else {
        setCharIndex(result.next)
      }
    }, result.delay)
    return () => clearTimeout(timeout)
  }, [tick, titleIndex])

  const displayText = titles[titleIndex].substring(0, charIndex)

  return (
    <section id="hero" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <ParticleCanvas />
      <FloatingShapes />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.p
          className="font-mono text-accent text-sm tracking-wider mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.7 }}
        >
          <CharReveal
            text="Harsh Dubey"
            className="shimmer-text"
            delay={1.8}
            stagger={0.04}
          />
        </motion.h1>

        <motion.div
          className="h-10 sm:h-12 flex items-center justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <span className="font-heading text-xl sm:text-2xl text-text-secondary">
            {displayText}
          </span>
          <span className="cursor-blink text-accent text-xl sm:text-2xl ml-0.5 font-light">|</span>
        </motion.div>

        <motion.p
          className="text-text-secondary max-w-lg mx-auto mb-10 text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          3 years at Continental India building production-grade data pipelines,
          real-time analytics, and industrial IoT systems. Represented Continental
          across Germany, China, and Thailand.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          <MagneticButton strength={0.25}>
            <a
              href="#projects"
              className="group relative px-7 py-3 border border-accent/40 text-accent rounded-lg font-medium text-sm tracking-wide hover:bg-accent hover:text-primary transition-all duration-300 overflow-hidden inline-block"
            >
              <span className="relative z-10">
                View Work
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </span>
              <span className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a
              href="#contact"
              className="group relative px-7 py-3 border border-white/10 text-text-secondary rounded-lg font-medium text-sm tracking-wide hover:border-accent-purple hover:text-accent-purple transition-all duration-300 overflow-hidden inline-block"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-accent-purple/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
            </a>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          <span className="text-text-secondary/40 text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5"
            animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(0,255,136,0.3)', 'rgba(255,255,255,0.1)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-accent/60"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
