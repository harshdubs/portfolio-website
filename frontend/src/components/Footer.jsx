import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="w-full py-8 px-6 border-t border-white/[0.06]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <motion.p
          className="text-text-secondary text-xs"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Designed &amp; built by{' '}
          <span className="text-text-primary hover:text-accent transition-colors duration-300">
            Harsh Dubey
          </span>
        </motion.p>
        <motion.p
          className="font-mono text-text-secondary/40 text-[10px] tracking-wider"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {new Date().getFullYear()}
        </motion.p>
      </div>
    </motion.footer>
  )
}
