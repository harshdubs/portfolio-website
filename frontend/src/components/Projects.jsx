import { useState, useEffect } from 'react'

const fallbackProjects = [
  {
    title: 'DataSense AI',
    description: 'AI-powered data analysis tool that lets users upload CSVs and ask natural language questions. Uses Groq LLM for intelligent data interpretation and visualization.',
    tech: ['Streamlit', 'Groq LLM', 'Python', 'Pandas'],
    github: 'https://github.com/harshdubey',
    live: '#',
  },
  {
    title: 'Predictive Maintenance System',
    description: 'Machine learning pipeline for predicting equipment failures using Isolation Forest anomaly detection. Achieved 98% recall on factory sensor data.',
    tech: ['Python', 'Scikit-learn', 'Isolation Forest', 'Pandas'],
    github: 'https://github.com/harshdubey',
    live: null,
  },
  {
    title: 'Factory Monitor',
    description: 'Real-time factory floor monitoring system with OPC-UA data collection, REST API backend, and containerized deployment for edge servers.',
    tech: ['FastAPI', 'OPC-UA', 'Docker', 'Python'],
    github: 'https://github.com/harshdubey',
    live: null,
  },
  {
    title: 'OEE Dashboard',
    description: 'Overall Equipment Effectiveness dashboard pulling data from production databases, computing KPIs, and visualizing trends for plant managers.',
    tech: ['Python', 'SQL', 'Power BI', 'Data Pipelines'],
    github: 'https://github.com/harshdubey',
    live: null,
  },
  {
    title: 'SQL Supply Chain Analytics',
    description: 'Advanced SQL analytics on a 180K-row supply chain dataset. Window functions, CTEs, and complex aggregations for logistics optimization.',
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
    <section id="projects" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          <span className="text-accent font-mono text-lg">03.</span> Projects
        </h2>
        <div className="w-20 h-1 bg-accent mb-8"></div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-card rounded-lg p-6 border border-border flex flex-col"
            >
              <h3 className="text-text-primary font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-text-secondary text-sm mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="text-accent text-xs font-mono">{t}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent text-sm transition-colors">
                    GitHub &rarr;
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent-purple text-sm transition-colors">
                    Live Demo &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
