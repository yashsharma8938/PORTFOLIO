import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SkillIcon = ({ type, color }: { type: string; color: string }) => {
  const paths: Record<string, string> = {
    frontend: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    backend: 'M4 1h16a2 2 0 012 2v18a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm1 4v2h14V5H5zm0 4v2h14V9H5zm0 4v2h8v-2H5z',
    cloud: 'M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
      <path d={paths[type] || paths.frontend} />
    </svg>
  )
}

const skillCategories = [
  {
    name: 'Frontend',
    icon: <SkillIcon type="frontend" color="#4F8EF7" />,
    color: '#4F8EF7',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Three.js / WebGL', level: 82 },
      { name: 'CSS / Tailwind', level: 92 },
    ],
  },
  {
    name: 'Backend',
    icon: <SkillIcon type="backend" color="#8B5CF6" />,
    color: '#8B5CF6',
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Python / FastAPI', level: 80 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'MongoDB', level: 82 },
    ],
  },
  {
    name: 'Tools & Cloud',
    icon: <SkillIcon type="cloud" color="#06B6D4" />,
    color: '#06B6D4',
    skills: [
      { name: 'Git / CI-CD', level: 90 },
      { name: 'AI / ML APIs', level: 75 },
      { name: 'Firebase', level: 70 },
      { name: 'Vercel / Netlify', level: 80 },
    ],
  },
]

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return
    gsap.fromTo(barRef.current,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    )
  }, [level, index])

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/70">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}66` }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.06) 0%, transparent 70%)' }} 
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #8B5CF6, transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase text-accent-purple font-semibold">Expertise</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16"
        >
          <span className="text-white">Skills & </span>
          <span className="gradient-text">Technologies</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.15 }}
              className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 group"
              style={{ border: `1px solid ${cat.color}22` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                >
                  <span style={{ filter: `drop-shadow(0 0 6px ${cat.color})` }}>
                    {cat.icon}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">{cat.name}</h3>
              </div>

              {cat.skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} color={cat.color} index={i + catIdx * 4} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Bottom icon row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {['React', 'TS', 'Node', 'Python', 'Three.js', 'Firebase', 'Git', 'ML'].map((tech, _i) => (
            <motion.div
              key={tech}
              whileHover={{ y: -4, scale: 1.05 }}
              className="glass w-16 h-16 rounded-2xl flex items-center justify-center text-xs font-bold text-white/50 hover:text-white cursor-default transition-colors"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
