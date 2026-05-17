import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { useIsMobile } from '../hooks/useIsMobile'

const fallbackProjects = [
  {
    title: 'DataSense AI',
    description: 'Full-stack AI data analysis app — CSV upload, automated EDA, LLM-generated insights, multi-turn chat with memory, and dynamic chart generation. Deployed live on Streamlit Cloud.',
    tech: ['Python', 'Streamlit', 'Groq LLM API', 'Pandas'],
    github: 'https://github.com/harshdubs/datasense-ai',
    live: 'https://datasense-ai-kzwea7rrhrxb88bqgxydxu.streamlit.app',
    metric: 'LIVE',
    metricLabel: 'on Streamlit Cloud',
  },
  {
    title: 'Predictive Maintenance ML Pipeline',
    description: 'Anomaly detection on industrial mixer motor sensors (temperature, vibration, current) using Isolation Forest on 34,560 readings — 98% recall, 100% precision flagging pre-failure patterns.',
    tech: ['Python', 'Scikit-learn', 'Isolation Forest', 'SQL'],
    github: 'https://github.com/harshdubs',
    live: null,
    metric: '98%',
    metricLabel: 'recall on pre-failure patterns',
  },
  {
    title: 'Manufacturing OEE Dashboard',
    description: 'End-to-end pipeline: OPC-UA data ingestion → Python ETL → SQL window function analysis → Power BI dashboard tracking Availability, Performance, and Quality across 8 machines.',
    tech: ['Python', 'SQL', 'Power BI', 'OPC-UA'],
    github: 'https://github.com/harshdubs',
    live: null,
    metric: '8',
    metricLabel: 'machines monitored end-to-end',
  },
  {
    title: 'Supply Chain Business Insights',
    description: 'SQL analysis on 180K+ row DataCo dataset using CTEs, RANK, LAG, LEAD — uncovered a 70% revenue collapse over 4 months invisible to standard aggregation queries.',
    tech: ['SQL Server', 'Python', 'Excel', 'Window Functions'],
    github: 'https://github.com/harshdubs',
    live: null,
    metric: '180K+',
    metricLabel: 'rows analysed with window functions',
  },
  {
    title: 'Statistical A/B Analysis',
    description: "Welch's t-test on 180K orders analyzing discount impact on profit: p = 0.00001, H₀ rejected; Cohen's d = −0.048 — separating statistical significance from business significance.",
    tech: ['Python', 'SciPy', 'Pandas', 'Hypothesis Testing'],
    github: 'https://github.com/harshdubs',
    live: null,
    metric: 'p<10⁻⁵',
    metricLabel: 'rejecting H₀ with Welch\'s t-test',
  },
]

const GithubIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
)
const ExternalIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
)

/* ---------- Featured project — MOBILE simplified ---------- */
function FeaturedProjectMobile({ project }) {
  const primaryHref = project.github || project.live
  return (
    <motion.div
      className="relative mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
    >
      <a
        href={primaryHref}
        target="_blank"
        rel="noreferrer"
        className="relative overflow-hidden rounded-2xl border border-accent/20 bg-card-solid p-6 group block no-underline cursor-pointer"
      >
        {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((c) => (
          <div key={c} className={`absolute w-6 h-6 ${c} border-accent/40 pointer-events-none`} />
        ))}
        <div className="relative z-10">
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase block mb-4">★ Featured Project</span>
          <h3 className="font-heading text-2xl font-bold text-text-primary mb-4 leading-tight break-words">{project.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-accent/80 text-xs tracking-wide">{t}</span>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap mb-4">
            {project.github && (
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent rounded-lg text-sm">
                <GithubIcon className="w-4 h-4" /> Source
              </span>
            )}
            {project.live && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.live, '_blank', 'noreferrer') }}
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent-purple/40 text-accent-purple rounded-lg text-sm"
              >
                <ExternalIcon className="w-4 h-4" /> Live Demo
              </button>
            )}
          </div>
          <div className="text-right">
            <div className="font-heading font-bold text-4xl bg-gradient-to-br from-accent via-accent to-accent-purple bg-clip-text text-transparent leading-none">
              {project.metric}
            </div>
            <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mt-2 max-w-[14rem] ml-auto">
              {project.metricLabel}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

