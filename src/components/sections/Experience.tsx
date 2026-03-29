import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Full-Stack Developer',
    company: 'Self / Freelance',
    period: '2026 — Present',
    type: 'Full-time',
    color: '#4F8EF7',
    description: 'Building full-stack web applications with modern technologies including React, Node.js, and Three.js. Focused on delivering production-ready, high-performance digital experiences.',
    skills: ['React', 'Node.js', 'Three.js', 'MongoDB', 'TypeScript'],
  },
  {
    role: 'Frontend Developer',
    company: 'Self / Projects',
    period: '2025 — 2026',
    type: 'Self-learning',
    color: '#8B5CF6',
    description: 'Developed responsive, pixel-perfect frontend interfaces using React and modern CSS. Built interactive UI components, integrated APIs, and practiced clean code architecture.',
    skills: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs', 'Git'],
  },
  {
    role: 'Junior Developer',
    company: 'Self / Learning',
    period: '2024 — 2025',
    type: 'Self-learning',
    color: '#06B6D4',
    description: 'Began development journey learning core web technologies. Built foundational projects with HTML, CSS, JavaScript, and explored backend development with Node.js and Python.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Node.js'],
  },
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-item', start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-4">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #10b981, transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase text-emerald-400 font-semibold">Career</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16">
          <span className="text-white">Work </span>
          <span className="gradient-text">Experience</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #4F8EF766, #8B5CF666, transparent)' }} />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={exp.role} className={`timeline-item relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-[21px] md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
                  style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }} />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="glass rounded-2xl p-6"
                    style={{ border: `1px solid ${exp.color}20` }}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-white text-base">{exp.role}</h3>
                        <div className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>{exp.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/40 font-medium">{exp.period}</div>
                        <div className="text-xs mt-0.5 px-2 py-0.5 rounded-full"
                          style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}>
                          {exp.type}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-white/45 leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded text-white/50"
                          style={{ background: 'rgba(255,255,255,0.05)' }}>{s}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
