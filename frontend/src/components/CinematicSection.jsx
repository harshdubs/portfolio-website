import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Section that arrives with a serious cinematic entrance and exits the same way.
 *  - Curtain wipes from the side as the section enters frame.
 *  - 3D rotateX page-fold (book opening).
 *  - Subtle parallax on inner content.
 *  - Refolds and exits when scrolled past.
 */
export default function CinematicSection({
  children,
  className = '',
  intensity = 1,
  flip = false,
  curtainColor = '#0a0a0a',
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 })

  const k = flip ? -1 : 1

  // Page-fold rotation
  const rotateX = useTransform(
    sp,
    [0, 0.22, 0.78, 1],
    reduce ? [0, 0, 0, 0] : [k * -85 * intensity, 0, 0, k * 70 * intensity]
  )
  const scale = useTransform(
    sp,
    [0, 0.22, 0.78, 1],
    reduce ? [1, 1, 1, 1] : [0.78, 1, 1, 0.82]
  )
  const opacity = useTransform(sp, [0, 0.18, 0.82, 1], [0, 1, 1, 0])
  const filter = useTransform(
    sp,
    [0, 0.2, 0.8, 1],
    reduce ? ['none', 'none', 'none', 'none'] : ['blur(14px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
  )
  const yPar = useTransform(sp, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-8%'])

  // Curtain wipe — slides off as section enters, slides back as it leaves
  const curtainLeft = useTransform(sp, [0, 0.22, 0.78, 1], ['0%', '-100%', '-100%', '-100%'])
  const curtainRight = useTransform(sp, [0, 0.22, 0.78, 1], ['0%', '100%', '100%', '100%'])
  const curtainOpacity = useTransform(sp, [0, 0.22], reduce ? [0, 0] : [1, 0])

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          filter,
          transformOrigin: flip ? 'center bottom' : 'center top',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
        }}
      >
        <motion.div style={{ y: yPar, willChange: 'transform' }}>
          {children}
        </motion.div>
      </motion.div>

      {/* Curtain wipes (theatre style) */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/2 z-30"
            style={{
              x: curtainLeft,
              opacity: curtainOpacity,
              background: `linear-gradient(90deg, ${curtainColor} 70%, transparent)`,
            }}
          />
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/2 z-30"
            style={{
              x: curtainRight,
              opacity: curtainOpacity,
              background: `linear-gradient(-90deg, ${curtainColor} 70%, transparent)`,
            }}
          />
          {/* thin scanline as the wipe meets in the middle */}
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px z-30 bg-gradient-to-b from-transparent via-accent to-transparent"
            style={{ opacity: curtainOpacity }}
          />
        </>
      )}
    </div>
  )
}
