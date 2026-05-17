import { useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

export default function GlowCard({ children, className = '', glowColor = 'rgba(0, 255, 136, 0.15)' }) {
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 })

  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>
  }

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    })
  }

  const handleMouseLeave = () => setGlow((g) => ({ ...g, opacity: 0 }))

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, ${glowColor}, transparent 60%)`,
        }}
      />
      {/* Glowing border highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: glow.opacity * 0.6,
          background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, ${glowColor}, transparent 50%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
