import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ComputerModel } from './ComputerModel'
import { RoboticAvatar } from './RoboticAvatar'
import { ParticleField } from './ParticleField'
import { HologramLaser } from './HologramLaser'
import { useCursorPosition } from '@/hooks/useCursorPosition'

function SceneLights() {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.15} color="#1a1a2e" />

      {/* Key light — blue toned */}
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

      {/* Fill light — purple */}
      <pointLight position={[3, 2, -2]} intensity={15} color="#8B5CF6" />

      {/* Rim — cyan backlight */}
      <pointLight position={[0, -1, -3]} intensity={25} color="#06B6D4" />

      {/* Ground bounce */}
      <pointLight position={[0, -2, 1]} intensity={8} color="#2244aa" />

      {/* Robot accent light */}
      <pointLight position={[2.6, 0.5, 1]} intensity={20} color="#4F8EF7" />

      {/* Hologram area light — in front of robot */}
      <pointLight position={[2.6, 1.2, 2]} intensity={10} color="#00aaff" />
    </>
  )
}

export function Scene() {
  const { normalized } = useCursorPosition()
  const [holoVisible, setHoloVisible] = useState(false)

  // Trigger hologram 1.5 s after mount
  useEffect(() => {
    const t = setTimeout(() => setHoloVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, 5.5], fov: 50 }}
      gl={{
        antialias: true,
        toneMapping: 3,          // ACESFilmicToneMapping
        toneMappingExposure: 1.1,
      }}
      style={{ background: 'transparent' }}
    >
      <SceneLights />
      <ParticleField mouseX={normalized.x} mouseY={normalized.y} />

      {/* Far fog — does not affect objects at z = 0–2 */}
      <fog attach="fog" args={['#050508', 20, 40]} />

      <Suspense fallback={null}>
        {/* HDR reflections */}
        <Environment preset="night" />

        {/* ── Monitor — centre ── */}
        <ComputerModel />

        {/* ── Robot — right side ── */}
        <RoboticAvatar
          mouseX={normalized.x}
          mouseY={normalized.y}
          laserActive={holoVisible}
        />

        {/* ── Laser beams + Hologram name in front of robot ── */}
        <HologramLaser active={holoVisible} />

        {/* Soft ground shadow */}
        <ContactShadows
          position={[0, -1.65, 0]}
          opacity={0.7}
          scale={10}
          blur={2.5}
          far={3}
          color="#0a0a1a"
        />

        {/* Bloom postprocessing */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        autoRotate={false}
      />
    </Canvas>
  )
}
