import { motion } from 'framer-motion'

export default function SceneDivider({ label }) {
  return (
    <div className="relative w-full py-8 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.4) 50%, transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, margin: '-30%' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="relative flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-text-secondary/50"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-30%' }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        {label}
        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/60" />
      </motion.div>
    </div>
  )
}
