import { motion } from 'framer-motion'

export default function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-4 mb-12 overflow-hidden">
      <motion.span
        className="font-mono text-accent text-sm"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        {number}
      </motion.span>
      <motion.h2
        className="font-heading text-3xl font-bold text-text-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="flex-1 h-px bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ originX: 0 }}
      />
    </div>
  )
}
