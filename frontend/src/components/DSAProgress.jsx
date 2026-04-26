import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import SectionHeading from './SectionHeading'

const solved = 200
const total = 450

const topics = [
  { name: 'Arrays & Hashing', done: 40, total: 50 },
  { name: 'Binary Search', done: 28, total: 35 },
  { name: 'Sorting', done: 30, total: 38 },
  { name: 'Linked Lists', done: 22, total: 35 },
  { name: 'Trees & Graphs', done: 25, total: 60 },
  { name: 'Dynamic Programming', done: 15, total: 55 },
  { name: 'Stacks & Queues', done: 20, total: 28 },
  { name: 'Greedy', done: 20, total: 30 },
]

function AnimatedBar({ pct, delay }) {
  return (
    <div className="w-full h-1.5 bg-primary rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-accent/60"
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function DSAProgress() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(solved, 1500, inView)
  const percentage = Math.round((solved / total) * 100)

  return (
    <section id="dsa" className="w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="05" title="DSA Progress" />

        <motion.div
          ref={ref}
          className="rounded-xl border border-white/[0.06] bg-card-solid/50 p-8 mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-baseline gap-1 mb-2">
            <span className="font-heading text-5xl font-bold text-accent">{count}</span>
            <span className="text-text-secondary text-lg font-light">/ {total}</span>
          </div>
          <p className="text-text-secondary text-sm mb-1">problems solved</p>
          <div className="inline-block px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/10 mt-3">
            <span className="font-mono text-accent-purple text-xs tracking-wide">Striver A2Z Sheet</span>
          </div>

          <div className="max-w-md mx-auto mt-6">
            <div className="w-full h-2 bg-primary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-purple"
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <p className="text-text-secondary text-xs mt-2 font-mono">{percentage}% complete</p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3">
          {topics.map((topic, i) => {
            const pct = Math.round((topic.done / topic.total) * 100)
            return (
              <motion.div
                key={topic.name}
                className="rounded-lg border border-white/[0.06] bg-card-solid/30 p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-secondary text-sm">{topic.name}</span>
                  <span className="font-mono text-xs text-text-secondary">
                    <span className="text-text-primary">{topic.done}</span>/{topic.total}
                  </span>
                </div>
                <AnimatedBar pct={pct} delay={i * 0.05 + 0.2} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
