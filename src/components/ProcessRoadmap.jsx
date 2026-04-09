import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Text, Line, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── 3D Pipeline - single node  ─────────────────────────────────────────────── */
function PipelineNode({ position, label, index, isActive, onHover, onLeave }) {
  const meshRef = useRef()
  const ringRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    // Gentle bobbing
    meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.9 + index) * 0.12
    // Active ring pulse
    if (ringRef.current) {
      const s = isActive ? 1 + Math.sin(clock.getElapsedTime() * 3) * 0.08 : 1
      ringRef.current.scale.setScalar(s)
    }
  })

  const color = isActive ? '#facc15' : '#3f3f46'
  const emissive = isActive ? '#b45309' : '#000000'

  return (
    <group position={position}>
      {/* Outer glow ring when active */}
      {isActive && (
        <mesh ref={ringRef}>
          <torusGeometry args={[0.38, 0.04, 8, 32]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Core sphere */}
      <Sphere
        ref={meshRef}
        args={[0.25, 32, 32]}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; onHover(index) }}
        onPointerOut={(e)  => { e.stopPropagation(); document.body.style.cursor = 'default'; onLeave() }}
      >
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={isActive ? 0.5 : 0}
          metalness={0.7}
          roughness={0.2}
        />
      </Sphere>

      {/* Step number */}
      <Text
        position={[0, -0.46, 0]}
        fontSize={0.16}
        color={isActive ? '#facc15' : '#71717a'}
        anchorX="center"
        anchorY="top"
        fontWeight={700}
      >
        {String(index + 1).padStart(2, '0')}
      </Text>
    </group>
  )
}

/* ─── Connector line between nodes ───────────────────────────────────────────── */
function ConnectorLine({ from, to, lit }) {
  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)]
  return (
    <Line
      points={points}
      color={lit ? '#facc15' : '#3f3f46'}
      lineWidth={lit ? 2.5 : 1.5}
      dashed={!lit}
      dashSize={0.15}
      gapSize={0.1}
    />
  )
}

/* ─── Full 3D scene ─────────────────────────────────────────────────────────── */
function PipelineScene({ steps, activeStep, setActiveStep }) {
  // Lay nodes along a gentle S-curve in X, evenly spaced
  const n = steps.length
  const NODE_POSITIONS = steps.map((_, i) => {
    const t   = n > 1 ? i / (n - 1) : 0      // 0…1
    const x   = (t - 0.5) * (n - 1) * 1.3   // spread horizontally
    const y   = Math.sin(t * Math.PI) * 0.5  // gentle arc Y
    const z   = 0
    return [x, y, z]
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} />
      <pointLight position={[-5, 3, 3]} intensity={0.9} color="#3b82f6" />

      {/* Connector lines */}
      {NODE_POSITIONS.slice(0, -1).map((pos, i) => (
        <ConnectorLine
          key={i}
          from={pos}
          to={NODE_POSITIONS[i + 1]}
          lit={activeStep !== null && (i < activeStep || activeStep === steps.length - 1)}
        />
      ))}

      {/* Nodes */}
      {NODE_POSITIONS.map((pos, i) => (
        <PipelineNode
          key={i}
          position={pos}
          label={steps[i].title}
          index={i}
          isActive={activeStep === i}
          onHover={setActiveStep}
          onLeave={() => setActiveStep(null)}
        />
      ))}
    </>
  )
}

/* ─── Main export ──────────────────────────────────────────────────────────── */
export default function ProcessRoadmap({ steps }) {
  const [activeStep, setActiveStep] = useState(null)
  const active = activeStep !== null ? steps[activeStep] : null

  return (
    <section id="process" className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">

        {/* Heading */}
        <div className="mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-600">How We Work</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-900 md:text-5xl">
            We don't guess. We analyze,<br className="hidden md:block" /> understand, and build.
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-zinc-500">
            Hover over a node in the pipeline below to explore each step of our proven process.
          </p>
        </div>

        {/* ── 3D Pipeline canvas ── */}
        <div className="relative h-48 md:h-64 w-full mt-10 rounded-2xl bg-zinc-950 overflow-hidden border border-zinc-800">
          <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 2]}>
            <PipelineScene steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
          </Canvas>

          {/* Tooltip overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {!active && (
              <span className="text-xs text-zinc-600 select-none">Hover a node to explore</span>
            )}
          </div>
        </div>

        {/* ── Active step detail pill ── */}
        <div className="mt-5 h-16 flex items-center justify-center">
          {active ? (
            <div className="inline-flex items-center gap-4 rounded-2xl border border-yellow-200 bg-yellow-50 px-6 py-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-zinc-900">
                {String(activeStep + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-sm font-black text-zinc-900">{active.title}</p>
                <p className="text-xs text-zinc-500">{active.subtitle}</p>
              </div>
            </div>
          ) : (
            <div className="h-16" />
          )}
        </div>

        {/* ── Clean step grid ── */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
              className={`group relative rounded-2xl border p-6 transition-all duration-300 cursor-default
                ${activeStep === i
                  ? 'border-yellow-400 bg-yellow-50 shadow-lg shadow-yellow-100'
                  : 'border-zinc-100 bg-zinc-50 hover:border-yellow-200 hover:bg-yellow-50/50'}
              `}
            >
              {/* Step number badge */}
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-black transition-colors duration-300
                ${activeStep === i ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-200 text-zinc-500 group-hover:bg-yellow-200 group-hover:text-zinc-800'}
              `}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className={`mt-4 text-base font-black transition-colors duration-300
                ${activeStep === i ? 'text-zinc-900' : 'text-zinc-700'}
              `}>
                {step.title}
              </h3>

              <p className={`mt-1 text-sm transition-colors duration-300
                ${activeStep === i ? 'text-zinc-600' : 'text-zinc-400'}
              `}>
                {step.subtitle}
              </p>

              {/* Active indicator */}
              <div className={`absolute top-6 right-6 h-2 w-2 rounded-full transition-colors duration-300
                ${activeStep === i ? 'bg-yellow-400' : 'bg-transparent'}
              `} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
