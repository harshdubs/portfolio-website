import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#achievements', label: 'Achievements' },
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

  const handleNav = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? 'bg-primary/85 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
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
            className="md:hidden relative w-11 h-11 flex flex-col justify-center items-center gap-[5px] touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block h-px w-6 bg-text-primary transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-px w-6 bg-text-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-text-primary transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-400 ease-out ${isOpen ? 'max-h-[640px]' : 'max-h-0'}`}
          style={{ paddingBottom: isOpen ? 'env(safe-area-inset-bottom, 0px)' : 0 }}
        >
          <div className="flex flex-col py-2 divide-y divide-white/[0.05]">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`flex items-center px-2 py-3 min-h-[48px] text-base touch-manipulation transition-colors duration-200 ${
                  activeSection === link.href.slice(1) ? 'text-accent' : 'text-text-primary'
                }`}
              >
                <span className="font-mono text-accent/50 text-xs mr-3 w-8">0{i + 1}.</span>
                <span className="flex-1">{link.label}</span>
                <span className="text-text-secondary/40 text-sm">&rarr;</span>
              </motion.a>
            ))}
            <div className="flex items-center justify-between gap-3 pt-4 pb-2 px-2">
              <a
                href="https://github.com/harshdubs"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] text-text-secondary text-sm hover:text-accent hover:border-accent/30 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/harsh-dubey-1b169a242"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-accent/10 text-accent text-sm font-medium transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
