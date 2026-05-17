import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'
import { useIsMobile } from '../hooks/useIsMobile'

const timeline = [
  {
    type: 'role',
    title: 'Data & IoT Engineer',
    org: 'Continental India Pvt. Ltd.',
    period: 'May 2023 — Present',
    bullets: [
      'Designed and maintained real-time data pipelines for 20+ industrial machines via OPC-UA, achieving 99.5% ingestion uptime across 2 production lines.',
      'Applied Python (Pandas, NumPy) and SQL to analyze high-frequency sensor datasets — identified statistical patterns in operational data and translated findings into actionable process improvements for plant management.',
      'Built and deployed a Predictive Maintenance ML pipeline using Isolation Forest anomaly detection on 34,560 sensor readings — achieved 98% recall and 100% precision in identifying pre-failure patterns, enabling proactive maintenance scheduling.',
      'Engineered Python ETL workflows to clean and validate high-frequency sensor datasets, cutting data inconsistencies by ~35% and establishing data quality standards across 2 production lines.',
      'Built and shipped ICONICS SCADA dashboard applications and DOPAC integrations — gathered requirements from production engineers, wrote backend Python services for data processing, and delivered monitoring tools adopted as the primary operational interface by plant management.',
      'Conducted end-to-end statistical analysis on tyre weight variation using regression and statistical process control (SPC) — identified 3 root cause factors from multivariate data, reducing production reject rates measurably.',
      'Designed and delivered Power BI KPI dashboards tracking OEE, downtime, and quality metrics — used data storytelling techniques to communicate complex operational patterns to non-technical stakeholders including plant managers and senior leadership.',
      'Led COUGAR and WWCC edge technology rollouts — configured containerized applications, managed edge device preparation and deployment sequencing, and provided hyper care support post go-live across multiple cluster phases.',
      'Packaged and deployed Industrial IoT edge applications using Docker containers on Linux edge devices — managed container lifecycles, images, and deployment pipelines via remote SSH to factory floor hardware.',
      'Conducted structured training sessions for shop-floor operators, engineers, and supervisors on newly deployed applications — created SOPs, quick-reference guides, and user documentation tailored to non-technical audiences.',
      'Collaborated cross-functionally with OT engineers, production managers, IT, and QA teams to translate operational requirements into software solutions — delivered the TOP-12 Strategic Digitalization project end-to-end.',
      'Translated complex operational data into stakeholder briefs, aligning engineering, operations, and finance teams on data-driven process improvement decisions.',
    ],
  },
  {
    type: 'international',
    title: 'Learning Initiative for Tires (LIFT)',
    org: 'Hannover, Germany',
    period: '2024',
    description: 'Selected for Continental\'s global LIFT program — competitive initiative for high-potential employees across worldwide manufacturing plants. Cross-functional engineering leadership program at Continental headquarters.',
    flag: '\u{1F1E9}\u{1F1EA}',
  },
  {
    type: 'international',
    title: 'Edge Device Containerisation Workshop',
    org: 'Hefei, China',
    period: '2024',
    description: 'Containerization workshop for utilization of edge technology — deploying containerized applications on factory floor hardware for real-time data collection and processing.',
    flag: '\u{1F1E8}\u{1F1F3}',
  },
  {
    type: 'international',
    title: 'ICONICS Dashboard Development Workshop',
    org: 'Rayong, Thailand',
    period: '2025',
    description: 'End-to-end ICONICS dashboard development and deployment at Thai manufacturing facility — on-site training, configuration, and go-live support.',
    flag: '\u{1F1F9}\u{1F1ED}',
  },
  {
    type: 'highlight',
    title: 'LEAP Nomination',
    org: 'Continental India',
    description: 'Nominated for Leadership Engagement and Acceleration Program — Continental India\'s internal leadership development initiative.',
  },
]

function BulletItem({ bullet, index }) {
  return (
    <motion.li
      className="flex gap-3 text-text-secondary text-sm leading-relaxed group/bullet"
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.04 }}
    >
      <motion.span
        className="text-accent/70 mt-1.5 shrink-0 text-[10px] leading-none"
        whileHover={{ scale: 1.6, color: '#00ff88' }}
      >
        {'▸'}
      </motion.span>
      <span className="group-hover/bullet:text-text-primary transition-colors duration-300">{bullet}</span>
    </motion.li>
  )
}