/* ---------- Featured project — full-width cinematic hero card ---------- */
function FeaturedProjectDesktop({ project }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 18 })
  const rY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 })

  const handleMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const handleLeave = () => { mx.set(0.5); my.set(0.5) }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yLayer1 = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const yLayer2 = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const primaryHref = project.github || project.live

  return (
    <motion.div
      ref={ref}
      className="relative mb-10"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1400px' }}
    >
      <motion.a
        href={primaryHref}
        target="_blank"
        rel="noreferrer"
        className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-secondary/80 via-secondary/40 to-secondary/80 backdrop-blur-md p-6 sm:p-10 md:p-14 group block no-underline cursor-pointer"
        style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
      >
        {/* animated gradient blobs */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
          style={{ y: yLayer1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-accent-purple/10 blur-3xl pointer-events-none"
          style={{ y: yLayer2 }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* scanline grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* corner brackets */}
        {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r', 'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((c) => (
          <div key={c} className={`absolute w-6 h-6 ${c} border-accent/40 pointer-events-none`} />
        ))}

        <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-end" style={{ transform: 'translateZ(40px)' }}>
          <div>
            <motion.span
              className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase block mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              ★ Featured Project
            </motion.span>
            <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight break-words">
              {project.title.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.025, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  className="font-mono text-accent/80 text-xs tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              {project.github && (
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent rounded-lg text-sm group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                  <GithubIcon className="w-4 h-4" /> Source
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              )}
              {project.live && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(project.live, '_blank', 'noreferrer')
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-accent-purple/40 text-accent-purple rounded-lg text-sm hover:bg-accent-purple hover:text-text-primary transition-all"
                >
                  <ExternalIcon className="w-4 h-4" /> Live Demo
                </button>
              )}
            </div>
          </div>

          {/* Big metric */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: 'translateZ(60px)' }}
          >
            <div className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl bg-gradient-to-br from-accent via-accent to-accent-purple bg-clip-text text-transparent leading-none">
              {project.metric}
            </div>
            <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mt-2 max-w-[14rem] ml-auto">
              {project.metricLabel}
            </div>
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  )
}

/* ---------- Unfolding card — flips open once, smoothly, then leaves alone ---------- */
function UnfoldCard({ project, index }) {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()
  const flipFromLeft = index % 2 === 0
  const sign = flipFromLeft ? -1 : 1
  const primaryHref = project.github || project.live

  return (
    <motion.div
      className="relative"
      style={isMobile ? undefined : { perspective: '1400px' }}
      initial={reduce || isMobile ? { opacity: 0, y: 16 } : { opacity: 0, rotateY: sign * 55, z: -120, y: 20 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, rotateY: 0, z: 0, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{
        duration: isMobile ? 0.3 : 1,
        ease: [0.22, 1, 0.36, 1],
        delay: index * (isMobile ? 0.04 : 0.05),
      }}
    >
      <motion.a
        href={primaryHref}
        target="_blank"
        rel="noreferrer"
        className={`group relative block rounded-xl p-6 border border-white/[0.06] flex flex-col h-full hover:border-accent/30 transition-colors duration-500 cursor-pointer no-underline ${isMobile ? 'bg-card-solid' : 'bg-white/[0.02] backdrop-blur-md'}`}
        style={isMobile ? undefined : { transformOrigin: flipFromLeft ? 'left center' : 'right center' }}
        whileHover={reduce || isMobile ? {} : {
          y: -8,
          rotateX: 4,
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
      >
          {/* ambient hover gradient */}
          {!isMobile && <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.04] via-transparent to-accent-purple/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />}
          {/* sweeping shimmer line on hover */}
          {!isMobile && (
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -inset-x-1 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ y: ['-10%', '110%'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}

          {/* index plate */}
          <div className="absolute top-4 right-5 font-mono text-[10px] text-text-secondary/40 tracking-widest">
            {String(index + 1).padStart(2, '0')} / 0{5}
          </div>

          <div className="relative z-10 flex flex-col flex-grow">
            {/* metric badge */}
            <div className="mb-3">
              <span className="inline-block font-heading font-bold text-3xl bg-gradient-to-r from-accent to-accent-purple bg-clip-text text-transparent">
                {project.metric}
              </span>
              <span className="ml-2 font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                {project.metricLabel}
              </span>
            </div>

            <div className="flex items-start justify-between mb-3 gap-3">
              <h3 className="font-heading text-text-primary font-semibold text-lg leading-snug group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex gap-3 mt-1 shrink-0 items-center">
                {project.github && (
                  <span className="text-text-secondary group-hover:text-accent transition-colors duration-300" aria-hidden>
                    <GithubIcon className="w-4 h-4" />
                  </span>
                )}
                {project.live && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(project.live, '_blank', 'noreferrer')
                    }}
                    className="text-text-secondary hover:text-accent-purple hover:scale-125 transform transition-all duration-300"
                    aria-label="Live demo"
                  >
                    <ExternalIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.04]">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-accent/70 text-[11px] tracking-wide hover:text-accent transition-colors duration-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
      </motion.a>
    </motion.div>
  )
}

function FeaturedProject(props) {
  const isMobile = useIsMobile()
  return isMobile ? <FeaturedProjectMobile {...props} /> : <FeaturedProjectDesktop {...props} />
}

export default function Projects() {
  const isMobile = useIsMobile()
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        // merge metric defaults if backend doesn't provide them
        const merged = data.map((p, i) => ({
          ...fallbackProjects[i],
          ...p,
          metric: p.metric || fallbackProjects[i]?.metric,
          metricLabel: p.metricLabel || fallbackProjects[i]?.metricLabel,
        }))
        setProjects(merged)
      })
      .catch(() => {})
  }, [])

  const [featured, ...rest] = projects

  return (
    <section id="projects" className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* spotlight (desktop only — blur is too expensive on mobile) */}
      {!isMobile && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.025] blur-[120px] pointer-events-none" />
      )}

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading number="03" title="Projects" />

        {featured && <FeaturedProject project={featured} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {rest.map((project, i) => (
            <UnfoldCard key={project.title} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
