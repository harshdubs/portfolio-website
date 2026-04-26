const timeline = [
  {
    type: 'role',
    title: 'Data & IoT Engineer',
    org: 'Continental Automotive India',
    period: 'May 2023 — Present',
    bullets: [
      'Designed real-time data pipelines collecting sensor data from factory equipment via OPC-UA and MQTT protocols.',
      'Built FastAPI REST services for production monitoring, serving dashboards used by plant managers and quality engineers.',
      'Developed OEE analytics using Python and SQL, reducing manual reporting time by 70%.',
      'Containerized monitoring applications with Docker for deployment on edge servers across manufacturing lines.',
      'Collaborated with automation, quality, and IT teams to integrate data systems with existing SCADA infrastructure.',
    ],
  },
  {
    type: 'international',
    title: 'Hannover LIFT Program',
    org: 'Germany',
    period: '2024',
    description: 'Selected for competitive global initiative — cross-functional engineering leadership program at Continental headquarters.',
  },
  {
    type: 'international',
    title: 'Edge Device Containerisation',
    org: 'China',
    period: '2024',
    description: 'Deployed containerized edge computing solutions for factory floor data collection and processing.',
  },
  {
    type: 'international',
    title: 'ICONICS/DOPAC Dashboard Deployment',
    org: 'Thailand — Rayong',
    period: '2024 · 11 days',
    description: 'End-to-end deployment of industrial dashboard system at Thai manufacturing facility using ICONICS and DOPAC platforms.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-accent text-sm">04</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Experience</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-[11px]" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-8 md:pl-10">
                {/* Node */}
                <div
                  className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 md:left-[4px] ${
                    item.type === 'role'
                      ? 'border-accent bg-accent/20'
                      : 'border-accent-purple bg-accent-purple/20'
                  }`}
                />

                {item.type === 'role' ? (
                  <div className="rounded-xl p-6 border border-border bg-card-solid/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                      <div>
                        <h3 className="font-heading text-text-primary font-semibold text-lg">
                          {item.title}
                        </h3>
                        <p className="text-accent text-sm font-medium">{item.org}</p>
                      </div>
                      <span className="font-mono text-text-secondary text-xs tracking-wide">
                        {item.period}
                      </span>
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
                ) : (
                  <div className="rounded-xl p-5 border border-accent-purple/20 bg-accent-purple/[0.03]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <div>
                        <h3 className="font-heading text-text-primary font-semibold text-[15px]">
                          {item.title}
                        </h3>
                        <p className="text-accent-purple text-xs font-medium">{item.org}</p>
                      </div>
                      <span className="font-mono text-text-secondary text-xs">{item.period}</span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
