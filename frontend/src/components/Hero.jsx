export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-3xl text-center">
        <p className="text-accent font-mono text-sm mb-4">Hi, I'm</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-4">
          Harsh Dubey
        </h1>
        <h2 className="text-xl sm:text-2xl text-text-secondary mb-2">
          Data &amp; IoT Engineer <span className="text-accent">&rarr;</span> AI Engineer
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
          3 years at Continental India building industrial data systems.
          Now engineering the shift to AI — one project at a time.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
