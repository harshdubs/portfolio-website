export default function DSAProgress() {
  const stats = [
    { label: 'Problems Solved', value: '200+' },
    { label: 'Striver A2Z Progress', value: '40%' },
    { label: 'Current Streak', value: '30 days' },
  ]

  const topics = [
    { name: 'Arrays & Hashing', progress: 80 },
    { name: 'Linked Lists', progress: 60 },
    { name: 'Trees & Graphs', progress: 40 },
    { name: 'Dynamic Programming', progress: 25 },
    { name: 'Binary Search', progress: 70 },
    { name: 'Sorting & Searching', progress: 75 },
  ]

  return (
    <section id="dsa" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          <span className="text-accent font-mono text-lg">05.</span> DSA Progress
        </h2>
        <div className="w-20 h-1 bg-accent mb-8"></div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-lg p-6 border border-border text-center">
              <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-text-primary font-semibold mb-4">Striver A2Z Sheet — Topic Progress</h3>
          <div className="space-y-4">
            {topics.map((topic) => (
              <div key={topic.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">{topic.name}</span>
                  <span className="text-accent font-mono">{topic.progress}%</span>
                </div>
                <div className="w-full bg-primary rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
