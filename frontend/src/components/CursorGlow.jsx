import { useEffect, useRef, useState } from 'react'

const CURSOR_STATES = {
  default: {
    size: 300,
    color: 'radial-gradient(circle, #00ff88 0%, transparent 70%)',
    opacity: 0.06,
  },
  link: {
    size: 400,
    color: 'radial-gradient(circle, #7c3aed 0%, #00ff88 50%, transparent 70%)',
    opacity: 0.1,
  },
  button: {
    size: 200,
    color: 'radial-gradient(circle, #00ff88 0%, #7c3aed 60%, transparent 70%)',
    opacity: 0.12,
  },
  input: {
    size: 250,
    color: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
    opacity: 0.08,
  },
}

function getCursorState(el) {
  if (!el) return 'default'
  const tag = el.tagName
  if (tag === 'BUTTON' || el.closest('button') || el.closest('[role="button"]')) return 'button'
  if (tag === 'A' || el.closest('a')) return 'link'
  if (tag === 'INPUT' || tag === 'TEXTAREA' || el.closest('input') || el.closest('textarea')) return 'input'
  if (el.closest('[data-magnetic]') || el.closest('[data-glow-card]')) return 'button'
  return 'default'
}

export default function CursorGlow() {
  const ref = useRef(null)
  const stateRef = useRef('default')

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    let x = -400
    let y = -400
    let currentX = -400
    let currentY = -400
    let currentSize = CURSOR_STATES.default.size
    let currentOpacity = CURSOR_STATES.default.opacity
    let raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY

      const state = getCursorState(e.target)
      stateRef.current = state
    }

    const animate = () => {
      currentX += (x - currentX) * 0.15
      currentY += (y - currentY) * 0.15

      const target = CURSOR_STATES[stateRef.current]
      currentSize += (target.size - currentSize) * 0.1
      currentOpacity += (target.opacity - currentOpacity) * 0.1

      if (ref.current) {
        const half = currentSize / 2
        ref.current.style.transform = `translate3d(${currentX - half}px, ${currentY - half}px, 0)`
        ref.current.style.width = `${currentSize}px`
        ref.current.style.height = `${currentSize}px`
        ref.current.style.opacity = currentOpacity
        ref.current.style.background = target.color
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
      className="pointer-events-none fixed top-0 left-0 z-[55] rounded-full hidden md:block will-change-transform"
      style={{
        width: 300,
        height: 300,
        opacity: 0.06,
        background: CURSOR_STATES.default.color,
        transition: 'background 0.3s ease',
      }}
    />
  )
}
