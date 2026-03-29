import { Suspense, useState, useEffect, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ComputerModel } from './ComputerModel'
import { RoboticAvatar } from './RoboticAvatar'
import { ParticleField } from './ParticleField'
import { HologramLaser } from './HologramLaser'
import { useCursorPosition } from '@/hooks/useCursorPosition'

// ── Memoized sub-trees that never need to re-render ──────────────────────────
const MemoizedLights = memo(function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#1a1a2e" />
      <spotLight
        position={[-3, 4, 3]}
        angle={0.3}
        penumbra={0.8}
        intensity={80}
        color="#4477ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <pointLight position={[3, 2, -2]} intensity={15} color="#8B5CF6" />
      <pointLight position={[0, -1, -3]} intensity={25} color="#06B6D4" />
      <pointLight position={[0, -2, 1]} intensity={8} color="#2244aa" />
      <pointLight position={[2.6, 0.5, 1]} intensity={20} color="#4F8EF7" />
      <pointLight position={[2.6, 1.2, 2]} intensity={10} color="#00aaff" />
    </>
  )
})

const MemoizedComputer = memo(ComputerModel)
const MemoizedShadows = memo(function Shadows() {
  return (
    <ContactShadows
      position={[0, -1.65, 0]}
      opacity={0.7}
      scale={10}
      blur={2.5}
      far={3}
      color="#0a0a1a"
    />
  )
})

const MemoizedPostFX = memo(function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  )
})

const MemoizedControls = memo(function Controls() {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      enableRotate={false}
      autoRotate={false}
    />
  )
})

export function Scene() {
  const { normalized } = useCursorPosition()
  const [holoVisible, setHoloVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHoloVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, 5.5], fov: 50 }}
      dpr={[1, 1.5]}          /* cap pixel ratio — biggest perf win on HiDPI */
      frameloop="always"
      performance={{ min: 0.5 }}
      gl={{
        antialias: true,
        toneMapping: 3,
        toneMappingExposure: 1.1,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <MemoizedLights />
      {/* ParticleField reads cursor from the mutable ref inside useFrame */}
      <ParticleField mouseX={normalized.x} mouseY={normalized.y} />

      <fog attach="fog" args={['#050508', 20, 40]} />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <MemoizedComputer />
        <RoboticAvatar
          mouseX={normalized.x}
          mouseY={normalized.y}
          laserActive={holoVisible}
        />
        <HologramLaser active={holoVisible} />
        <MemoizedShadows />
        <MemoizedPostFX />
      </Suspense>

      <MemoizedControls />
    </Canvas>
  )
}
