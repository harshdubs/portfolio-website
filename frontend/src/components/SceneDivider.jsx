import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Cinema clapperboard divider — film-strip perforations + animated slate that
 * snaps shut when scrolled into view, with a "TAKE ##" stamp.
 */
export default function SceneDivider({ label, take = '01' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // strip translates horizontally as you scroll past — gives the "film passing through projector" feel
  const stripX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
  const stripXReverse = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])

  return (
    <div
      ref={ref}
      className="relative w-full py-12 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      {/* film perforation strip — top */}
      <motion.div
        className="absolute top-2 left-0 right-0 h-3 flex gap-3 px-4"
        style={{ x: stripX }}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="block w-4 h-3 rounded-sm bg-white/[0.04] shrink-0" />
        ))}
      </motion.div>
      {/* film perforation strip — bottom */}
      <motion.div
        className="absolute bottom-2 left-0 right-0 h-3 flex gap-3 px-4"
        style={{ x: stripXReverse }}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="block w-4 h-3 rounded-sm bg-white/[0.04] shrink-0" />
        ))}
      </motion.div>

      {/* clapperboard slate */}
      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          className="relative rounded-md border border-white/[0.08] bg-black/60 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-25%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* clapper top — diagonal striped bar that snaps closed */}
          <div className="relative h-7 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(115deg, #f0f0f0 0 18px, #0a0a0a 18px 36px)',
                transformOrigin: 'left center',
              }}
              initial={{ rotateZ: -18, y: -30, opacity: 0 }}
              whileInView={{ rotateZ: 0, y: 0, opacity: 1 }}
              viewport={{ once: false, margin: '-25%' }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.6, -0.05, 0.5, 1.05] }}
            />
            {/* sharp impact accent line when slate closes */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-accent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: [0, 1, 0.4] }}
              viewport={{ once: false, margin: '-25%' }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </div>

          {/* slate body */}
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-5 py-3 items-center font-mono text-[11px] tracking-[0.25em] uppercase">
            <motion.span
              className="text-accent"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-25%' }}
              transition={{ delay: 0.7 }}
            >
              ◉ Scene
            </motion.span>
            <motion.span
              className="text-text-primary text-center text-[13px] tracking-[0.3em]"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
              viewport={{ once: false, margin: '-25%' }}
              transition={{ duration: 0.7, delay: 0.75 }}
            >
              {label}
            </motion.span>
            <motion.span
              className="text-accent-purple"
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-25%' }}
              transition={{ delay: 0.7 }}
            >
              Take {take}
            </motion.span>
          </div>
        </motion.div>

        {/* gradient line beneath */}
        <motion.div
          className="mt-4 h-px mx-auto max-w-md"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.5), rgba(124,58,237,0.5), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: '-25%' }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
