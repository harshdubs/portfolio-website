import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'framer-motion'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function TextScramble({ text, className = '', delay = 0, speed = 30, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-40px' })
  const [display, setDisplay] = useState('')
  const hasRun = useRef(false)

  const scramble = useCallback(() => {
    let iteration = 0
    const len = text.length
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return text[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      iteration += 1 / 2
      if (iteration >= len) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  useEffect(() => {
    if (inView && !hasRun.current) {
      hasRun.current = true
      const timeout = setTimeout(scramble, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [inView, scramble, delay])

  return (
    <span ref={ref} className={className}>
      {display || (inView ? text : '\u00A0'.repeat(text.length))}
    </span>
  )
}
