import { motion } from 'framer-motion'

/**
 * Slim scene divider — label + gradient hairline. Heavy film-strip
 * perforations and scroll-linked transforms were removed for performance.
 */
export default function SceneDivider({ label, take = '01' }) {
  return (
    <div
      className="relative w-full py-8 px-4 pointer-events-none select-none"
      aria-hidden
    >
      <motion.div
        className="max-w-md mx-auto flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-accent">◉</span>
        <span className="text-text-secondary flex-1 truncate text-center">{label}</span>
        <span className="text-accent-purple">T{take}</span>
      </motion.div>
      <motion.div
        className="mt-3 h-px max-w-md mx-auto"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.4), rgba(124,58,237,0.4), transparent)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
