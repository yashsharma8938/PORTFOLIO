import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useCursorPosition } from '@/hooks/useCursorPosition'

const Scene = lazy(() => import('@/components/3d/Scene').then(m => ({ default: m.Scene })))

export function Hero() {
  const { position } = useCursorPosition()

  const handleScroll = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 30% 30%, #0d0d2b 0%, #050508 60%)',
      }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.8) 100%)' }}
      />

      {/* Cursor glow */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: position.x,
          top: position.y,
          width: 400,
          height: 400,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)',
          transition: 'left 0.15s ease-out, top 0.15s ease-out',
        }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* Hero text content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-0 w-full">
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6"
            style={{ border: '1px solid rgba(79,142,247,0.35)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/70">Available for hire</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-4"
          >
            <span className="text-white">Building the</span>
            <br />
            <span className="gradient-text">Future of Web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lg text-white/50 font-light max-w-md mb-8 leading-relaxed"
          >
            Full-Stack Developer & 3D Web Engineer crafting immersive, 
            high-performance digital experiences with React, Three.js & AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #4F8EF7, #8B5CF6)', boxShadow: '0 0 30px rgba(79,142,247,0.4)' }}
            >
              View Projects
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full font-semibold text-sm glass border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6 mt-12 pt-8 border-t border-white/[0.06]"
          >
            {[
              { val: '0+', label: 'Years Exp.' },
              { val: '3+', label: 'Projects' },
              { val: '0+', label: 'Clients' },
            ].map((stat) => (
              <div key={stat.val}>
                <div className="text-2xl font-black gradient-text">{stat.val}</div>
                <div className="text-xs text-white/35 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  )
}
