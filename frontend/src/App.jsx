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
import CinematicSection from './components/CinematicSection'
import SceneIndicator from './components/SceneIndicator'
import SceneDivider from './components/SceneDivider'
import MobileTabBar from './components/MobileTabBar'

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-primary flex items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Animated rings */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-accent/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-28 h-28 rounded-full border border-accent-purple/20"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-full border border-accent/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative flex items-center gap-0.5">
        {/* H */}
        <motion.span
          className="font-heading text-4xl font-bold text-accent"
          initial={{ opacity: 0, y: 30, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          H
        </motion.span>
        {/* D */}
        <motion.span
          className="font-heading text-4xl font-bold text-accent"
          initial={{ opacity: 0, y: 30, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          D
        </motion.span>
        {/* Dot */}
        <motion.span
          className="font-heading text-4xl font-bold text-text-primary"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5, type: 'spring', stiffness: 300 }}
        >
          .
        </motion.span>
      </div>

      {/* Loading bar */}
      <motion.div
        className="absolute bottom-[40%] w-32 h-[2px] bg-white/5 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <ScrollProgress />
      <CursorGlow />
      <SceneIndicator />

      <div className="w-full min-h-screen bg-primary text-text-primary">
        <Navbar />
        <main className="w-full">
          <Hero />
          <SceneDivider label="Origin" take="01" />
          <CinematicSection intensity={0.7}><About /></CinematicSection>
          <SceneDivider label="Toolbox" take="02" />
          <CinematicSection intensity={0.6} flip><Skills /></CinematicSection>
          <SceneDivider label="Showreel" take="03" />
          <CinematicSection intensity={0.5}><Projects /></CinematicSection>
          <SceneDivider label="Field Work" take="04" />
          <CinematicSection intensity={0.6} flip><Experience /></CinematicSection>
          <SceneDivider label="Trophies" take="05" />
          <CinematicSection intensity={0.7}><DSAProgress /></CinematicSection>
          <SceneDivider label="Say Hello" take="06" />
          <CinematicSection intensity={0.8} flip><Contact /></CinematicSection>
        </main>
        <Footer />
        <div className="md:hidden h-20" aria-hidden />
      </div>
      <MobileTabBar />
    </>
  )
}

export default App
