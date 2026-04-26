import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const achievements = [
  {
    icon: '🇩🇪',
    title: 'Continental Global LIFT Program',
    description: 'Selected for competitive international initiative for high-potential employees across worldwide manufacturing plants — Hannover, Germany.',
  },
  {
    icon: '🏆',
    title: '2nd Position — Robocup National Robotics Championship',
    description: 'Embedded systems & IoT-based robotics competition at the national level.',
  },
  {
    icon: '🏐',
    title: 'Volleyball — Team Captain & 1st Place',
    description: 'North India Inter-Technology Championship 2023. 1st Place at URJA 2023 Championship.',
  },
  {
    icon: '🎓',
    title: 'School Student Council President',
    description: 'President 2019, Vice-President 2018 — Kendriya Vidyalaya Sangathan, Shalimar Bagh.',
  },
  {
    icon: '🏏',
    title: 'Nationals in Cricket — Delhi Region KVS 2018',
    description: 'Represented Delhi region at KVS national-level cricket tournament.',
  },
  {
    icon: '📚',
    title: 'Freshman Year Scholarship',
    description: 'Scholarship for excellent grade achievement in university freshman year at Thapar University.',
  },
]

export default function DSAProgress() {
  return (
    <section id="dsa" className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="05" title="Achievements" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-xl p-5 border border-white/[0.06] bg-card-solid/30 hover:border-accent/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="font-heading text-text-primary font-semibold text-sm mb-2 leading-snug">{item.title}</h3>
              <p className="text-text-secondary text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
