import { motion } from 'framer-motion'

const shapes = [
  { size: 60, x: '10%', y: '20%', delay: 0, duration: 8, color: 'accent' },
  { size: 40, x: '85%', y: '15%', delay: 1.5, duration: 10, color: 'purple' },
  { size: 80, x: '70%', y: '70%', delay: 0.5, duration: 12, color: 'accent' },
  { size: 30, x: '20%', y: '75%', delay: 2, duration: 9, color: 'purple' },
  { size: 50, x: '50%', y: '40%', delay: 3, duration: 11, color: 'accent' },
  { size: 25, x: '90%', y: '50%', delay: 1, duration: 7, color: 'purple' },
]

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: s.color === 'accent'
              ? 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
            border: `1px solid ${s.color === 'accent' ? 'rgba(0,255,136,0.06)' : 'rgba(124,58,237,0.06)'}`,
          }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -5, 8, 0],
            rotate: [0, 5, -3, 4, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Horizontal scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.06), transparent)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
