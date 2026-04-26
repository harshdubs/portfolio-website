import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-secondary">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-text-primary mb-2 text-center">
          <span className="text-accent font-mono text-lg">06.</span> Get In Touch
        </h2>
        <div className="w-20 h-1 bg-accent mb-4 mx-auto"></div>
        <p className="text-text-secondary text-center mb-8">
          Have a question or want to work together? Drop me a message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent"
          />
          <textarea
            placeholder="Message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent resize-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 bg-accent text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'sent' && (
            <p className="text-accent text-center text-sm">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
          )}
        </form>

        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://linkedin.com/in/harshdubey"
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/harshdubey"
            target="_blank"
            rel="noreferrer"
            className="text-text-secondary hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
