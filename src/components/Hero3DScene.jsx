import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, OrbitControls, Environment, Sphere, Billboard, Text } from '@react-three/drei'

// Orbiting text feature
function OrbitFeature({ text, radius, speed, yOffset }) {
  const ref = useRef()
  // Start at a random angle
  const angle = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    angle.current += delta * speed
    ref.current.position.x = Math.cos(angle.current) * radius
    ref.current.position.z = Math.sin(angle.current) * radius
    ref.current.position.y = yOffset + Math.sin(angle.current * 0.5) * 0.3
  })

  return (
    <group ref={ref}>
      <Billboard follow={true}>
        <mesh position={[-0.1, 0, 0]}>
          <circleGeometry args={[0.06, 16]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={1} />
        </mesh>
        <Text
          position={[0.1, 0, 0]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          fontWeight={700}
          outlineWidth={0.02}
          outlineColor="#000000"
          maxWidth={2}
        >
          {text}
        </Text>
      </Billboard>
    </group>
  )
}

function GlobeWithFeatures() {
  const globeRef = useRef()
  
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.15
      globeRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  // Centered position slightly shifted to right, scaled correctly
  return (
    <group position={[0.5, 0, 0]}> 
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={globeRef}>
          {/* Main wireframe globe */}
          <Sphere args={[1.8, 32, 24]}>
            <meshStandardMaterial 
              color="#3b82f6" 
              wireframe 
              transparent 
              opacity={0.3} 
            />
          </Sphere>
          
          {/* Inner solid globe core slightly smaller */}
          <Sphere args={[1.75, 32, 32]}>
            <meshStandardMaterial 
              color="#09090b" 
              roughness={0.9}
              metalness={0.2}
            />
          </Sphere>

          {/* Latitude/Longitude rings for tech effect */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.015, 16, 64]} />
            <meshBasicMaterial color="#facc15" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[1.8, 0.012, 16, 64]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
          </mesh>
          <mesh rotation={[0, -Math.PI / 4, 0]}>
            <torusGeometry args={[1.8, 0.012, 16, 64]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
          </mesh>
          
          {/* Random surface nodes mapping "cities" or endpoints */}
          <group>
             {[...Array(15)].map((_, i) => {
               // Generate random points on a sphere
               const u = Math.random();
               const v = Math.random();
               const theta = u * 2.0 * Math.PI;
               const phi = Math.acos(2.0 * v - 1.0);
               return (
                 <mesh 
                   key={i} 
                   position={[
                     1.8 * Math.sin(phi) * Math.cos(theta),
                     1.8 * Math.sin(phi) * Math.sin(theta),
                     1.8 * Math.cos(phi)
                   ]}
                 >
                   <sphereGeometry args={[0.04, 8, 8]} />
                   <meshBasicMaterial color={i % 3 === 0 ? "#facc15" : "#3b82f6"} />
                 </mesh>
               )
             })}
          </group>
        </group>

        {/* Orbiting Features (independent of globe spin) */}
        <OrbitFeature text="Performance Marketing" radius={2.8} speed={0.35} yOffset={1.0} />
        <OrbitFeature text="Content Creation" radius={2.6} speed={-0.3} yOffset={-1.0} />
        <OrbitFeature text="Social Media" radius={3.1} speed={0.4} yOffset={0.2} />
        <OrbitFeature text="Branding" radius={2.5} speed={-0.35} yOffset={0.6} />
      </Float>
    </group>
  )
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full pointer-events-none opacity-90">
      <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={2.5} color="#3b82f6" />
        <pointLight position={[10, 0, 5]} intensity={2.5} color="#facc15" />

        {/* Floating dust/sparkles */}
        <Sparkles count={250} scale={18} size={1.5} speed={0.4} opacity={0.5} color="#facc15" />
        <Sparkles count={150} scale={18} size={3} speed={0.3} opacity={0.3} color="#60a5fa" />

        <GlobeWithFeatures />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
