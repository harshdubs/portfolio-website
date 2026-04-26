const solved = 200
const total = 450
const percentage = Math.round((solved / total) * 100)

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

export default function DSAProgress() {
  return (
    <section id="dsa" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-accent text-sm">05</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">DSA Progress</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Main counter */}
        <div className="rounded-xl border border-border bg-card-solid/50 p-8 mb-6 text-center">
          <div className="inline-flex items-baseline gap-1 mb-2">
            <span className="font-heading text-5xl font-bold text-accent">{solved}</span>
            <span className="text-text-secondary text-lg font-light">/ {total}</span>
          </div>
          <p className="text-text-secondary text-sm mb-1">problems solved</p>
          <div className="inline-block px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/10 mt-3">
            <span className="font-mono text-accent-purple text-xs tracking-wide">Striver A2Z Sheet</span>
          </div>

          {/* Overall progress bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="w-full h-2 bg-primary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-purple"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-text-secondary text-xs mt-2 font-mono">{percentage}% complete</p>
          </div>
        </div>

        {/* Topic grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {topics.map((topic) => {
            const pct = Math.round((topic.done / topic.total) * 100)
            return (
              <div key={topic.name} className="rounded-lg border border-border bg-card-solid/30 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-secondary text-sm">{topic.name}</span>
                  <span className="font-mono text-xs text-text-secondary">
                    <span className="text-text-primary">{topic.done}</span>/{topic.total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-primary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent/60"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
