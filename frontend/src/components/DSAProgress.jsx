import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'

const achievements = [
  {
    icon: '\u{1F1E9}\u{1F1EA}',
    title: 'Continental Global LIFT Program',
    description: 'Selected for competitive international initiative for high-potential employees across worldwide manufacturing plants — Hannover, Germany.',
    rarity: 'LEGENDARY',
  },
  {
    icon: '\u{1F3C6}',
    title: '2nd Position — Robocup National Robotics Championship',
    description: 'Embedded systems & IoT-based robotics competition at the national level.',
    rarity: 'EPIC',
  },
  {
    icon: '\u{1F3D0}',
    title: 'Volleyball — Team Captain & 1st Place',
    description: 'North India Inter-Technology Championship 2023. 1st Place at URJA 2023 Championship.',
    rarity: 'EPIC',
  },
  {
    icon: '\u{1F393}',
    title: 'School Student Council President',
    description: 'President 2019, Vice-President 2018 — Kendriya Vidyalaya Sangathan, Shalimar Bagh.',
    rarity: 'RARE',
  },
  {
    icon: '\u{1F3CF}',
    title: 'Nationals in Cricket — Delhi Region KVS 2018',
    description: 'Represented Delhi region at KVS national-level cricket tournament.',
    rarity: 'RARE',
  },
  {
    icon: '\u{1F4DA}',
    title: 'Freshman Year Scholarship',
    description: 'Scholarship for excellent grade achievement in university freshman year at Thapar University.',
    rarity: 'RARE',
  },
]

// Each card flies in from a different vector — gives the credits-roll feel
const entrances = [
  { x: -120, y: -60,  rot: -8 },
  { x:  120, y: -80,  rot:  6 },
  { x: -140, y:  40,  rot:  10 },
  { x:  140, y:  60,  rot: -7 },
  { x:    0, y: -120, rot:  4 },
  { x:    0, y:  120, rot: -5 },
]

const rarityStyle = {
  LEGENDARY: 'text-amber-400 border-amber-400/30 shadow-[0_0_22px_-6px_rgba(251,191,36,0.5)]',
  EPIC: 'text-accent-purple border-accent-purple/30',
  RARE: 'text-accent border-accent/30',
}

function AchievementCard({ item, i }) {
  const reduce = useReducedMotion()
  const e = entrances[i % entrances.length]

  return (
    <motion.div
      className="relative"
      style={{ perspective: '1200px' }}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: e.x, y: e.y, rotate: e.rot, scale: 0.85, filter: 'blur(8px)' }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 16,
        mass: 0.9,
        delay: i * 0.06,
      }}
    >
      <GlowCard className="rounded-xl h-full">
        <motion.div
          className="rounded-xl p-5 border border-white/[0.06] bg-card-solid/40 backdrop-blur-sm h-full group relative overflow-hidden"
          whileHover={reduce ? {} : {
            y: -6,
            rotateX: 4,
            rotateY: i % 2 === 0 ? -3 : 3,
            borderColor: 'rgba(0,255,136,0.3)',
            transition: { duration: 0.3 },
          }}
        >
          {/* watermark icon */}
          <span className="absolute -right-3 -bottom-3 text-7xl opacity-[0.045] pointer-events-none select-none group-hover:opacity-[0.1] transition-opacity duration-500 group-hover:scale-110 transform">
            {item.icon}
          </span>

          {/* rarity stamp */}
          <div className={`absolute top-3 right-3 font-mono text-[9px] tracking-[0.25em] px-2 py-0.5 rounded border ${rarityStyle[item.rarity] || rarityStyle.RARE} bg-black/40`}>
            {item.rarity}
          </div>

          {/* "UNLOCKED" flash on enter */}
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center font-mono text-[11px] tracking-[0.5em] uppercase text-accent/80 z-20"
            initial={{ opacity: 0, scale: 1.4 }}
            whileInView={{ opacity: [0, 1, 1, 0], scale: [1.4, 1, 1, 0.95] }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: i * 0.06 + 0.4, times: [0, 0.2, 0.7, 1] }}
          >
            <span className="px-3 py-1 bg-black/70 border border-accent/40 rounded">
              ✓ Unlocked
            </span>
          </motion.div>

          <motion.span
            className="text-3xl mb-3 block relative z-10"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 220, delay: i * 0.06 + 0.3 }}
            whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
          >
            {item.icon}
          </motion.span>
          <h3 className="font-heading text-text-primary font-semibold text-sm mb-2 leading-snug group-hover:text-accent transition-colors duration-300 relative z-10 mt-6">
            {item.title}
          </h3>
          <p className="text-text-secondary text-xs leading-relaxed relative z-10">{item.description}</p>
        </motion.div>
      </GlowCard>
    </motion.div>
  )
}

export default function DSAProgress() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // a "spotlight beam" sweeps as you scroll
  const beamX = useTransform(scrollYProgress, [0, 1], ['-30%', '130%'])

  return (
    <section id="achievements" ref={ref} className="relative w-full py-24 px-6 overflow-hidden">
      {/* ambient stage lights */}
      <motion.div
        className="absolute top-1/3 w-[40rem] h-[40rem] rounded-full bg-amber-400/[0.04] blur-[120px] pointer-events-none -translate-y-1/2"
        style={{ left: beamX }}
      />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full bg-accent-purple/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading number="05" title="Achievements" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
