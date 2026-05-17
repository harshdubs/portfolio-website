import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { useIsMobile } from '../hooks/useIsMobile'

const skillGroups = [
  {
    title: 'Languages & Analysis',
    icon: '⌬',
    code: 'LNG',
    accent: '#00ff88',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'C++'],
  },
  {
    title: 'Analytics & ML',
    icon: '∿',
    code: 'ANL',
    accent: '#7c3aed',
    skills: ['EDA', 'Hypothesis Testing', 'A/B Testing', 'Regression', 'Isolation Forest', 'SPC', 'Root Cause Analysis'],
  },
  {
    title: 'Visualization & BI',
    icon: '◔',
    code: 'VIZ',
    accent: '#fbbf24',
    skills: ['Power BI', 'DAX', 'Tableau', 'Matplotlib', 'Seaborn', 'Excel'],
  },
  {
    title: 'Engineering & IoT',
    icon: '⚙',
    code: 'ENG',
    accent: '#06b6d4',
    skills: ['ETL Pipelines', 'OPC-UA', 'Docker', 'Linux', 'REST APIs', 'ICONICS SCADA', 'DOPAC', 'Edge Computing'],
  },
  {
    title: 'AI & App Dev',
    icon: '✦',
    code: 'AIX',
    accent: '#f472b6',
    skills: ['Groq LLM API', 'Streamlit', 'FastAPI', 'LangChain', 'Git & GitHub'],
  },
  {
    title: 'Industrial Tools',
    icon: '⊕',
    code: 'IND',
    accent: '#fb923c',
    skills: ['SQL Server', 'STEP-7', 'TWINCAT-2', 'TIA Portal', 'PLC/IPC Systems', 'MQTT'],
  },
]

/* ---- Boot-up terminal banner with live counter ---- */
function BootBanner({ totalSkills, totalGroups }) {
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const [skillCount, setSkillCount] = useState(0)
  const [groupCount, setGroupCount] = useState(0)
  const [stage, setStage] = useState(0) // 0 idle, 1 init, 2 load, 3 ready

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setStage(1), 200)
    const t2 = setTimeout(() => setStage(2), 600)
    const t3 = setTimeout(() => setStage(3), 1800)
    const dur = 900
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setSkillCount(Math.round(eased * totalSkills))
      setGroupCount(Math.round(eased * totalGroups))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const startCount = setTimeout(() => { raf = requestAnimationFrame(tick) }, 600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(startCount); if (raf) cancelAnimationFrame(raf) }
  }, [inView, totalSkills, totalGroups])

  return (
    <motion.div
      ref={ref}
      className={`relative mb-10 rounded-xl border border-white/[0.08] overflow-hidden ${isMobile ? 'bg-black/80' : 'bg-black/40 backdrop-blur-md'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
        <span className="ml-3 font-mono text-[12px] text-text-secondary/70 tracking-wider">~/skills.exec</span>
        <span className="ml-auto font-mono text-[12px] text-accent/70">● LIVE</span>
      </div>
      <div className="px-5 py-4 font-mono text-sm text-text-secondary leading-relaxed">
        <div><span className="text-accent">$</span> ./load_stack.sh <span className="text-text-secondary/40">--verbose</span></div>
        {stage >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <span className="text-accent-purple">›</span> initializing toolbox modules…
          </motion.div>
        )}
        {stage >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <span className="text-accent-purple">›</span> linked{' '}
            <span className="text-accent font-semibold">{groupCount}</span> categories ·{' '}
            <span className="text-accent font-semibold">{skillCount}</span> tools
          </motion.div>
        )}
        {stage >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <span className="text-accent">✓</span> stack ready · hover to inspect
            <span className="cursor-blink text-accent ml-1">▌</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ---- Skill chip with proficiency line ---- */
function SkillChip({ skill, accent, gi, si, isMobile }) {
  if (isMobile) {
    return (
      <motion.span
        className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium border border-white/[0.06] text-text-secondary bg-primary/40 cursor-default"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.25, delay: gi * 0.03 }}
      >
        <span
          className="w-1 h-1 rounded-full opacity-60"
          style={{ background: accent }}
        />
        <span className="relative z-10">{skill}</span>
      </motion.span>
    )
  }
  return (
    <motion.span
      className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-medium border border-white/[0.06] text-text-secondary bg-primary/40 cursor-default overflow-hidden group/chip"
      initial={{ opacity: 0, y: 14, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 18,
        delay: gi * 0.06 + si * 0.04,
      }}
      whileHover={{
        y: -3,
        scale: 1.06,
        borderColor: `${accent}55`,
        color: accent,
        transition: { duration: 0.2 },
      }}
    >
      {/* shimmer sweep on hover */}
      <span
        className="absolute inset-0 opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}1a, transparent)`,
          transform: 'translateX(-100%)',
          animation: 'chip-sweep 1.2s ease-in-out infinite',
        }}
      />
      <span
        className="w-1 h-1 rounded-full opacity-50 group-hover/chip:opacity-100 transition-opacity"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
      />
      <span className="relative z-10">{skill}</span>
    </motion.span>
  )
}

