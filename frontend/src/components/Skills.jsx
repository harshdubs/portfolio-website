import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'

const skillGroups = [
  {
    title: 'Languages & Analysis',
    icon: '//01',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'C++'],
  },
  {
    title: 'Analytics & ML',
    icon: '//02',
    skills: ['EDA', 'Hypothesis Testing', 'A/B Testing', 'Regression', 'Isolation Forest', 'SPC', 'Root Cause Analysis'],
  },
  {
    title: 'Visualization & BI',
    icon: '//03',
    skills: ['Power BI', 'DAX', 'Tableau', 'Matplotlib', 'Seaborn', 'Excel'],
  },
  {
    title: 'Engineering & IoT',
    icon: '//04',
    skills: ['ETL Pipelines', 'OPC-UA', 'Docker', 'Linux', 'REST APIs', 'ICONICS SCADA', 'DOPAC', 'Edge Computing'],
  },
  {
    title: 'AI & App Dev',
    icon: '//05',
    skills: ['Groq LLM API', 'Streamlit', 'FastAPI', 'LangChain', 'Git & GitHub'],
  },
  {
    title: 'Industrial Tools',
    icon: '//06',
    skills: ['SQL Server', 'STEP-7', 'TWINCAT-2', 'TIA Portal', 'PLC/IPC Systems', 'MQTT'],
  },
]

function SkillTag({ skill, groupIndex, skillIndex }) {
  return (
    <motion.span
      className="relative px-3 py-1.5 rounded-full text-xs font-medium border border-white/[0.06] text-text-secondary bg-primary/60 cursor-default overflow-hidden group"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: groupIndex * 0.08 + skillIndex * 0.04 }}
      whileHover={{
        borderColor: 'rgba(0, 255, 136, 0.4)',
        color: '#00ff88',
        scale: 1.08,
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      {/* Shimmer sweep on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative z-10">{skill}</span>
    </motion.span>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 px-6 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="02" title="Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <GlowCard className="rounded-xl h-full">
                <div className="rounded-xl p-6 border border-white/[0.06] bg-card-solid/50 backdrop-blur-sm h-full group hover:border-accent/20 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-accent/40 text-xs">{group.icon}</span>
                    <h3 className="font-heading text-text-primary font-semibold text-sm tracking-wide group-hover:text-accent transition-colors duration-300">
                      {group.title}
                    </h3>
                    {/* Animated line */}
                    <motion.div
                      className="flex-1 h-px bg-accent/10"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: gi * 0.1 + 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <SkillTag key={skill} skill={skill} groupIndex={gi} skillIndex={si} />
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
