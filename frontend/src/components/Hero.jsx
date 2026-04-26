import { useState, useEffect } from 'react'

const titles = ['Data Engineer', 'IoT Engineer', 'AI Engineer']

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = titles[titleIndex]
    let timeout

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 80)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 40)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTitleIndex((titleIndex + 1) % titles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, titleIndex])

  const displayText = titles[titleIndex].substring(0, charIndex)

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-3xl text-center">
        <p className="font-mono text-accent text-sm tracking-wider mb-6 uppercase">
          Hello, I&apos;m
        </p>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary tracking-tight leading-[1.1] mb-4">
          Harsh Dubey
        </h1>

        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <span className="font-heading text-xl sm:text-2xl text-text-secondary">
            {displayText}
          </span>
          <span className="cursor-blink text-accent text-xl sm:text-2xl ml-0.5 font-light">|</span>
        </div>

        <p className="text-text-secondary max-w-lg mx-auto mb-10 text-base leading-relaxed">
          3 years building industrial data systems at Continental.
          Now engineering the shift to AI — one project at a time.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="group px-7 py-3 border border-accent/40 text-accent rounded-lg font-medium text-sm tracking-wide hover:bg-accent hover:text-primary transition-all duration-300"
          >
            View Work
            <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform duration-300">&rarr;</span>
          </a>
          <a
            href="#contact"
            className="px-7 py-3 border border-border text-text-secondary rounded-lg font-medium text-sm tracking-wide hover:border-accent-purple hover:text-accent-purple transition-all duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
