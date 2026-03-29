import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

const BOOT_SEQUENCE = [
  '> INITIALIZING NEURAL ENGINE...',
  '> LOADING 3D RENDERER...',
  '> CALIBRATING MOTION SYSTEMS...',
  '> MOUNTING HOLOGRAPHIC INTERFACE...',
  '> PORTFOLIO ONLINE.',
]

export function LoadingScreen() {
  const { isLoading, loadingProgress, setLoadingProgress, setLoading } = useAppStore()
  const [bootLines, setBootLines] = useState<string[]>([])
  const [bootIndex, setBootIndex] = useState(0)

  useEffect(() => {
    // Animate loading progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 3
      if (progress >= 100) {
        progress = 100
        setLoadingProgress(100)
        clearInterval(interval)
        setTimeout(() => setLoading(false), 900)
      } else {
        setLoadingProgress(Math.round(progress))
      }
    }, 120)

    return () => clearInterval(interval)
  }, [setLoadingProgress, setLoading])

  // Boot sequence text
  useEffect(() => {
    if (bootIndex >= BOOT_SEQUENCE.length) return
    const delay = bootIndex === 0 ? 300 : 500
    const t = setTimeout(() => {
      setBootLines(l => [...l, BOOT_SEQUENCE[bootIndex]])
      setBootIndex(i => i + 1)
    }, delay)
    return () => clearTimeout(t)
  }, [bootIndex])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at center, #040b18 0%, #020508 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {/* Scanline */}
          <div className="scanline" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(79,142,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div
              className="text-5xl font-black tracking-tight gradient-text mb-1"
              style={{ letterSpacing: '-0.02em' }}
            >
              NEURAL OS
            </div>
            <div className="text-xs text-white/25 tracking-[0.5em] uppercase font-mono">
              Portfolio Interface v2.0
            </div>
          </motion.div>

          {/* Boot sequence terminal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-80 mb-8 font-mono text-[9px] leading-6"
            style={{ color: 'rgba(0,200,255,0.7)' }}
          >
            {bootLines.map((line, i) => (
              <div
                key={i}
                style={{
                  textShadow: '0 0 8px rgba(0,200,255,0.5)',
                  opacity: i === bootLines.length - 1 ? 1 : 0.6,
                }}
              >
                {line}
              </div>
            ))}
            {bootIndex < BOOT_SEQUENCE.length && (
              <span className="boot-cursor" />
            )}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-72 mb-3"
          >
            <div className="flex justify-between text-[9px] font-mono mb-1.5"
              style={{ color: 'rgba(79,142,247,0.5)' }}>
              <span>LOADING ASSETS</span>
              <span>{loadingProgress}%</span>
            </div>
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #4F8EF7, #8B5CF6, #06B6D4)',
                  boxShadow: '0 0 12px rgba(79,142,247,0.8)',
                }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* Spinning ring decoration */}
          <motion.div
            className="absolute w-72 h-72 rounded-full"
            style={{
              border: '1px solid rgba(79,142,247,0.12)',
              boxShadow: '0 0 40px rgba(79,142,247,0.06)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-52 h-52 rounded-full"
            style={{ border: '1px solid rgba(139,92,246,0.1)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-36 h-36 rounded-full"
            style={{ border: '1px solid rgba(6,182,212,0.08)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
