import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 1500, startWhen = true) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!startWhen || started.current) return
    started.current = true

    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target, duration, startWhen])

  return count
}