/* ---- Category card — MOBILE: static, no springs, no tilt ---- */
function CategoryCardMobile({ group, gi }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.35, delay: gi * 0.04 }}
    >
      <div className="relative rounded-xl p-6 h-full border border-white/[0.06] bg-card-solid/80 overflow-hidden">
        {/* corner brackets static */}
        {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((c) => (
          <span
            key={c}
            className={`absolute w-4 h-4 ${c} opacity-30`}
            style={{ borderColor: group.accent }}
          />
        ))}

        {/* HEADER */}
        <div className="relative z-10 flex items-start gap-3 mb-5">
          <div
            className="relative w-11 h-11 shrink-0 flex items-center justify-center rounded-lg border bg-black/40"
            style={{ borderColor: `${group.accent}33`, color: group.accent }}
          >
            <span className="text-xl">{group.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: group.accent }}>
                {group.code}·{String(gi + 1).padStart(2, '0')}
              </span>
              <span
                className="flex-1 h-px"
                style={{ background: `linear-gradient(90deg, ${group.accent}99, transparent)` }}
              />
              <span className="font-mono text-[12px] text-text-secondary/60">
                {String(group.skills.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="font-heading text-text-primary font-semibold text-[17px] tracking-tight leading-tight mt-1">
              {group.title}
            </h3>
          </div>
        </div>

        {/* SKILLS */}
        <div className="relative z-10 flex flex-wrap gap-2">
          {group.skills.map((skill, si) => (
            <SkillChip key={skill} skill={skill} accent={group.accent} gi={gi} si={si} isMobile />
          ))}
        </div>

        {/* bottom signal bars — plain divs with inline width */}
        <div className="relative z-10 flex items-end gap-0.5 mt-5 h-3">
          {Array.from({ length: 18 }).map((_, i) => {
            const h = 30 + ((i * 137 + gi * 53) % 70)
            return (
              <span
                key={i}
                className="block w-0.5 rounded-sm"
                style={{
                  background: group.accent,
                  opacity: 0.18 + (i / 18) * 0.5,
                  height: `${h}%`,
                }}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

/* ---- Category card with mouse-follow glow + 3D tilt (desktop) ---- */
function CategoryCardDesktop({ group, gi }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })
  const glowX = useTransform(mx, (v) => `${v * 100}%`)
  const glowY = useTransform(my, (v) => `${v * 100}%`)

  const handleMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const handleLeave = () => { mx.set(0.5); my.set(0.5) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative"
      style={{ perspective: '1100px' }}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: gi * 0.07 }}
    >
      <motion.div
        className="relative rounded-xl p-6 h-full border bg-card-solid/60 backdrop-blur-md overflow-hidden group transition-colors duration-500"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
          borderColor: 'rgba(255,255,255,0.06)',
          willChange: 'transform',
        }}
        whileHover={{ borderColor: `${group.accent}40` }}
      >
        {/* mouse-follow radial glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(380px circle at ${x} ${y}, ${group.accent}1a, transparent 60%)`
            ),
          }}
        />

        {/* corner brackets */}
        {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((c) => (
          <span
            key={c}
            className={`absolute w-4 h-4 ${c} opacity-30 group-hover:opacity-80 transition-opacity duration-500`}
            style={{ borderColor: group.accent }}
          />
        ))}

        {/* dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${group.accent} 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
          }}
        />

        {/* HEADER */}
        <div className="relative z-10 flex items-start gap-3 mb-5" style={{ transform: 'translateZ(30px)' }}>
          <motion.div
            className="relative w-11 h-11 shrink-0 flex items-center justify-center rounded-lg border bg-black/40"
            style={{ borderColor: `${group.accent}33`, color: group.accent }}
            animate={{
              boxShadow: [`0 0 0px ${group.accent}00`, `0 0 18px ${group.accent}55`, `0 0 0px ${group.accent}00`],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: gi * 0.4 }}
          >
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 22 + gi * 2, repeat: Infinity, ease: 'linear' }}
            >
              {group.icon}
            </motion.span>
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: group.accent }}>
                {group.code}·{String(gi + 1).padStart(2, '0')}
              </span>
              <motion.span
                className="flex-1 h-px"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: gi * 0.07 + 0.3 }}
                style={{
                  originX: 0,
                  background: `linear-gradient(90deg, ${group.accent}99, transparent)`,
                }}
              />
              <span className="font-mono text-[12px] text-text-secondary/60">
                {String(group.skills.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="font-heading text-text-primary font-semibold text-[17px] tracking-tight leading-tight mt-1 group-hover:text-text-primary transition-colors duration-300">
              {group.title}
            </h3>
          </div>
        </div>

        {/* SKILLS */}
        <div className="relative z-10 flex flex-wrap gap-2" style={{ transform: 'translateZ(20px)' }}>
          {group.skills.map((skill, si) => (
            <SkillChip key={skill} skill={skill} accent={group.accent} gi={gi} si={si} isMobile={false} />
          ))}
        </div>

        {/* bottom signal bars (random "loadout" indicator) */}
        <div className="relative z-10 flex items-end gap-0.5 mt-5 h-3" style={{ transform: 'translateZ(10px)' }}>
          {Array.from({ length: 18 }).map((_, i) => {
            const h = 30 + ((i * 137 + gi * 53) % 70)
            return (
              <motion.span
                key={i}
                className="block w-0.5 rounded-sm"
                style={{ background: group.accent, opacity: 0.18 + (i / 18) * 0.5 }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: h / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.07 + 0.4 + i * 0.015, ease: [0.22, 1, 0.36, 1] }}
              />
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

function CategoryCard({ group, gi, isMobile }) {
  return isMobile ? <CategoryCardMobile group={group} gi={gi} /> : <CategoryCardDesktop group={group} gi={gi} />
}

/* ---- Marquee skills ticker at bottom ---- */
function SkillTicker({ skills }) {
  return (
    <div className="relative mt-12 overflow-hidden border-y border-white/[0.06] py-3 bg-black/30">
      <motion.div
        className="flex gap-8 whitespace-nowrap font-mono text-[13px] tracking-[0.25em] uppercase text-text-secondary/55"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {[...skills, ...skills].map((s, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            <span className="text-accent">●</span>
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const totalSkills = skillGroups.reduce((s, g) => s + g.skills.length, 0)

  // Background grid that subtly pans with scroll (desktop only)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const gridY = useTransform(scrollYProgress, [0, 1], ['0px', '120px'])

  const allSkills = skillGroups.flatMap((g) => g.skills)

  return (
    <section ref={sectionRef} id="skills" className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50 overflow-hidden">
      {/* animated background grid — static on mobile */}
      {isMobile ? (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: gridY,
            y: gridY,
          }}
        />
      )}
      {/* ambient blobs — skip on mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-purple/[0.04] blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading number="02" title="Skills" />

        <BootBanner totalSkills={totalSkills} totalGroups={skillGroups.length} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skillGroups.map((group, gi) => (
            <CategoryCard key={group.title} group={group} gi={gi} isMobile={isMobile} />
          ))}
        </div>

        {!isMobile && <SkillTicker skills={allSkills} />}
      </div>
    </section>
  )
}
