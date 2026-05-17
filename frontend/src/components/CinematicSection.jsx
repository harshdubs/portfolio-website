import { motion } from 'framer-motion'

/**
 * Lightweight section wrapper — a simple fade/slide-in on view.
 * Earlier this ran heavy scroll-linked rotateX/scale/blur + curtain overlays per
 * section, which caused jank and hid content at low zoom levels (when scroll
 * progress for later sections never reached the "open" range, sections stayed
 * blurred / rotated out / covered by the curtain wipes).
 */
// eslint-disable-next-line no-unused-vars
export default function CinematicSection({ children, className = '', intensity, flip, curtainColor }) {
  return (
    <motion.div
      className={`relative w-full ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
