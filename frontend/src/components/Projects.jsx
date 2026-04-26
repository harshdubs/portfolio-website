import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const fallbackProjects = [
  {
    title: 'DataSense AI',
    description: 'Full-stack AI data analysis app — CSV upload, automated EDA, LLM-generated insights, multi-turn chat with memory, and dynamic chart generation. Deployed live on Streamlit Cloud.',
    tech: ['Python', 'Streamlit', 'Groq LLM API', 'Pandas'],
    github: 'https://github.com/harshdubs/datasense-ai',
    live: 'https://datasense-ai-kzwea7rrhrxb88bqgxydxu.streamlit.app',
  },
  {
    title: 'Predictive Maintenance ML Pipeline',
    description: 'Anomaly detection on industrial mixer motor sensors (temperature, vibration, current) using Isolation Forest on 34,560 readings — 98% recall, 100% precision flagging pre-failure patterns.',
    tech: ['Python', 'Scikit-learn', 'Isolation Forest', 'SQL'],
    github: 'https://github.com/harshdubs',
    live: null,
  },
  {
    title: 'Manufacturing OEE Dashboard',
    description: 'End-to-end pipeline: OPC-UA data ingestion → Python ETL → SQL window function analysis → Power BI dashboard tracking Availability, Performance, and Quality across 8 machines.',
    tech: ['Python', 'SQL', 'Power BI', 'OPC-UA'],
    github: 'https://github.com/harshdubs',
    live: null,
  },
  {
    title: 'Supply Chain Business Insights',
    description: 'SQL analysis on 180K+ row DataCo dataset using CTEs, RANK, LAG, LEAD — uncovered a 70% revenue collapse over 4 months invisible to standard aggregation queries.',
    tech: ['SQL Server', 'Python', 'Excel', 'Window Functions'],
    github: 'https://github.com/harshdubs',
    live: null,
  },
  {
    title: 'Statistical A/B Analysis',
    description: "Welch's t-test on 180K orders analyzing discount impact on profit: p = 0.00001, H₀ rejected; Cohen's d = −0.048 — separating statistical significance from business significance.",
    tech: ['Python', 'SciPy', 'Pandas', 'Hypothesis Testing'],
    github: 'https://github.com/harshdubs',
    live: null,
  },
]

function TiltCard({ children, className }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -3
    const rotateY = ((x - centerX) / centerX) * 3
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="03" title="Projects" />

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard className="group relative rounded-xl p-6 border border-white/[0.06] bg-white/[0.02] backdrop-blur-md flex flex-col h-full hover:border-accent/20">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.03] via-transparent to-accent-purple/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-text-primary font-semibold text-lg">{project.title}</h3>
                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300" aria-label="GitHub">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent-purple transition-colors duration-300" aria-label="Live demo">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-accent/70 text-[11px] tracking-wide">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
