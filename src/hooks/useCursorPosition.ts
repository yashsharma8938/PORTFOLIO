import { useState, useEffect } from 'react'

export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [normalized, setNormalized] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      // Normalize to -1 to 1 range
      setNormalized({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { position, normalized }
}
