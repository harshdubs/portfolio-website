import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'
import TextReveal, { WordReveal } from './TextReveal'

const statsData = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 3, suffix: '', label: 'Countries' },
  { value: 20, suffix: '+', label: 'Machines Monitored' },
  { value: 180, suffix: 'K+', label: 'Rows Analyzed' },
]

function StatCard({ value, suffix, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const count = useCountUp(value, 1200, inView)

  return (
    <GlowCard className="rounded-lg">
      <motion.div
        ref={ref}
        className="text-center py-5 rounded-lg border border-white/[0.06] bg-white/[0.02]"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        <motion.div
          className="font-heading text-2xl font-bold text-accent mb-1"
          animate={inView ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4, delay: delay + 1.2 }}
        >
          {count}{suffix}
        </motion.div>
        <div className="text-text-secondary text-xs tracking-wide uppercase">{label}</div>
      </motion.div>
    </GlowCard>
  )
}

function CodeBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const lines = [
    { indent: 0, content: <><span className="text-text-secondary/50">// harsh.config</span></> },
    { indent: 0, content: <><span className="text-accent-purple">const</span> <span className="text-accent">engineer</span> = {'{'}</> },
    { indent: 1, content: <><span className="text-text-secondary">role:</span> <span className="text-amber-400">&quot;Data &amp; IoT&quot;</span>,</> },
    { indent: 1, content: <><span className="text-text-secondary">company:</span> <span className="text-amber-400">&quot;Continental&quot;</span>,</> },
    { indent: 1, content: <><span className="text-text-secondary">exp:</span> <span className="text-accent">3</span>,</> },
    { indent: 1, content: <><span className="text-text-secondary">stack:</span> [</> },
    { indent: 2, content: <><span className="text-amber-400">&quot;Python&quot;</span>,</> },
    { indent: 2, content: <><span className="text-amber-400">&quot;SQL&quot;</span>,</> },
    { indent: 2, content: <><span className="text-amber-400">&quot;Power BI&quot;</span>,</> },
    { indent: 2, content: <><span className="text-amber-400">&quot;Docker&quot;</span>,</> },
    { indent: 1, content: <>],</> },
    { indent: 0, content: <>{'}'}</> },
  ]

  return (
    <div ref={ref} className="relative">
      <GlowCard className="rounded-xl" glowColor="rgba(124,58,237,0.12)">
        <div className="w-full max-w-[16rem] sm:w-64 h-64 rounded-xl bg-card-solid border border-white/[0.06] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] to-accent-purple/[0.05]" />
          {/* Terminal dots */}
          <div className="flex gap-1.5 p-3 relative z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="px-5 pb-5 font-mono text-xs leading-relaxed relative z-10">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                style={{ paddingLeft: line.indent * 16 }}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              >
                {line.content}
              </motion.div>
            ))}
          </div>
        </div>
      </GlowCard>
      <motion.div
        className="absolute -bottom-2 -right-2 w-64 h-64 rounded-xl border border-accent/10 -z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="01" title="About" />

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-3 space-y-5 text-text-secondary leading-relaxed text-[14px] sm:text-[15px] break-words">
            <TextReveal delay={0}>
              <p>
                I&apos;m a Data &amp; IoT Engineer at
                <span className="text-text-primary font-medium"> Continental India Pvt. Ltd.</span>,
                where I build end-to-end data pipelines, real-time analytics systems,
                and KPI dashboards that drive operational decisions on the factory floor.
              </p>
            </TextReveal>
            <TextReveal delay={0.15}>
              <p>
                My work bridges <span className="text-accent">shop-floor data and board-level insights</span> —
                designing OPC-UA ingestion pipelines for 20+ industrial machines with 99.5% uptime,
                engineering Python ETL workflows, and building ICONICS SCADA dashboards
                adopted as primary monitoring tools by operations teams.
              </p>
            </TextReveal>
            <TextReveal delay={0.3}>
              <p>
                I&apos;ve represented Continental internationally across
                <span className="text-accent-purple font-medium"> Germany</span>,{' '}
                <span className="text-accent-purple font-medium">China</span>, and{' '}
                <span className="text-accent-purple font-medium">Thailand</span> —
                collaborating on edge technologies, containerisation, and dashboard deployments.
                Currently expanding into AI/ML with production apps using LLM APIs and predictive models.
              </p>
            </TextReveal>
          </div>

          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CodeBlock />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          {statsData.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
