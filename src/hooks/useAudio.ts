import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'

// Ambient spaceship drone — royalty-free from a public CDN
// Fallback: silent if network unavailable
const AMBIENT_URL = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8d3bc1e2b7.mp3?filename=cinematic-space-drone-13543.mp3'

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<number | null>(null)
  const { audioEnabled } = useAppStore()

  // Create audio element once
  useEffect(() => {
    const audio = new Audio(AMBIENT_URL)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // React to toggle
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)

    if (audioEnabled) {
      audio.play().catch(() => {/* autoplay blocked */})
      fadeTo(audio, 0.18, 2000)
    } else {
      fadeTo(audio, 0, 1500, () => audio.pause())
    }
  }, [audioEnabled])
}

function fadeTo(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration: number,
  onDone?: () => void,
) {
  const startVolume = audio.volume
  const startTime = performance.now()

  function tick(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    audio.volume = startVolume + (targetVolume - startVolume) * easeInOut(t)
    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      onDone?.()
    }
  }

  requestAnimationFrame(tick)
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
