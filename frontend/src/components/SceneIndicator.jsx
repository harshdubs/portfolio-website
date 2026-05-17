import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const scenes = [
  { id: 'hero',      label: 'Opening' },
  { id: 'about',     label: 'About' },
  { id: 'skills',    label: 'Toolbox' },
  { id: 'projects',  label: 'Projects' },
  { id: 'experience',label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact',   label: 'Contact' },
]

export default function SceneIndicator() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sectionEls = scenes
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    if (!sectionEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = scenes.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { threshold: 0.4 }
    )
    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const current = scenes[active]

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <div className="hidden lg:flex fixed top-1/2 right-6 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80"
        >
          Scene {String(active + 1).padStart(2, '0')} · {current.label}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        {scenes.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="pointer-events-auto group relative flex items-center justify-end h-3"
            aria-label={`Go to ${s.label}`}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              {s.label}
            </span>
            <motion.span
              className="block rounded-full"
              animate={{
                width: i === active ? 24 : 8,
                height: 2,
                backgroundColor: i === active ? '#00ff88' : 'rgba(255,255,255,0.18)',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
