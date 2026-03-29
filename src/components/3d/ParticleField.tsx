import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  mouseX?: number
  mouseY?: number
}

const COUNT = 3000

export function ParticleField({ mouseX = 0, mouseY = 0 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4

      // Blue/purple/cyan tones
      const t = Math.random()
      const colorChoice = Math.random()
      if (colorChoice < 0.6) {
        // Blue
        colors[i * 3 + 0] = 0.2 + t * 0.3
        colors[i * 3 + 1] = 0.4 + t * 0.2
        colors[i * 3 + 2] = 0.9 + t * 0.1
      } else if (colorChoice < 0.85) {
        // Purple
        colors[i * 3 + 0] = 0.5 + t * 0.3
        colors[i * 3 + 1] = 0.2 + t * 0.1
        colors[i * 3 + 2] = 0.8 + t * 0.15
      } else {
        // Cyan
        colors[i * 3 + 0] = 0.0
        colors[i * 3 + 1] = 0.6 + t * 0.3
        colors[i * 3 + 2] = 0.7 + t * 0.3
      }
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Base rotation + mouse parallax
    meshRef.current.rotation.y = t * 0.012 + mouseX * 0.08
    meshRef.current.rotation.x = Math.sin(t * 0.008) * 0.06 - mouseY * 0.04

    // Gentle upward drift
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += 0.0006
      if (pos[i * 3 + 1] > 9) pos[i * 3 + 1] = -9
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
