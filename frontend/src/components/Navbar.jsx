import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#dsa', label: 'DSA' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map((l) => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i])
          return
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary/70 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <MagneticButton strength={0.2}>
            <a href="#" className="font-heading font-bold text-lg text-text-primary hover:text-accent transition-colors duration-300">
              HD<span className="text-accent">.</span>
            </a>
          </MagneticButton>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <MagneticButton key={link.href} strength={0.15}>
                  <a
                    href={link.href}
                    className={`relative px-3 py-2 text-[13px] tracking-wide transition-colors duration-300 group ${
                      isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="font-mono text-accent/50 text-[10px] mr-1">0{i + 1}.</span>
                    {link.label}
                    {/* Animated underline */}
                    <motion.span
                      className="absolute bottom-0.5 left-3 right-3 h-px bg-accent"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                    />
                    {/* Hover underline (non-active) */}
                    {!isActive && (
                      <span className="absolute bottom-0.5 left-3 right-3 h-px bg-text-secondary/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    )}
                  </a>
                </MagneticButton>
              )
            })}
          </div>

          <button
            className="md:hidden relative w-6 h-5 flex flex-col justify-between"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-full bg-text-secondary transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-full bg-text-secondary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-full bg-text-secondary transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 pb-6' : 'max-h-0'}`}>
          <div className="space-y-1 pt-2">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`block px-3 py-2.5 text-sm transition-colors duration-300 ${
                  activeSection === link.href.slice(1) ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="font-mono text-accent/40 text-xs mr-2">0{i + 1}.</span>
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
