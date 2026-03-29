import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Spotify Clone',
    category: 'Web / API',
    description: 'A full-featured Spotify clone with real-time music playback, playlist management, and artist discovery powered by the Spotify Web API.',
    tech: ['React', 'Node.js', 'Spotify API', 'Tailwind CSS'],
    color: '#1DB954',
    stats: { stars: 48, forks: 12 },
    year: '2025',
  },
  {
    id: 2,
    title: 'AI Fake News Detection',
    category: 'AI / ML',
    description: 'An intelligent fake news detection system using NLP and machine learning models to classify news articles as real or fake with high accuracy.',
    tech: ['Python', 'scikit-learn', 'React', 'Flask'],
    color: '#8B5CF6',
    stats: { stars: 35, forks: 8 },
    year: '2025',
  },
  {
    id: 3,
    title: 'Cloud Kitchen Website',
    category: 'Full-Stack',
    description: 'A modern cloud kitchen platform with real-time order tracking, menu management, cart functionality, and seamless payment integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#f59e0b',
    stats: { stars: 27, forks: 5 },
    year: '2024',
  },
  {
    id: 4,
    title: 'Hotel Management System',
    category: 'Full-Stack',
    description: 'A comprehensive hotel management system with room booking, guest management, staff dashboard, and real-time availability tracking with a premium golden dark UI.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#D4A017',
    stats: { stars: 22, forks: 6 },
    year: '2025',
  },
]

function TiltCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)'
    }
  }

  return (
    <div
      ref={cardRef}
      className="glass rounded-2xl p-6 cursor-pointer group"
      style={{
        border: `1px solid ${project.color}20`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Top */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
          <span className="text-xs text-white/40 font-medium tracking-wide">{project.category}</span>
        </div>
        <span className="text-xs text-white/25">{project.year}</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/90">{project.title}</h3>
      <p className="text-sm text-white/45 leading-relaxed mb-4">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded text-xs font-medium"
            style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}>
            {t}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-4 text-xs text-white/30">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {project.stats.stars}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3v6l3.5 2.5L6 14v7h2v-4.6l3.3-2.3 3.5 2.4-.8.5H16v-2l-4-2.7 4-3V3h-2v6.3L10.5 12 8 9.8V3H6z"/></svg>
            {project.stats.forks}
          </span>
        </div>
        <span className="text-xs font-semibold group-hover:gap-2 flex items-center gap-1 transition-all" style={{ color: project.color }}>
          View →
        </span>
      </div>
    </div>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-4">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #06B6D4, transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase text-accent-cyan font-semibold">Work</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16">
          <span className="text-white">Featured </span>
          <span className="gradient-text-cyan">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}>
              <TiltCard project={project} onClick={() => setSelected(project)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="glass-strong rounded-3xl p-8 max-w-md w-full pointer-events-auto"
                style={{ border: `1px solid ${selected.color}30` }}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-white">{selected.title}</h3>
                  <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white text-2xl leading-none ml-4">×</button>
                </div>
                <p className="text-white/50 mb-6 leading-relaxed">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tech.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${selected.color}15`, color: selected.color, border: `1px solid ${selected.color}30` }}>{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-black"
                    style={{ background: selected.color }}>Live Demo</button>
                  <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold glass border border-white/10 text-white">Source Code</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
