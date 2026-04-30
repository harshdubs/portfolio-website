import { motion, AnimatePresence } from 'framer-motion'

/**
 * Black cinematic bars top + bottom. Active when `show` is true.
 */
export default function Letterbox({ show, label }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed top-0 left-0 right-0 z-[60] bg-black pointer-events-none flex items-end justify-between px-6 pb-2"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ height: '7vh' }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent/80">
              ● REC
            </span>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-text-secondary/70">
              {label || 'auto-play'}
            </span>
          </motion.div>
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[60] bg-black pointer-events-none flex items-start justify-between px-6 pt-2"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ height: '7vh' }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-text-secondary/70">
              SCROLL TO TAKE CONTROL
            </span>
            <motion.span
              className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent/80"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ▮ PLAYING
            </motion.span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
