import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Draw the terminal screen onto a canvas → use as texture (no DOM overlay)
function createScreenTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 336
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = '#020c18'
  ctx.fillRect(0, 0, 512, 336)

  // Title bar
  ctx.fillStyle = '#031428'
  ctx.fillRect(0, 0, 512, 32)

  // Traffic lights
  const dots = ['#ff5f57', '#ffbd2e', '#28ca42']
  dots.forEach((c, i) => {
    ctx.beginPath()
    ctx.arc(20 + i * 22, 16, 6, 0, Math.PI * 2)
    ctx.fillStyle = c
    ctx.fill()
  })

  // URL bar text
  ctx.font = '12px monospace'
  ctx.fillStyle = 'rgba(0,200,255,0.4)'
  ctx.textAlign = 'right'
  ctx.fillText('neural_os v2.0', 500, 21)
  ctx.textAlign = 'left'

  // Terminal content
  const lines = [
    { text: '> SYSTEM ONLINE', color: '#00c8ff' },
    { text: '> LOADING PORTFOLIO v2.0', color: '#00c8ff' },
    { text: '> REACT + THREE.JS + AI', color: '#00c8ff' },
    { text: '> STATUS: AVAILABLE FOR HIRE', color: '#00e5a0' },
    { text: '', color: '' },
    { text: '  Full-Stack & 3D Engineer', color: '#7dd8ff' },
    { text: '  React  ·  Node.js  ·  Three.js', color: '#7dd8ff' },
  ]

  ctx.font = '13px "Courier New", monospace'
  lines.forEach(({ text, color }, i) => {
    if (!color) return
    ctx.fillStyle = color
    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillText(text, 20, 58 + i * 22)
  })

  ctx.shadowBlur = 0

  // Skill bars
  const skills = [
    { name: 'React', pct: 92 },
    { name: 'Three.js', pct: 85 },
    { name: 'Node.js', pct: 88 },
    { name: 'AI/ML', pct: 78 },
  ]
  const barY = 230
  skills.forEach(({ name, pct }, i) => {
    const y = barY + i * 24
    ctx.fillStyle = 'rgba(0,200,255,0.5)'
    ctx.font = '11px monospace'
    ctx.fillText(name, 20, y)
    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    ctx.fillRect(90, y - 10, 360, 8)
    const grad = ctx.createLinearGradient(90, y - 10, 90 + 360 * (pct / 100), y - 2)
    grad.addColorStop(0, '#4F8EF7')
    grad.addColorStop(1, '#8B5CF6')
    ctx.fillStyle = grad
    ctx.fillRect(90, y - 10, 360 * (pct / 100), 8)
    ctx.fillStyle = 'rgba(0,200,255,0.4)'
    ctx.fillText(`${pct}%`, 460, y)
  })

  // Scanlines overlay
  for (let y = 0; y < 336; y += 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.08)'
    ctx.fillRect(0, y, 512, 2)
  }

  // Bottom status
  ctx.font = '10px monospace'
  ctx.fillStyle = 'rgba(0,200,255,0.3)'
  ctx.fillText('◉ CONNECTED', 20, 320)
  ctx.textAlign = 'right'
  ctx.fillText('portfolio.dev', 492, 320)

  return canvas
}

export function ComputerModel() {
  const groupRef = useRef<THREE.Group>(null)
  const screenMeshRef = useRef<THREE.Mesh>(null)
  const screenLightRef = useRef<THREE.PointLight>(null)

  // Create the screen texture once
  const screenTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(createScreenTexture())
    tex.needsUpdate = true
    return tex
  }, [])

  // Subtle idle float + rotation
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.12
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.04

    // Screen glow pulse
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 4 + Math.sin(t * 1.5) * 0.8
    }
  })

  const aluminumMaterial = {
    color: '#b0b0b8',
    metalness: 0.9,
    roughness: 0.15,
    envMapIntensity: 1.2,
  }

  const darkAluminum = {
    color: '#1a1a1f',
    metalness: 0.8,
    roughness: 0.2,
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Screen cast light */}
      <pointLight
        ref={screenLightRef}
        position={[0, 0.8, 1.2]}
        color="#00aaff"
        intensity={4}
        distance={3}
        decay={2}
      />

      {/* ── Monitor body ── */}
      {/* Screen bezel */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.6, 0.06]} />
        <meshStandardMaterial {...darkAluminum} />
      </mesh>

      {/* Screen edge glow */}
      <mesh position={[0, 0.8, 0.031]}>
        <boxGeometry args={[2.38, 1.58, 0.002]} />
        <meshStandardMaterial
          color="#004488"
          emissive="#004488"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Actual screen — canvas texture, NO Html overlay */}
      <mesh ref={screenMeshRef} position={[0, 0.8, 0.035]}>
        <boxGeometry args={[2.2, 1.44, 0.005]} />
        <meshStandardMaterial
          map={screenTexture}
          emissiveMap={screenTexture}
          emissive="#003366"
          emissiveIntensity={0.3}
          metalness={0}
          roughness={0.1}
        />
      </mesh>

      {/* Monitor chin */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[2.4, 0.08, 0.06]} />
        <meshStandardMaterial {...aluminumMaterial} />
      </mesh>

      {/* Logo notch */}
      <mesh position={[0, 0.8, -0.035]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 32]} />
        <meshStandardMaterial color="#888890" metalness={0.99} roughness={0.05} />
      </mesh>

      {/* ── Monitor stand neck ── */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.07, 0.24, 16]} />
        <meshStandardMaterial {...aluminumMaterial} />
      </mesh>

      {/* Stand arm */}
      <mesh position={[0, -0.26, -0.1]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.3]} />
        <meshStandardMaterial {...aluminumMaterial} />
      </mesh>

      {/* ── Stand base ── */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.025, 64]} />
        <meshStandardMaterial {...aluminumMaterial} />
      </mesh>

      {/* ── Keyboard ── */}
      <group position={[0, -0.345, 0.55]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.022, 0.48]} />
          <meshStandardMaterial {...darkAluminum} />
        </mesh>
        {[...Array(4)].map((_, row) =>
          [...Array(12)].map((_, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[
                -0.66 + col * 0.12,
                0.018,
                -0.16 + row * 0.11,
              ]}
            >
              <boxGeometry args={[0.09, 0.012, 0.085]} />
              <meshStandardMaterial color="#1a1a22" metalness={0.5} roughness={0.3} />
            </mesh>
          ))
        )}
      </group>

      {/* ── Mouse ── */}
      <mesh position={[0.9, -0.345, 0.55]} castShadow>
        <capsuleGeometry args={[0.04, 0.1, 8, 16]} />
        <meshStandardMaterial {...darkAluminum} />
      </mesh>
    </group>
  )
}
