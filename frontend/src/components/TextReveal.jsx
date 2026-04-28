import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function TextReveal({ children, className = '', delay = 0, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function WordReveal({ text, className = '', wordClassName = '', delay = 0, stagger = 0.04 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: '110%', rotateX: 45 }}
            animate={inView ? { y: '0%', rotateX: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function CharReveal({ text, className = '', charClassName = '', delay = 0, stagger = 0.02 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${charClassName}`}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
