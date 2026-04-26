import { useState, useEffect } from 'react'

const fallbackProjects = [
  {
    title: 'DataSense AI',
    description: 'Upload CSVs and query data with natural language. Groq LLM interprets, analyzes, and visualizes — no code required.',
    tech: ['Streamlit', 'Groq LLM', 'Python', 'Pandas'],
    github: 'https://github.com/harshdubey',
    live: '#',
  },
  {
    title: 'Predictive Maintenance',
    description: 'ML pipeline detecting equipment failures before they happen. Isolation Forest anomaly detection with 98% recall on factory sensor data.',
    tech: ['Python', 'Scikit-learn', 'Isolation Forest', 'Pandas'],
    github: 'https://github.com/harshdubey',
    live: null,
  },
  {
    title: 'Factory Monitor',
    description: 'Real-time factory floor monitoring — OPC-UA data collection, REST API, containerized deployment on edge servers.',
    tech: ['FastAPI', 'OPC-UA', 'Docker', 'Python'],
    github: 'https://github.com/harshdubey',
    live: null,
  },
  {
    title: 'OEE Dashboard',
    description: 'Overall Equipment Effectiveness analytics pulling production data, computing KPIs, visualizing trends for plant managers.',
    tech: ['Python', 'SQL', 'Power BI', 'Pipelines'],
    github: 'https://github.com/harshdubey',
    live: null,
  },
  {
    title: 'SQL Supply Chain Analytics',
    description: 'Advanced analytics on 180K-row supply chain dataset — window functions, CTEs, complex aggregations for logistics optimization.',
    tech: ['SQL', 'Window Functions', 'CTEs', 'PostgreSQL'],
    github: 'https://github.com/harshdubey',
    live: null,
  },
]

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-accent text-sm">03</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Projects</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-xl p-6 border border-border bg-card backdrop-blur-md flex flex-col hover:border-border-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-text-primary font-semibold text-lg">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-secondary hover:text-accent transition-colors duration-300"
                        aria-label="GitHub"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-secondary hover:text-accent-purple transition-colors duration-300"
                        aria-label="Live demo"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-accent/70 text-[11px] tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
