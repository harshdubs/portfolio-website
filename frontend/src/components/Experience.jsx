export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          <span className="text-accent font-mono text-lg">04.</span> Experience
        </h2>
        <div className="w-20 h-1 bg-accent mb-8"></div>

        <div className="bg-card rounded-lg p-6 md:p-8 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h3 className="text-text-primary font-semibold text-lg">
                Data &amp; IoT Engineer
              </h3>
              <p className="text-accent-purple font-medium">Continental Automotive India</p>
            </div>
            <span className="text-text-secondary text-sm font-mono mt-1 sm:mt-0">
              May 2023 &mdash; Present
            </span>
          </div>

          <ul className="space-y-3 text-text-secondary text-sm leading-relaxed">
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#9654;</span>
              <span>Designed and maintained real-time data pipelines collecting sensor data from factory floor equipment via OPC-UA and MQTT protocols.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#9654;</span>
              <span>Built FastAPI-based REST services for production monitoring, serving data to dashboards used by plant managers and quality engineers.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#9654;</span>
              <span>Developed OEE (Overall Equipment Effectiveness) analytics using Python and SQL, reducing manual reporting time by 70%.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#9654;</span>
              <span>Containerized monitoring applications with Docker for deployment on edge servers across multiple manufacturing lines.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent mt-1 shrink-0">&#9654;</span>
              <span>Collaborated with cross-functional teams including automation, quality, and IT to integrate data systems with existing SCADA infrastructure.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
