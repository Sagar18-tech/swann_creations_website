import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial, Sphere, OrbitControls, Environment } from '@react-three/drei'

// Floating orbit label: small pill with a service name
function OrbitLabel({ text, radius, speed, yOffset, size = 0.14 }) {
  const ref = useRef()
  const angle = useRef(Math.random() * Math.PI * 2)
  useFrame((_, delta) => {
    angle.current += delta * speed
    ref.current.position.x = Math.cos(angle.current) * radius
    ref.current.position.z = Math.sin(angle.current) * radius
    ref.current.position.y = yOffset + Math.sin(angle.current * 0.7) * 0.15
    ref.current.rotation.y = -angle.current
  })
  return (
    <group ref={ref}>
      {/* Pill background */}
      <mesh>
        <capsuleGeometry args={[0.28, 0.6, 4, 8]} />
        <meshStandardMaterial color="#facc15" metalness={0.3} roughness={0.3} />
      </mesh>
      <Text
        position={[0, 0, 0.3]}
        fontSize={size}
        color="#18181b"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
      >
        {text}
      </Text>
    </group>
  )
}

// Central glowing brand sphere
function BrandCore() {
  const sphereRef = useRef()
  useFrame(({ clock }) => {
    sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3
    sphereRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
  })
  return (
    <group ref={sphereRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere args={[1, 64, 64]} scale={1.1}>
          <MeshDistortMaterial
            color="#facc15"
            attach="material"
            distort={0.3}
            speed={2.5}
            roughness={0.05}
            metalness={0.9}
          />
        </Sphere>
        {/* Center brand text on the sphere */}
        <Text
          position={[0, 0, 1.2]}
          fontSize={0.18}
          color="#18181b"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
          letterSpacing={-0.05}
        >
          SWAN CREATIONS
        </Text>
        <Text
          position={[0, -0.28, 1.2]}
          fontSize={0.1}
          color="#3f3f46"
          anchorX="center"
          anchorY="middle"
        >
          Digital Agency
        </Text>
      </Float>
    </group>
  )
}

// Floating stat bubble
function StatBubble({ value, label, position }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.9 + position[0]) * 0.12
  })
  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.9, 0.5, 0.08]} />
        <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.2} />
      </mesh>
      <Text
        position={[0, 0.07, 0.06]}
        fontSize={0.18}
        color="#facc15"
        anchorX="center"
        anchorY="middle"
        fontWeight={800}
      >
        {value}
      </Text>
      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.075}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 10, 5]} intensity={1.8} />
        <pointLight position={[-6, -6, -6]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[6, 4, 2]} intensity={0.8} color="#facc15" />

        {/* Core brand sphere */}
        <BrandCore />

        {/* Orbiting service labels */}
        <OrbitLabel text="Performance Marketing" radius={2.2} speed={0.35} yOffset={0.3} />
        <OrbitLabel text="Content Creation" radius={2.0} speed={-0.28} yOffset={-0.4} />
        <OrbitLabel text="Social Media" radius={2.4} speed={0.22} yOffset={0.0} />
        <OrbitLabel text="Branding & Identity" radius={1.9} speed={-0.4} yOffset={0.7} />

        {/* Floating stat boxes */}
        <StatBubble value="5x" label="Lead Growth" position={[-2.2, 1.2, 0.5]} />
        <StatBubble value="120+" label="Creatives / Qtr" position={[2.0, -1.0, 0.3]} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
