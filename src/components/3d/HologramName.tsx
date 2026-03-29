import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface HologramNameProps {
  name?: string
  position?: [number, number, number]
  visible?: boolean
}

export function HologramName({
  name = 'Yash Sharma',
  position = [-0.4, 1.6, 0.5],
  visible = true,
}: HologramNameProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const mainTextRef = useRef<any>(null)
  const taglineRef = useRef<any>(null)
  const scanLineRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const glowLightRef = useRef<THREE.PointLight>(null)

  // All animation as refs — zero setState in useFrame
  const opacityRef = useRef(0)
  const phaseRef = useRef<'fadein' | 'hold' | 'fadeout' | 'hidden'>('hidden')
  const clockRef = useRef(0)

  useEffect(() => {
    if (visible) {
      opacityRef.current = 0
      clockRef.current = 0
      phaseRef.current = 'fadein'
      if (groupRef.current) groupRef.current.visible = true
    } else {
      phaseRef.current = 'fadeout'
    }
  }, [visible])

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(180)
    for (let i = 0; i < 60; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 2.4
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    const phase = phaseRef.current
    clockRef.current += delta

    // Phase machine (all ref-based)
    if (phase === 'fadein') {
      opacityRef.current = Math.min(opacityRef.current + delta * 1.6, 1)
      if (opacityRef.current >= 1) phaseRef.current = 'hold'
    } else if (phase === 'hold' && clockRef.current > 5) {
      phaseRef.current = 'fadeout'
    } else if (phase === 'fadeout') {
      opacityRef.current = Math.max(opacityRef.current - delta * 0.6, 0)
      if (opacityRef.current <= 0) {
        phaseRef.current = 'hidden'
        if (groupRef.current) groupRef.current.visible = false
        return
      }
    } else if (phase === 'hidden') {
      return
    }

    const op = opacityRef.current
    const t = clockRef.current
    if (groupRef.current) groupRef.current.visible = true

    // Hologram flicker during hold
    const flicker = phase === 'hold'
      ? 1 + Math.sin(t * 55) * Math.sin(t * 13) * 0.07
      : 1
    const finalOp = Math.min(op * flicker, 1)

    // Float the group
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.4) * 0.03
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.025
    }

    // Update Drei Text materials via fillOpacity (the correct API)
    if (mainTextRef.current) {
      mainTextRef.current.fillOpacity = finalOp
    }
    if (taglineRef.current) {
      taglineRef.current.fillOpacity = finalOp * 0.75
    }

    // Scan line
    if (scanLineRef.current) {
      ;(scanLineRef.current.material as THREE.MeshStandardMaterial).opacity = finalOp * 0.9
      ;(scanLineRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = finalOp * 4
    }

    // Glow backdrop
    if (glowRef.current) {
      ;(glowRef.current.material as THREE.MeshStandardMaterial).opacity = finalOp * 0.2
    }

    // Point light
    if (glowLightRef.current) {
      glowLightRef.current.intensity = finalOp * 4
    }

    // Particles drift
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < 60; i++) {
        pos[i * 3 + 1] += 0.0018
        if (pos[i * 3 + 1] > 0.38) pos[i * 3 + 1] = -0.38
        pos[i * 3 + 0] += Math.sin(t + i) * 0.0004
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      ;(particlesRef.current.material as THREE.PointsMaterial).opacity = op * 0.6
    }
  })

  return (
    <group ref={groupRef} position={position} visible={false}>
      {/* Main name text */}
      <Text
        ref={mainTextRef}
        fontSize={0.26}
        maxWidth={3.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0}
        color="#88ccff"
        outlineColor="#2255cc"
        outlineWidth={0.006}
        outlineOpacity={0.6}
      >
        {name}
      </Text>

      {/* Tagline */}
      <Text
        ref={taglineRef}
        fontSize={0.09}
        position={[0, -0.24, 0]}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0}
        color="#c4b5fd"
        letterSpacing={0.05}
      >
        FULL-STACK · 3D · AI ENGINEER
      </Text>

      {/* Horizontal scan line */}
      <mesh ref={scanLineRef} position={[0, 0.1, -0.01]}>
        <planeGeometry args={[2.4, 0.003]} />
        <meshStandardMaterial
          color="#4488ff"
          emissive={new THREE.Color('#4488ff')}
          emissiveIntensity={0}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Glow backdrop */}
      <mesh ref={glowRef} position={[0, -0.05, -0.06]}>
        <planeGeometry args={[2.6, 0.65]} />
        <meshStandardMaterial
          color="#001840"
          emissive={new THREE.Color('#1133aa')}
          emissiveIntensity={0.5}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* Particle dispersion */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.016}
          color="#88aaff"
          transparent
          opacity={0}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Bloom light */}
      <pointLight
        ref={glowLightRef}
        color="#4488ff"
        intensity={0}
        distance={2.5}
        decay={2}
      />
    </group>
  )
}
