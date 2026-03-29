import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techStack = ['React', 'TypeScript', 'Three.js', 'Node.js', 'Python', 'PostgreSQL', 'GSAP', 'GraphQL']

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-text-line',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-text-line', start: 'top 85%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #4F8EF7, transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase text-accent-blue font-semibold">About Me</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              <span className="about-text-line block text-white">I craft digital</span>
              <span className="about-text-line block gradient-text">experiences that</span>
              <span className="about-text-line block text-white">inspire & perform.</span>
            </h2>
            <p className="about-text-line text-white/50 leading-relaxed mb-6 text-base">
              I'm an aspiring Full-Stack Developer currently pursuing B.Tech at [Vellore Institute of Technology,Chennai],
              CGPA: [8.22]. Passionate about building modern web applications with a focus on
              pixel-perfect frontends, scalable backends, and 3D web experiences.
            </p>
            <p className="about-text-line text-white/50 leading-relaxed text-base">
              When I'm not coding, I'm exploring the intersection of technology and art —
              experimenting with generative visuals, WebGL shaders, and interactive storytelling
              that push the boundaries of what browsers can do.
            </p>

            {/* CTA */}
            <motion.a
              href="/resume.pdf"
              download="Yash_Sharma_Resume.pdf"
              onClick={(e) => {
                e.preventDefault()
                const link = document.createElement('a')
                link.href = '/resume.pdf'
                link.download = 'Yash_Sharma_Resume.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="about-text-line inline-flex items-center gap-2 mt-8 text-sm font-semibold gradient-text hover:gap-4 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              Download Resume
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          </div>

          {/* Stats & Tech */}
          <div className="space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '0+', label: 'Years of Experience', color: '#4F8EF7' },
                { value: '3+', label: 'Projects Completed', color: '#8B5CF6' },
                { value: '0+', label: 'Happy Clients', color: '#06B6D4' },
                { value: '∞', label: 'Lines of Code', color: '#8B5CF6' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5"
                >
                  <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-white/40 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.08 }}
                    className="px-3 py-1 rounded-full text-xs font-semibold cursor-default"
                    style={{
                      background: 'rgba(79,142,247,0.1)',
                      border: '1px solid rgba(79,142,247,0.25)',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
