import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    let x = -200
    let y = -200
    let currentX = -200
    let currentY = -200
    let raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
    }

    const animate = () => {
      // Lerp for silky smooth follow
      currentX += (x - currentX) * 0.15
      currentY += (y - currentY) * 0.15

      if (ref.current) {
        ref.current.style.transform = `translate3d(${currentX - 150}px, ${currentY - 150}px, 0)`
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[55] w-[300px] h-[300px] rounded-full opacity-[0.06] hidden md:block will-change-transform"
      style={{
        background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)',
      }}
    />
  )
}
