const skillGroups = [
  {
    title: 'Programming & Backend',
    icon: '⚡',
    skills: ['Python', 'FastAPI', 'Docker', 'Linux', 'Git', 'REST APIs'],
  },
  {
    title: 'Industrial IoT',
    icon: '🏭',
    skills: ['OPC-UA', 'SCADA', 'MQTT', 'PLC Integration', 'Ignition', 'Edge Computing'],
  },
  {
    title: 'AI & Machine Learning',
    icon: '🧠',
    skills: ['LangChain', 'Groq', 'Streamlit', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    title: 'Data & Analytics',
    icon: '📊',
    skills: ['SQL', 'PostgreSQL', 'Power BI', 'Data Pipelines', 'ETL', 'Excel/VBA'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-accent text-sm">02</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Skills</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-xl p-6 border border-border bg-card-solid/50 backdrop-blur-sm hover:border-border-hover transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-lg">{group.icon}</span>
                <h3 className="font-heading text-text-primary font-semibold text-sm tracking-wide">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-border text-text-secondary bg-primary/60 hover:border-accent/30 hover:text-accent transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
