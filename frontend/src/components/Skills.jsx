import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

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
    <section id="skills" className="w-full py-24 px-6 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="02" title="Skills" />

        <div className="grid sm:grid-cols-2 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className="rounded-xl p-6 border border-white/[0.06] bg-card-solid/50 backdrop-blur-sm hover:border-accent/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-lg">{group.icon}</span>
                <h3 className="font-heading text-text-primary font-semibold text-sm tracking-wide">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/[0.06] text-text-secondary bg-primary/60 hover:border-accent/30 hover:text-accent transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.1 + si * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