function InternationalCard({ item, index }) {
  const isMobile = useIsMobile()
  return (
    <GlowCard className="rounded-xl" glowColor="rgba(124,58,237,0.12)">
      <motion.div
        className="rounded-xl p-5 border border-accent-purple/20 bg-accent-purple/[0.03] relative overflow-hidden"
        whileHover={{ borderColor: 'rgba(124,58,237,0.4)', transition: { duration: 0.3 } }}
      >
        {/* Flag background watermark */}
        <span className="absolute -right-2 -bottom-4 text-7xl opacity-[0.04] pointer-events-none select-none">{item.flag}</span>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2 relative z-10">
          <div className="flex items-center gap-2">
            {isMobile ? (
              <span className="text-lg">{item.flag}</span>
            ) : (
              <motion.span
                className="text-lg"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {item.flag}
              </motion.span>
            )}
            <div>
              <h3 className="font-heading text-text-primary font-semibold text-[15px]">{item.title}</h3>
              <p className="text-accent-purple text-xs font-medium">{item.org}</p>
            </div>
          </div>
          <span className="font-mono text-text-secondary text-xs">{item.period}</span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed relative z-10">{item.description}</p>
      </motion.div>
    </GlowCard>
  )
}

export default function Experience() {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="04" title="Experience" />

        <div ref={containerRef} className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06] md:left-[11px]" />
          {isMobile ? (
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px md:left-[11px]"
              style={{ background: 'linear-gradient(180deg, #00ff88 0%, #7c3aed 100%)' }}
            />
          ) : (
            <motion.div
              className="absolute left-[7px] top-2 w-px md:left-[11px]"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #00ff88 0%, #7c3aed 100%)',
              }}
            />
          )}

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="relative pl-8 md:pl-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Animated dot with pulse */}
                <div className="absolute left-0 top-1.5 md:left-[4px]">
                  <motion.div
                    className={`w-[15px] h-[15px] rounded-full border-2 ${
                      item.type === 'role'
                        ? 'border-accent bg-accent/20'
                        : item.type === 'highlight'
                        ? 'border-amber-400 bg-amber-400/20'
                        : 'border-accent-purple bg-accent-purple/20'
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: i * 0.1 + 0.2 }}
                  />
                  {/* Pulse ring — desktop only (infinite anims tank mobile) */}
                  {!isMobile && (
                    <motion.div
                      className={`absolute inset-0 rounded-full border ${
                        item.type === 'role' ? 'border-accent/30' : item.type === 'highlight' ? 'border-amber-400/30' : 'border-accent-purple/30'
                      }`}
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                </div>

                {item.type === 'role' ? (
                  <GlowCard className="rounded-xl">
                    <div className="rounded-xl p-6 border border-white/[0.06] bg-card-solid/50 hover:border-accent/15 transition-colors duration-500">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                        <div>
                          <h3 className="font-heading text-text-primary font-semibold text-lg">{item.title}</h3>
                          <p className="text-accent text-sm font-medium">{item.org}</p>
                        </div>
                        <span className="font-mono text-text-secondary text-xs tracking-wide">{item.period}</span>
                      </div>
                      <ul className="space-y-3">
                        {item.bullets.map((bullet, j) => (
                          <BulletItem key={j} bullet={bullet} index={j} />
                        ))}
                      </ul>
                    </div>
                  </GlowCard>
                ) : item.type === 'highlight' ? (
                  <GlowCard className="rounded-xl" glowColor="rgba(251,191,36,0.1)">
                    <motion.div
                      className="rounded-xl p-5 border border-amber-400/20 bg-amber-400/[0.03]"
                      whileHover={{ borderColor: 'rgba(251,191,36,0.4)', transition: { duration: 0.3 } }}
                    >
                      <h3 className="font-heading text-text-primary font-semibold text-[15px]">{item.title}</h3>
                      <p className="text-amber-400 text-xs font-medium mb-1">{item.org}</p>
                      <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                  </GlowCard>
                ) : (
                  <InternationalCard item={item} index={i} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlowCard className="rounded-xl">
            <div className="rounded-xl p-6 border border-white/[0.06] bg-card-solid/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="font-heading text-text-primary font-semibold">B.Tech — Electronics &amp; Communication Engineering</h3>
                  <p className="text-accent text-sm font-medium">Thapar University</p>
                </div>
                <span className="font-mono text-text-secondary text-xs">2019 — 2023</span>
              </div>
              <p className="text-text-secondary text-sm mt-2">CGPA: 8.0 / 10 · Class XII: 90.6% · Class X: 95%</p>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  )
}
