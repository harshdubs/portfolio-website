import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'

const achievements = [
  {
    icon: '\u{1F1E9}\u{1F1EA}',
    title: 'Continental Global LIFT Program',
    description: 'Selected for competitive international initiative for high-potential employees across worldwide manufacturing plants — Hannover, Germany.',
  },
  {
    icon: '\u{1F3C6}',
    title: '2nd Position — Robocup National Robotics Championship',
    description: 'Embedded systems & IoT-based robotics competition at the national level.',
  },
  {
    icon: '\u{1F3D0}',
    title: 'Volleyball — Team Captain & 1st Place',
    description: 'North India Inter-Technology Championship 2023. 1st Place at URJA 2023 Championship.',
  },
  {
    icon: '\u{1F393}',
    title: 'School Student Council President',
    description: 'President 2019, Vice-President 2018 — Kendriya Vidyalaya Sangathan, Shalimar Bagh.',
  },
  {
    icon: '\u{1F3CF}',
    title: 'Nationals in Cricket — Delhi Region KVS 2018',
    description: 'Represented Delhi region at KVS national-level cricket tournament.',
  },
  {
    icon: '\u{1F4DA}',
    title: 'Freshman Year Scholarship',
    description: 'Scholarship for excellent grade achievement in university freshman year at Thapar University.',
  },
]

export default function DSAProgress() {
  return (
    <section id="achievements" className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="05" title="Achievements" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlowCard className="rounded-xl h-full">
                <motion.div
                  className="rounded-xl p-5 border border-white/[0.06] bg-card-solid/30 h-full group relative overflow-hidden"
                  whileHover={{
                    borderColor: 'rgba(0, 255, 136, 0.25)',
                    y: -4,
                    transition: { duration: 0.25 },
                  }}
                >
                  {/* Background icon watermark */}
                  <span className="absolute -right-3 -bottom-3 text-6xl opacity-[0.04] pointer-events-none select-none group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-110 transform">
                    {item.icon}
                  </span>

                  <motion.span
                    className="text-2xl mb-3 block"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.icon}
                  </motion.span>
                  <h3 className="font-heading text-text-primary font-semibold text-sm mb-2 leading-snug group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
