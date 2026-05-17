import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view based on scroll position.
 * Same logic Navbar uses — extracted so MobileTabBar can share it.
 */
export function useActiveSection(ids, offset = 120) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(ids[i])
          return
        }
      }
      setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}

export default useActiveSection
