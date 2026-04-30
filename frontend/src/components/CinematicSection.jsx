import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Wraps a section so it unfolds on scroll-in and refolds on scroll-out,
 * like a page turning. Drives rotateX, scale, opacity, and blur from
 * the section's progress through the viewport.
 */
export default function CinematicSection({
  children,
  className = '',
  intensity = 1,
  flip = false, // unfold from top vs bottom
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Page-fold: rotateX goes from -90 -> 0 -> 0 -> 90 (or reversed)
  const k = flip ? -1 : 1
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    reduce ? [0, 0, 0, 0] : [k * -75 * intensity, 0, 0, k * 75 * intensity]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    reduce ? [1, 1, 1, 1] : [0.85, 1, 1, 0.85]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.15, 1, 1, 0.15]
  )
  const filter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduce ? ['none', 'none', 'none', 'none'] : ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
  )

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          filter,
          transformOrigin: flip ? 'center bottom' : 'center top',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
