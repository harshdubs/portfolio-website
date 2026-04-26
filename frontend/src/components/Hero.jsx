import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const titles = ['Data & IoT Engineer', 'Data Analyst', 'Software Developer']

function ParticleCanvas() {
  const canvasRef = useRef(null)

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

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 20 : 40
    const particles = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < count; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 255, 136, 0.12)'
        ctx.fill()
      }

      // lines between close particles — limit checks for perf
      ctx.lineWidth = 0.4
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < 14400) { // 120^2
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.035 * (1 - dist / 120)})`
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
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
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <ParticleCanvas />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        <motion.p
          className="font-mono text-accent text-sm tracking-wider mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary tracking-tight leading-[1.1] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          Harsh Dubey
        </motion.h1>

        <motion.div
          className="h-10 sm:h-12 flex items-center justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
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
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          3 years at Continental India building production-grade data pipelines,
          real-time analytics, and industrial IoT systems. Represented Continental
          across Germany, China, and Thailand.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          <a
            href="#projects"
            className="group px-7 py-3 border border-accent/40 text-accent rounded-lg font-medium text-sm tracking-wide hover:bg-accent hover:text-primary transition-all duration-300"
          >
            View Work
            <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform duration-300">&rarr;</span>
          </a>
          <a
            href="#contact"
            className="px-7 py-3 border border-white/10 text-text-secondary rounded-lg font-medium text-sm tracking-wide hover:border-accent-purple hover:text-accent-purple transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  )
}
