export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          <span className="text-accent font-mono text-lg">01.</span> About Me
        </h2>
        <div className="w-20 h-1 bg-accent mb-8"></div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4 text-text-secondary leading-relaxed">
            <p>
              I'm a Data &amp; IoT Engineer with 3 years of experience at
              <span className="text-text-primary font-medium"> Continental Automotive India</span>,
              where I build and maintain industrial data pipelines, real-time monitoring systems,
              and factory-floor analytics.
            </p>
            <p>
              My day-to-day involves Python, FastAPI, SQL, Docker, and OPC-UA protocols —
              turning raw sensor data into actionable insights for manufacturing operations.
            </p>
            <p>
              I'm currently transitioning into <span className="text-accent">AI Engineering</span>,
              building projects with LLMs, LangChain, and Streamlit while strengthening my
              fundamentals through competitive programming and DSA practice.
            </p>
          </div>

          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-lg bg-card border-2 border-border flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2 text-accent">HD</div>
                <p className="text-text-secondary text-xs">Photo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
