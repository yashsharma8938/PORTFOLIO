import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RoboticAvatarProps {
  mouseX: number
  mouseY: number
  laserActive?: boolean
}

export function RoboticAvatar({ mouseX, mouseY, laserActive = false }: RoboticAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const laserGroupRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const laserLeftRef = useRef<THREE.Mesh>(null)
  const laserRightRef = useRef<THREE.Mesh>(null)
  const floorGlowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Head cursor tracking (lerped)
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseX * 0.45,
        0.06
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouseY * 0.28,
        0.06
      )
    }

    // Idle breathing
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 1.1) * 0.016
      bodyRef.current.scale.y = 1 + Math.sin(t * 1.1) * 0.007
    }

    // Subtle arm swing
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 0.8) * 0.06 + 0.1
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(t * 0.8) * 0.06 - 0.1
    }

    // Slight overall lean
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.08,
        0.03
      )
    }

    // Eye + laser glow
    const eyeIntensity = laserActive ? 2.5 + Math.sin(t * 8) * 0.5 : 0.8
    if (leftEyeRef.current) {
      ;(leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity
    }
    if (rightEyeRef.current) {
      ;(rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity
    }

    // Laser beam opacity fade
    if (laserLeftRef.current && laserRightRef.current) {
      const mat = laserLeftRef.current.material as THREE.MeshStandardMaterial
      const mat2 = laserRightRef.current.material as THREE.MeshStandardMaterial
      const targetOpacity = laserActive ? 0.75 + Math.sin(t * 12) * 0.15 : 0
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.08)
      mat2.opacity = THREE.MathUtils.lerp(mat2.opacity, targetOpacity, 0.08)
      mat.emissiveIntensity = mat.opacity * 4
      mat2.emissiveIntensity = mat2.opacity * 4
    }

    // Floor glow pulse
    if (floorGlowRef.current) {
      ;(floorGlowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.3 + Math.sin(t * 2.2) * 0.15
      ;(floorGlowRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.12 + Math.sin(t * 2.2) * 0.05
    }
  })

  // ── Materials ──
  const chrome = {
    color: '#c0c2cc',
    metalness: 0.97,
    roughness: 0.05,
    envMapIntensity: 2.5,
  }
  const gunmetal = {
    color: '#1c1e26',
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 1.8,
  }
  const visorBlue = {
    color: '#1a4fff',
    metalness: 0.3,
    roughness: 0.1,
    emissive: '#0030cc' as unknown as THREE.Color,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.85,
  }
  const accent = {
    color: '#4F8EF7',
    metalness: 0.4,
    roughness: 0.1,
    emissive: '#234acc' as unknown as THREE.Color,
    emissiveIntensity: 0.5,
  }

  return (
    <group ref={groupRef} position={[2.6, -0.8, 0]} scale={0.82}>
      <group ref={bodyRef}>
        {/* ── Torso ── */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.7, 0.9, 0.38]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        {/* Chest plate */}
        <mesh position={[0, 0.05, 0.2]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.06]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        {/* Arc reactor glow */}
        <mesh position={[0, 0.18, 0.24]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
          <meshStandardMaterial
            color="#4F8EF7"
            emissive="#4F8EF7"
            emissiveIntensity={2}
            metalness={0.2}
            roughness={0.1}
          />
        </mesh>
        {/* Arc reactor outer ring glow */}
        <mesh position={[0, 0.18, 0.23]}>
          <torusGeometry args={[0.09, 0.012, 8, 32]} />
          <meshStandardMaterial
            color="#6ec6ff"
            emissive="#4F8EF7"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Torso panels (side detail) */}
        <mesh position={[-0.32, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.3]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0.32, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.3]} />
          <meshStandardMaterial {...chrome} />
        </mesh>

        {/* ── Shoulders ── */}
        <mesh position={[-0.55, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0.55, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial {...chrome} />
        </mesh>

        {/* ── Arms ── */}
        <mesh ref={leftArmRef} position={[-0.68, -0.1, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        <mesh ref={rightArmRef} position={[0.68, -0.1, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.6, 8, 16]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        {/* Forearm chrome detail */}
        <mesh position={[-0.68, -0.35, 0]} castShadow>
          <boxGeometry args={[0.16, 0.2, 0.16]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0.68, -0.35, 0]} castShadow>
          <boxGeometry args={[0.16, 0.2, 0.16]} />
          <meshStandardMaterial {...chrome} />
        </mesh>

        {/* ── Neck ── */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.13, 0.15, 16]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>

        {/* ── Head ── */}
        <group ref={headRef} position={[0, 0.82, 0]}>
          {/* Head box */}
          <mesh castShadow>
            <boxGeometry args={[0.52, 0.55, 0.45]} />
            <meshStandardMaterial {...gunmetal} />
          </mesh>
          {/* Visor */}
          <mesh position={[0, 0.04, 0.23]}>
            <boxGeometry args={[0.38, 0.14, 0.04]} />
            <meshStandardMaterial {...visorBlue} />
          </mesh>
          {/* Visor glow ring */}
          <mesh position={[0, 0.04, 0.2]}>
            <boxGeometry args={[0.42, 0.18, 0.02]} />
            <meshStandardMaterial
              color="#4F8EF7"
              emissive="#4F8EF7"
              emissiveIntensity={0.4}
              metalness={0}
              roughness={1}
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* ── Eyes (laser emitters) ── */}
          <mesh ref={leftEyeRef} position={[-0.1, 0.06, 0.245]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial
              color="#00aaff"
              emissive="#0066ff"
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.1, 0.06, 0.245]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial
              color="#00aaff"
              emissive="#0066ff"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* ── Laser beams from eyes ── */}
          <group ref={laserGroupRef}>
            {/* Left laser */}
            <mesh
              ref={laserLeftRef}
              position={[-0.55, 0.06, 0.245]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <cylinderGeometry args={[0.004, 0.004, 1.0, 8]} />
              <meshStandardMaterial
                color="#4488ff"
                emissive="#4488ff"
                emissiveIntensity={0}
                transparent
                opacity={0}
                depthWrite={false}
              />
            </mesh>
            {/* Right laser */}
            <mesh
              ref={laserRightRef}
              position={[-0.35, 0.06, 0.245]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <cylinderGeometry args={[0.004, 0.004, 1.0, 8]} />
              <meshStandardMaterial
                color="#4488ff"
                emissive="#4488ff"
                emissiveIntensity={0}
                transparent
                opacity={0}
                depthWrite={false}
              />
            </mesh>
          </group>

          {/* Head top panel */}
          <mesh position={[0, 0.29, 0]} castShadow>
            <boxGeometry args={[0.48, 0.04, 0.41]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
          {/* Ear panels */}
          <mesh position={[-0.28, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.4, 0.35]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
          <mesh position={[0.28, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.4, 0.35]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
          {/* Antenna */}
          <mesh position={[0.15, 0.38, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
            <meshStandardMaterial {...accent} />
          </mesh>
          <mesh position={[0.15, 0.5, 0]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial
              color="#4F8EF7"
              emissive="#4F8EF7"
              emissiveIntensity={3}
            />
          </mesh>
        </group>

        {/* ── Pelvis ── */}
        <mesh position={[0, -0.52, 0]} castShadow>
          <boxGeometry args={[0.6, 0.12, 0.34]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>

        {/* ── Legs ── */}
        <mesh position={[-0.2, -0.85, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.45, 8, 16]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        <mesh position={[0.2, -0.85, 0]} castShadow>
          <capsuleGeometry args={[0.11, 0.45, 8, 16]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        {/* Knee joint */}
        <mesh position={[-0.2, -1.08, 0]} castShadow>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0.2, -1.08, 0]} castShadow>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        {/* Lower legs */}
        <mesh position={[-0.2, -1.3, 0.02]} castShadow>
          <capsuleGeometry args={[0.09, 0.32, 8, 16]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        <mesh position={[0.2, -1.3, 0.02]} castShadow>
          <capsuleGeometry args={[0.09, 0.32, 8, 16]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        {/* Feet */}
        <mesh position={[-0.2, -1.5, 0.05]} castShadow>
          <boxGeometry args={[0.18, 0.08, 0.28]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
        <mesh position={[0.2, -1.5, 0.05]} castShadow>
          <boxGeometry args={[0.18, 0.08, 0.28]} />
          <meshStandardMaterial {...gunmetal} />
        </mesh>
      </group>

      {/* Floor glow under robot */}
      <mesh ref={floorGlowRef} position={[0, -1.56, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.0, 1.0]} />
        <meshStandardMaterial
          color="#4F8EF7"
          emissive="#4F8EF7"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  )
}
