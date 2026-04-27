import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
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
    <section id="contact" className="w-full py-24 px-6 bg-secondary/50">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            className="font-mono text-accent text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            06
          </motion.span>
          <motion.h2
            className="font-heading text-3xl font-bold text-text-primary mt-2 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-text-secondary text-sm max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have a question or want to work together? I&apos;d love to hear from you.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { type: 'text', placeholder: 'Name', key: 'name' },
            { type: 'email', placeholder: 'Email', key: 'email' },
          ].map((field) => (
            <div key={field.key} className="relative group">
              <input
                type={field.type}
                placeholder={field.placeholder}
                required
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full px-4 py-3.5 bg-card-solid border border-white/[0.06] rounded-lg text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none transition-colors duration-300"
              />
              {/* Focus border slide-in */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-focus-within:w-full transition-all duration-300 rounded-b-lg" />
            </div>
          ))}
          <div className="relative group">
            <textarea
              placeholder="Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3.5 bg-card-solid border border-white/[0.06] rounded-lg text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none transition-colors duration-300 resize-none"
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-focus-within:w-full transition-all duration-300 rounded-b-lg" />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3.5 bg-accent text-primary font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 tracking-wide relative overflow-hidden"
          >
            {status === 'sending' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : status === 'sent' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Sent!
              </span>
            ) : (
              'Send Message'
            )}
          </button>
          {status === 'sent' && (
            <motion.p
              className="text-accent text-center text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Message sent — I&apos;ll get back to you soon!
            </motion.p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
          )}
        </motion.form>

        <motion.div
          className="flex justify-center gap-5 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="https://www.linkedin.com/in/harsh-dubey-1b169a242"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg border border-white/[0.06] text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a
            href="https://github.com/harshdubs"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg border border-white/[0.06] text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
