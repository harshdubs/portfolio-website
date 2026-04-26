import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import SectionHeading from './SectionHeading'

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
    <motion.div
      ref={ref}
      className="text-center py-5 rounded-lg border border-white/[0.06] bg-white/[0.02]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="font-heading text-2xl font-bold text-accent mb-1">
        {count}{suffix}
      </div>
      <div className="text-text-secondary text-xs tracking-wide uppercase">{label}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="01" title="About" />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            className="lg:col-span-3 space-y-5 text-text-secondary leading-relaxed text-[15px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I&apos;m a Data &amp; IoT Engineer at
              <span className="text-text-primary font-medium"> Continental India Pvt. Ltd.</span>,
              where I build end-to-end data pipelines, real-time analytics systems,
              and KPI dashboards that drive operational decisions on the factory floor.
            </p>
            <p>
              My work bridges <span className="text-accent">shop-floor data and board-level insights</span> —
              designing OPC-UA ingestion pipelines for 20+ industrial machines with 99.5% uptime,
              engineering Python ETL workflows, and building ICONICS SCADA dashboards
              adopted as primary monitoring tools by operations teams.
            </p>
            <p>
              I&apos;ve represented Continental internationally across
              <span className="text-accent-purple font-medium"> Germany</span>,{' '}
              <span className="text-accent-purple font-medium">China</span>, and{' '}
              <span className="text-accent-purple font-medium">Thailand</span> —
              collaborating on edge technologies, containerisation, and dashboard deployments.
              Currently expanding into AI/ML with production apps using LLM APIs and predictive models.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-64 h-64 rounded-xl bg-card-solid border border-white/[0.06] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] to-accent-purple/[0.05]" />
                <div className="p-5 font-mono text-xs leading-relaxed relative z-10">
                  <div className="text-text-secondary/50 mb-2">// harsh.config</div>
                  <div><span className="text-accent-purple">const</span> <span className="text-accent">engineer</span> = {'{'}</div>
                  <div className="pl-4"><span className="text-text-secondary">role:</span> <span className="text-amber-400">&quot;Data &amp; IoT&quot;</span>,</div>
                  <div className="pl-4"><span className="text-text-secondary">company:</span> <span className="text-amber-400">&quot;Continental&quot;</span>,</div>
                  <div className="pl-4"><span className="text-text-secondary">exp:</span> <span className="text-accent">3</span>,</div>
                  <div className="pl-4"><span className="text-text-secondary">stack:</span> [</div>
                  <div className="pl-8"><span className="text-amber-400">&quot;Python&quot;</span>,</div>
                  <div className="pl-8"><span className="text-amber-400">&quot;SQL&quot;</span>,</div>
                  <div className="pl-8"><span className="text-amber-400">&quot;Power BI&quot;</span>,</div>
                  <div className="pl-8"><span className="text-amber-400">&quot;Docker&quot;</span>,</div>
                  <div className="pl-4">],</div>
                  <div>{'}'}</div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-64 h-64 rounded-xl border border-accent/10 -z-10" />
            </div>
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
