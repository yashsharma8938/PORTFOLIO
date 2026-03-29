import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  mouseX?: number
  mouseY?: number
}

const COUNT = 2000   // was 3000 — cut 33 % with negligible visual change

function ParticleFieldInner({ mouseX = 0, mouseY = 0 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  // Read cursor via the mutable ref (value is updated outside React)
  const mouseRef = useRef({ x: mouseX, y: mouseY })
  mouseRef.current.x = mouseX
  mouseRef.current.y = mouseY

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4

      const t = Math.random()
      const colorChoice = Math.random()
      if (colorChoice < 0.6) {
        colors[i * 3 + 0] = 0.2 + t * 0.3
        colors[i * 3 + 1] = 0.4 + t * 0.2
        colors[i * 3 + 2] = 0.9 + t * 0.1
      } else if (colorChoice < 0.85) {
        colors[i * 3 + 0] = 0.5 + t * 0.3
        colors[i * 3 + 1] = 0.2 + t * 0.1
        colors[i * 3 + 2] = 0.8 + t * 0.15
      } else {
        colors[i * 3 + 0] = 0.0
        colors[i * 3 + 1] = 0.6 + t * 0.3
        colors[i * 3 + 2] = 0.7 + t * 0.3
      }
    }

    return { positions, colors }
  }, [])

  // Throttle expensive position-array writes to every 2nd frame
  const frameSkip = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Rotation + parallax — cheap
    meshRef.current.rotation.y = t * 0.012 + mouseRef.current.x * 0.08
    meshRef.current.rotation.x = Math.sin(t * 0.008) * 0.06 - mouseRef.current.y * 0.04

    // Drift update every 2nd frame
    frameSkip.current++
    if (frameSkip.current % 2 !== 0) return

    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += 0.0012  // doubled since we skip every other frame
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
        size={0.024}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export const ParticleField = memo(ParticleFieldInner)
