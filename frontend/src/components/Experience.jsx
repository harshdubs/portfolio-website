import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from './SectionHeading'

const timeline = [
  {
    type: 'role',
    title: 'DS Curing / Final Finish Area Engineer',
    org: 'Continental India Pvt. Ltd.',
    period: 'June 2025 — Present',
    bullets: [
      'Curing & Final Finish area 2nd level support — breakdown-related tasks and root cause analysis.',
      'SOCCER Integration and Rollout in the Curing area.',
      'IPC Management for CU/FF area.',
      'COUGAR configuration and deployment for DOPAC stabilization.',
      'WWCC Cluster-4 project PILOT for Modipuram plant.',
      'Missing curing traceability reduction — SOCCER logic optimization and CGMS VM separation.',
    ],
  },
  {
    type: 'role',
    title: 'Data Generation & Data Quality Engineer',
    org: 'Continental India Pvt. Ltd.',
    period: 'May 2023 — June 2025',
    bullets: [
      'Designed and maintained real-time data pipelines for 20+ industrial machines via OPC-UA, achieving 99.5% ingestion uptime across 2 production lines.',
      'Engineered Python ETL workflows to clean and validate high-frequency sensor datasets, cutting data inconsistencies by ~35%.',
      'Built ICONICS SCADA dashboards tracking machine uptime, downtime causes, and maintenance KPIs — adopted as primary monitoring tool by operations teams.',
      'Led root cause analysis on tyre weight variation using regression and SPC — identified 3 key process factors; presented directly to plant management.',
      'Extrusion Initiative project leader ensuring data availability and quality for tire weight variation issue.',
      'TOP-12 Strategic Project — achieving operational excellence through Digital Transformation.',
      'Deployed Industrial IoT edge applications on Docker and Linux, enabling on-premise data processing with reduced latency.',
    ],
  },
  {
    type: 'international',
    title: 'Learning Initiative for Tires (LIFT)',
    org: 'Hannover, Germany',
    period: '2024',
    description: 'Selected for Continental\'s global LIFT program — competitive initiative for high-potential employees across worldwide manufacturing plants.',
    flag: '🇩🇪',
  },
  {
    type: 'international',
    title: 'Edge Device Containerisation Workshop',
    org: 'Hefei, China',
    period: '2024',
    description: 'Containerization workshop for utilization of edge technology — deploying containerized applications on factory floor hardware.',
    flag: '🇨🇳',
  },
  {
    type: 'international',
    title: 'ICONICS Dashboard Development Workshop',
    org: 'Rayong, Thailand',
    period: '2024',
    description: 'End-to-end ICONICS dashboard development and deployment at Thai manufacturing facility.',
    flag: '🇹🇭',
  },
  {
    type: 'highlight',
    title: 'LEAP Nomination',
    org: 'Continental India',
    description: 'Nominated for Leadership Engagement and Acceleration Program at Continental India.',
  },
]

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="w-full py-24 px-6 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="04" title="Experience" />

        <div ref={containerRef} className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06] md:left-[11px]" />
          <motion.div
            className="absolute left-[7px] top-2 w-px bg-accent md:left-[11px]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="relative pl-8 md:pl-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.div
                  className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 md:left-[4px] ${
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

                {item.type === 'role' ? (
                  <div className="rounded-xl p-6 border border-white/[0.06] bg-card-solid/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                      <div>
                        <h3 className="font-heading text-text-primary font-semibold text-lg">{item.title}</h3>
                        <p className="text-accent text-sm font-medium">{item.org}</p>
                      </div>
                      <span className="font-mono text-text-secondary text-xs tracking-wide">{item.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {item.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
                          <span className="text-accent/60 mt-0.5 shrink-0 text-[10px]">▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : item.type === 'highlight' ? (
                  <div className="rounded-xl p-5 border border-amber-400/20 bg-amber-400/[0.03]">
                    <h3 className="font-heading text-text-primary font-semibold text-[15px]">{item.title}</h3>
                    <p className="text-amber-400 text-xs font-medium mb-1">{item.org}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                ) : (
                  <div className="rounded-xl p-5 border border-accent-purple/20 bg-accent-purple/[0.03]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.flag}</span>
                        <div>
                          <h3 className="font-heading text-text-primary font-semibold text-[15px]">{item.title}</h3>
                          <p className="text-accent-purple text-xs font-medium">{item.org}</p>
                        </div>
                      </div>
                      <span className="font-mono text-text-secondary text-xs">{item.period}</span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          className="mt-12 rounded-xl p-6 border border-white/[0.06] bg-card-solid/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <h3 className="font-heading text-text-primary font-semibold">B.Tech — Electronics &amp; Communication Engineering</h3>
              <p className="text-accent text-sm font-medium">Thapar University</p>
            </div>
            <span className="font-mono text-text-secondary text-xs">2019 — 2023</span>
          </div>
          <p className="text-text-secondary text-sm mt-2">CGPA: 8.0 / 10 · Class XII: 90.6% · Class X: 95%</p>
        </motion.div>
      </div>
    </section>
  )
}
