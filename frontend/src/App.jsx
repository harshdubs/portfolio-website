import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import DSAProgress from './components/DSAProgress'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Page load overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[100] bg-primary flex items-center justify-center"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              className="font-heading text-2xl font-bold text-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              HD<span className="text-text-primary">.</span>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
      <CursorGlow />

      <div className="w-full min-h-screen bg-primary text-text-primary">
        <Navbar />
        <main className="w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <DSAProgress />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
