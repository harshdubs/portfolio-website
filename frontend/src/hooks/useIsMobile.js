import { useEffect, useState } from 'react'

/**
 * Returns true on touch / small (<768px) viewports.
 * SSR-safe (defaults to false). Updates on resize / pointer change.
 */
export function useIsMobile(breakpoint = 768) {
  const get = () => {
    if (typeof window === 'undefined') return false
    return (
      window.innerWidth < breakpoint ||
      window.matchMedia('(hover: none)').matches
    )
  }
  const [isMobile, setIsMobile] = useState(get)

  useEffect(() => {
    const onResize = () => setIsMobile(get())
    window.addEventListener('resize', onResize, { passive: true })
    const mq = window.matchMedia('(hover: none)')
    mq.addEventListener?.('change', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      mq.removeEventListener?.('change', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint])

  return isMobile
}

export default useIsMobile
