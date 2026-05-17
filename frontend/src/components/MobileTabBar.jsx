import { useActiveSection } from '../hooks/useActiveSection'

/* Inline SVG icons (no extra deps) */
const Icon = {
  about: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  skills: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2l3 6 6 1-4.5 4.3 1 6.2L12 16.8 6.5 19.5l1-6.2L3 9l6-1z" />
    </svg>
  ),
  projects: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
    </svg>
  ),
  experience: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  contact: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 5h16v14H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
}

const tabs = [
  { id: 'about', label: 'About', icon: Icon.about },
  { id: 'skills', label: 'Skills', icon: Icon.skills },
  { id: 'projects', label: 'Projects', icon: Icon.projects },
  { id: 'experience', label: 'Work', icon: Icon.experience },
  { id: 'contact', label: 'Contact', icon: Icon.contact },
]

export default function MobileTabBar() {
  const active = useActiveSection(tabs.map((t) => t.id))

  const handleClick = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-xl border-t border-white/[0.08] touch-manipulation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Mobile primary navigation"
    >
      <ul className="flex items-stretch justify-around max-w-md mx-auto px-1">
        {tabs.map((t) => {
          const isActive = active === t.id
          const IconC = t.icon
          return (
            <li key={t.id} className="flex-1">
              <a
                href={`#${t.id}`}
                onClick={(e) => handleClick(e, t.id)}
                className={`relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] transition-colors duration-200 ${
                  isActive ? 'text-accent' : 'text-text-secondary'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent rounded-full" />
                )}
                <IconC className="w-5 h-5" />
                <span className="text-[10px] font-medium tracking-wide">{t.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
