import { useRef, useEffect, useCallback } from 'react'

// Cached singleton — all consumers share one listener + one ref object.
// Zero setState, zero re-renders on mouse move.
const cursor = {
  position: { x: 0, y: 0 },
  normalized: { x: 0, y: 0 },
  _listening: false,
  _init() {
    if (this._listening) return
    this._listening = true
    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.position.x = e.clientX
      this.position.y = e.clientY
      this.normalized.x = (e.clientX / window.innerWidth) * 2 - 1
      this.normalized.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }, { passive: true })
  },
}

/**
 * Returns mutable ref objects for cursor position (no re-renders).
 * Components that need reactive updates (like the Hero glow div) can use
 * the optional `subscribe` callback to get notified on each move.
 */
export function useCursorPosition(onMove?: (pos: typeof cursor.position, norm: typeof cursor.normalized) => void) {
  const posRef = useRef(cursor.position)
  const normRef = useRef(cursor.normalized)

  useEffect(() => {
    cursor._init()
    posRef.current = cursor.position
    normRef.current = cursor.normalized
  }, [])

  // Optional reactive callback (throttled via rAF)
  const rafId = useRef(0)
  const onMoveRef = useRef(onMove)
  onMoveRef.current = onMove

  useEffect(() => {
    if (!onMoveRef.current) return
    const handler = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        onMoveRef.current?.(cursor.position, cursor.normalized)
      })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handler)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  // For the Hero glow div we need a way to get x/y without re-render.
  // Expose a getter function that reads the singleton directly.
  const getPosition = useCallback(() => cursor.position, [])
  const getNormalized = useCallback(() => cursor.normalized, [])

  return {
    /** Mutable ref — read inside useFrame / rAF. Never triggers re-render. */
    position: posRef.current,
    normalized: normRef.current,
    getPosition,
    getNormalized,
  }
}
