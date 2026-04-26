import { useEffect, useState } from 'react'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    const handler = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[55] w-[300px] h-[300px] rounded-full opacity-[0.07] hidden md:block"
      style={{
        background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)',
        left: pos.x - 150,
        top: pos.y - 150,
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  )
}
