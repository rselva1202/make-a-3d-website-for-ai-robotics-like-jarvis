import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Sparkles,
  Stars,
  Icosahedron,
  MeshDistortMaterial,
  Trail,
} from '@react-three/drei'
import * as THREE from 'three'

type Props = { accent?: string; interactive?: boolean }

/* Central pulsing brain-core */
function Core({ accent }: { accent: string }) {
  const inner = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const s = 1 + Math.sin(t * 1.6) * 0.05
    if (inner.current) {
      inner.current.rotation.y = t * 0.35
      inner.current.rotation.x = t * 0.18
      inner.current.scale.setScalar(s)
    }
    if (glow.current) {
      const g = 1.35 + Math.sin(t * 1.6) * 0.08
      glow.current.scale.setScalar(g)
    }
  })
  return (
    <group>
      {/* soft additive glow shell */}
      <mesh ref={glow}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
      <Icosahedron ref={inner} args={[1, 4]}>
        <MeshDistortMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={1.4}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={2.2}
        />
      </Icosahedron>
    </group>
  )
}

/* Rotating wireframe shell */
function Shell({ accent }: { accent: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = -t * 0.12
      ref.current.rotation.z = t * 0.06
    }
  })
  return (
    <Icosahedron ref={ref} args={[1.9, 1]}>
      <meshBasicMaterial color={accent} wireframe transparent opacity={0.22} />
    </Icosahedron>
  )
}

/* Gyroscopic orbiting rings */
function Rings({ accent }: { accent: string }) {
  const g1 = useRef<THREE.Mesh>(null)
  const g2 = useRef<THREE.Mesh>(null)
  const g3 = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (g1.current) g1.current.rotation.z = t * 0.5
    if (g2.current) {
      g2.current.rotation.x = t * 0.4
      g2.current.rotation.y = Math.PI / 3
    }
    if (g3.current) {
      g3.current.rotation.y = t * 0.6
      g3.current.rotation.x = Math.PI / 2.4
    }
  })
  const mat = (
    <meshStandardMaterial
      color={accent}
      emissive={accent}
      emissiveIntensity={1.6}
      metalness={0.9}
      roughness={0.2}
    />
  )
  return (
    <group>
      <mesh ref={g1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.018, 16, 128]} />
        {mat}
      </mesh>
      <mesh ref={g2}>
        <torusGeometry args={[3.1, 0.014, 16, 128]} />
        {mat}
      </mesh>
      <mesh ref={g3}>
        <torusGeometry args={[3.5, 0.01, 16, 128]} />
        {mat}
      </mesh>
    </group>
  )
}

/* Small satellites tracing light trails around the core */
function Satellite({ radius, speed, accent, offset }: { radius: number; speed: number; accent: string; offset: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t * 1.3) * radius * 0.35,
        Math.sin(t) * radius,
      )
    }
  })
  return (
    <Trail width={2.2} length={5} color={new THREE.Color(accent)} attenuation={(w) => w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </Trail>
  )
}

/* Data particle field */
function DataField({ accent }: { accent: string }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const n = 900
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 5 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.04
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={accent}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Rig({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null)
  useFrame(({ pointer }) => {
    if (group.current) {
      // gentle parallax toward pointer
      group.current.rotation.y += (pointer.x * 0.4 - group.current.rotation.y) * 0.03
      group.current.rotation.x += (-pointer.y * 0.25 - group.current.rotation.x) * 0.03
    }
  })
  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <Core accent={accent} />
        <Shell accent={accent} />
      </Float>
      <Rings accent={accent} />
      <Satellite radius={2.9} speed={0.7} accent={accent} offset={0} />
      <Satellite radius={3.3} speed={-0.5} accent="#ffffff" offset={2} />
      <Satellite radius={2.5} speed={0.9} accent={accent} offset={4} />
      <DataField accent={accent} />
      <Sparkles count={80} scale={9} size={2.4} speed={0.3} color={accent} opacity={0.6} />
    </group>
  )
}

export default function CoreScene({ accent = '#22d3ee' }: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={['#03060d']} />
      <fog attach="fog" args={['#03060d', 10, 22]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={2.4} color={accent} />
      <pointLight position={[-6, -4, -4]} intensity={1.4} color="#7c3aed" />
      <Stars radius={60} depth={40} count={2500} factor={3} saturation={0} fade speed={0.6} />
      <Rig accent={accent} />
    </Canvas>
  )
}
