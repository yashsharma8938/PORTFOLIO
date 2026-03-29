import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useAudio } from '@/hooks/useAudio'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { theme, toggleTheme, audioEnabled, toggleAudio } = useAppStore()
  const { scrollY } = useScrollProgress()
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = scrollY > 60

  // Initialize audio system
  useAudio()

  const handleNav = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,5,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-black tracking-tight gradient-text hover:opacity-80 transition-opacity"
        >
          &lt;Portfolio /&gt;
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent-blue to-accent-purple group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Audio toggle */}
          <motion.button
            onClick={toggleAudio}
            title={audioEnabled ? 'Mute' : 'Ambient Sound'}
            className={`w-9 h-9 rounded-full flex items-center justify-center glass transition-all duration-300 ${
              audioEnabled
                ? 'audio-active border-accent-blue/60'
                : 'hover:bg-white/10'
            }`}
            animate={audioEnabled ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 1.5, repeat: audioEnabled ? Infinity : 0 }}
          >
            {audioEnabled ? (
              <svg className="w-4 h-4 text-accent-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            )}
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            title="Toggle Theme"
            className="w-9 h-9 rounded-full flex items-center justify-center glass hover:bg-white/10 transition-all"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7a5 5 0 100 10A5 5 0 0012 7zm0-5a1 1 0 010 2 1 1 0 010-2zm0 18a1 1 0 010 2 1 1 0 010-2zm9-10a1 1 0 010 2 1 1 0 010-2zm-18 0a1 1 0 010 2 1 1 0 010-2zm15.07-7.07a1 1 0 010 1.414 1 1 0 010-1.414zm-12.14 0a1 1 0 010 1.414 1 1 0 010-1.414zm12.14 12.14a1 1 0 010 1.414 1 1 0 010-1.414zm-12.14 0a1 1 0 010 1.414 1 1 0 010-1.414z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2A1 1 0 008.22 2.4a10.15 10.15 0 1013.38 13.2 1 1 0 00-.14-1.6z"/>
              </svg>
            )}
          </motion.button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block h-px w-5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-white/70 hover:text-white py-1 text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
