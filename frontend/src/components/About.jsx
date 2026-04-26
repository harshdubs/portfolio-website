const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '3', label: 'Countries' },
  { value: '4', label: 'Live Projects' },
  { value: '180K+', label: 'Rows Analyzed' },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-accent text-sm">01</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">About</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Text — 3 cols */}
          <div className="lg:col-span-3 space-y-5 text-text-secondary leading-relaxed text-[15px]">
            <p>
              I&apos;m a Data &amp; IoT Engineer at
              <span className="text-text-primary font-medium"> Continental Automotive India</span>,
              where I architect real-time data pipelines, factory monitoring systems,
              and production analytics for manufacturing floors.
            </p>
            <p>
              My stack centers on <span className="text-accent">Python</span>,{' '}
              <span className="text-accent">FastAPI</span>,{' '}
              <span className="text-accent">SQL</span>, and{' '}
              <span className="text-accent">Docker</span> — I turn raw OPC-UA sensor
              streams into dashboards that plant managers rely on daily.
            </p>
            <p>
              Currently transitioning into <span className="text-accent-purple font-medium">AI Engineering</span> —
              building projects with LLMs, LangChain, and Streamlit while grinding
              DSA fundamentals through the Striver A2Z sheet.
            </p>
          </div>

          {/* Visual — 2 cols */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              {/* Geometric code block visual */}
              <div className="w-64 h-64 rounded-xl bg-card-solid border border-border overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] to-accent-purple/[0.05]" />
                <div className="p-5 font-mono text-xs leading-relaxed relative z-10">
                  <div className="text-text-secondary/50 mb-2">// harsh.config</div>
                  <div><span className="text-accent-purple">const</span> <span className="text-accent">engineer</span> = {'{'}</div>
                  <div className="pl-4"><span className="text-text-secondary">role:</span> <span className="text-amber-400">&quot;Data &amp; IoT&quot;</span>,</div>
                  <div className="pl-4"><span className="text-text-secondary">next:</span> <span className="text-amber-400">&quot;AI Engineer&quot;</span>,</div>
                  <div className="pl-4"><span className="text-text-secondary">exp:</span> <span className="text-accent">3</span>,</div>
                  <div className="pl-4"><span className="text-text-secondary">stack:</span> [</div>
                  <div className="pl-8"><span className="text-amber-400">&quot;Python&quot;</span>,</div>
                  <div className="pl-8"><span className="text-amber-400">&quot;FastAPI&quot;</span>,</div>
                  <div className="pl-8"><span className="text-amber-400">&quot;Docker&quot;</span>,</div>
                  <div className="pl-4">],</div>
                  <div>{'}'}</div>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-2 -right-2 w-64 h-64 rounded-xl border border-accent/10 -z-10" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-5 rounded-lg border border-border bg-glass">
              <div className="font-heading text-2xl font-bold text-accent mb-1">{s.value}</div>
              <div className="text-text-secondary text-xs tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
