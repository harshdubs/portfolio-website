const skillGroups = [
  {
    title: 'Programming & Backend',
    skills: ['Python', 'FastAPI', 'Docker', 'Linux', 'Git', 'REST APIs'],
  },
  {
    title: 'Industrial IoT',
    skills: ['OPC-UA', 'SCADA', 'MQTT', 'PLC Integration', 'Ignition', 'Edge Computing'],
  },
  {
    title: 'AI & Machine Learning',
    skills: ['LangChain', 'Groq', 'Streamlit', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    title: 'Data & Analytics',
    skills: ['SQL', 'PostgreSQL', 'Power BI', 'Data Pipelines', 'ETL', 'Excel/VBA'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          <span className="text-accent font-mono text-lg">02.</span> Skills
        </h2>
        <div className="w-20 h-1 bg-accent mb-8"></div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div key={group.title} className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-accent-purple font-semibold mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary rounded-full text-text-secondary text-sm border border-border"
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
