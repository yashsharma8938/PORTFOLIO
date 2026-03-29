import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// ─── World positions (Robot at [2.6, -0.8, 0] scale 0.82) ───────────────────
const LEFT_EYE  = new THREE.Vector3(2.518, -0.078, 0.201)
const RIGHT_EYE = new THREE.Vector3(2.682, -0.078, 0.201)
// TASK 2: shifted X left by 0.3 (was 2.6 → now 2.3) to prevent fullscreen clipping
const HOLO_X        = 2.3
const HOLO_Y        = 0.85
const HOLO_Z        = 1.55
const HOLO_CENTER   = new THREE.Vector3(HOLO_X, HOLO_Y, HOLO_Z)

// ─── Laser cylinder aligned between two world points ─────────────────────────
function LaserCylinder({
  meshRef,
  start,
  end,
}: {
  meshRef: React.RefObject<THREE.Mesh>
  start: THREE.Vector3
  end: THREE.Vector3
}) {
  const { midpoint, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(end, start)
    const length = dir.length()
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const up = new THREE.Vector3(0, 1, 0)
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize())
    return { midpoint, quaternion, length }
  }, [start, end])

  return (
    <mesh ref={meshRef} position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.005, 0.005, length, 6]} />
      <meshStandardMaterial
        color="#00ccff"
        emissive={new THREE.Color('#00aaff')}
        emissiveIntensity={3}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
interface HologramLaserProps {
  active: boolean
}

export function HologramLaser({ active }: HologramLaserProps) {
  // TASK 3: Responsive sizing/position via viewport
  const { viewport } = useThree()
  const isMobile = viewport.width < 5
  // Extra left shift on mobile, desktop already at HOLO_X - 0
  const groupX      = isMobile ? HOLO_X - 0.3 : HOLO_X
  const mainFontSize = isMobile ? 0.22 : 0.3

  const groupRef      = useRef<THREE.Group>(null)
  const mainTextRef   = useRef<any>(null)
  const scanRef       = useRef<THREE.Mesh>(null)
  const laserLeftRef  = useRef<THREE.Mesh>(null)
  const laserRightRef = useRef<THREE.Mesh>(null)
  const lightRef      = useRef<THREE.PointLight>(null)

  const opRef    = useRef(0)
  const clockRef = useRef(0)
  // TASK 1: only 'idle' | 'fadein' | 'hold' — no fadeout, text stays forever
  const phaseRef = useRef<'idle' | 'fadein' | 'hold'>('idle')

  useEffect(() => {
    if (active) {
      opRef.current    = 0
      clockRef.current = 0
      phaseRef.current = 'fadein'
      if (groupRef.current) groupRef.current.visible = true
    }
    // TASK 1: no else-branch → activating once keeps it visible permanently
  }, [active])

  useFrame((_, delta) => {
    clockRef.current += delta
    const phase = phaseRef.current

    // TASK 1: fade in to full opacity, stay in 'hold' forever — no fadeout
    if (phase === 'fadein') {
      opRef.current = Math.min(opRef.current + delta * 1.4, 1)
      if (opRef.current >= 1) phaseRef.current = 'hold'
    } else if (phase === 'idle') {
      return
    }
    // 'hold' → stays at op = 1 from now on

    const op = opRef.current
    const t  = clockRef.current

    // Subtle flicker (optional, harmless) — never drops below 0.88
    const flicker = phase === 'hold'
      ? 1 + Math.sin(t * 55) * Math.sin(t * 13) * 0.06
      : 1
    const finalOp = Math.min(op * flicker, 1)

    // Group: always visible once active, gentle float
    if (groupRef.current) {
      groupRef.current.visible   = op > 0.005
      groupRef.current.position.y = HOLO_Y + Math.sin(t * 1.3) * 0.04
      groupRef.current.position.x = groupX  // responsive X
    }

    if (mainTextRef.current)  mainTextRef.current.fillOpacity  = finalOp

    const laserOp = Math.min(op * 0.85, 1)
    if (laserLeftRef.current)
      (laserLeftRef.current.material as THREE.MeshStandardMaterial).opacity  = laserOp
    if (laserRightRef.current)
      (laserRightRef.current.material as THREE.MeshStandardMaterial).opacity = laserOp

    if (scanRef.current)
      (scanRef.current.material as THREE.MeshStandardMaterial).opacity = finalOp * 0.9

    if (lightRef.current) lightRef.current.intensity = finalOp * 4
  })

  return (
    <>
      {/* Laser beams: world-space cylinders eye → hologram */}
      <LaserCylinder meshRef={laserLeftRef}  start={LEFT_EYE}  end={HOLO_CENTER} />
      <LaserCylinder meshRef={laserRightRef} start={RIGHT_EYE} end={HOLO_CENTER} />

      {/* Hologram group */}
      <group ref={groupRef} position={[groupX, HOLO_Y, HOLO_Z]} visible={false}>

        {/* Name — responsive font size */}
        <Text
          ref={mainTextRef}
          fontSize={mainFontSize}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0}
          outlineColor="#0033cc"
          outlineWidth={0.008}
          maxWidth={3}
          textAlign="center"
        >
          Yash Sharma
        </Text>



        {/* Horizontal scan line */}
        <mesh ref={scanRef} position={[0, mainFontSize * 0.5, -0.01]}>
          <planeGeometry args={[2.2, 0.003]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive={new THREE.Color('#00ffff')}
            emissiveIntensity={4}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Glow backdrop */}
        <mesh position={[0, -0.05, -0.06]}>
          <planeGeometry args={[2.6, 0.65]} />
          <meshStandardMaterial
            color="#000d33"
            emissive={new THREE.Color('#001155')}
            emissiveIntensity={0.8}
            transparent
            opacity={0.14}
            depthWrite={false}
          />
        </mesh>

        <pointLight ref={lightRef} color="#0088ff" intensity={0} distance={2.5} decay={2} />
      </group>
    </>
  )
}
