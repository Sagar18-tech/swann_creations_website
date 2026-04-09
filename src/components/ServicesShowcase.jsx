import { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text, Environment, Float } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const CARD_W = 1.6
const CARD_H = 2.7
const PHONE_DEPTH = 0.12
const BEZEL = 0.12

const METRICS = ['5x',  '#1',    '120+',    '3x',   '100%']
const METRIC_LABELS = ['Lead Growth', 'Local Rank', 'Creatives/Qtr', 'Engagement', 'Brand Clarity']

/* ─── Single 3-D Phone Frame ────────────────────────────────────────────────── */
function PhoneCard({ service, index, total, activeIndex, onSelect }) {
  const groupRef = useRef()

  // Fan layout: calculate per-frame target transform
  const offset     = index - activeIndex
  const maxOffset  = (total - 1) / 2
  const normOffset = offset / Math.max(1, maxOffset)     // -1 … +1
  const angle      = normOffset * (Math.PI / 3.5)        // max ±51 °
  const depth      = -Math.abs(offset) * 1.0             // recede by depth
  const tx         = normOffset * 3.4                    // horizontal spread
  const isActive   = index === activeIndex
  const tScale     = isActive ? 1.0 : 0.78

  useFrame(() => {
    if (!groupRef.current) return
    const g = groupRef.current
    g.position.x   = THREE.MathUtils.lerp(g.position.x, tx,     0.08)
    g.position.z   = THREE.MathUtils.lerp(g.position.z, depth,  0.08)
    g.rotation.y   = THREE.MathUtils.lerp(g.rotation.y, angle,  0.08)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, tScale, 0.08))
  })

  const frameColor  = isActive ? '#facc15' : '#27272a'
  const screenColor = '#09090b'
  const textColor   = isActive ? '#18181b' : '#a1a1aa'
  const accentColor = isActive ? '#18181b' : '#facc15'

  return (
    <group
      ref={groupRef}
      onClick={() => onSelect(index)}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut ={() => (document.body.style.cursor = 'default')}
    >
      {/* Outer frame / bezel */}
      <RoundedBox args={[CARD_W + BEZEL, CARD_H + BEZEL, PHONE_DEPTH]} radius={0.18} smoothness={6}>
        <meshStandardMaterial color={frameColor} metalness={0.85} roughness={0.15} />
      </RoundedBox>

      {/* Screen face */}
      <RoundedBox args={[CARD_W, CARD_H, PHONE_DEPTH * 0.6]} radius={0.1} smoothness={4}
        position={[0, 0, PHONE_DEPTH * 0.3]}>
        <meshStandardMaterial color={screenColor} metalness={0.2} roughness={0.6} />
      </RoundedBox>

      {/* Notch */}
      <mesh position={[0, CARD_H / 2 - 0.11, PHONE_DEPTH * 1.0]}>
        <capsuleGeometry args={[0.06, 0.25, 4, 8]} />
        <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Home button indicator line (Android-style) */}
      <mesh position={[0, -CARD_H / 2 + 0.12, PHONE_DEPTH * 1.0]}>
        <boxGeometry args={[0.3, 0.025, 0.01]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>

      {/* ── Screen content ── */}
      {/* Large sequence number */}
      <Text
        position={[CARD_W / 2 - 0.22, CARD_H / 2 - 0.28, PHONE_DEPTH * 1.1]}
        fontSize={0.28}
        color={accentColor}
        anchorX="right"
        anchorY="top"
        fontWeight={900}
        letterSpacing={-0.02}
      >
        {String(index + 1).padStart(2, '0')}
      </Text>

      {/* Service label */}
      <Text
        position={[-CARD_W / 2 + 0.14, 0.38, PHONE_DEPTH * 1.1]}
        fontSize={0.15}
        color={isActive ? '#facc15' : '#52525b'}
        anchorX="left"
        anchorY="middle"
        maxWidth={CARD_W - 0.28}
        fontWeight={700}
      >
        {service.title}
      </Text>

      {/* Divider line */}
      <mesh position={[0, 0.18, PHONE_DEPTH * 1.0]}>
        <boxGeometry args={[CARD_W - 0.28, 0.012, 0.01]} />
        <meshStandardMaterial color={isActive ? '#facc15' : '#3f3f46'} />
      </mesh>

      {/* Metric value */}
      <Text
        position={[0, -0.06, PHONE_DEPTH * 1.1]}
        fontSize={0.42}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
        fontWeight={900}
      >
        {METRICS[index]}
      </Text>

      {/* Metric sub-label */}
      <Text
        position={[0, -0.44, PHONE_DEPTH * 1.1]}
        fontSize={0.09}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {METRIC_LABELS[index]}
      </Text>
    </group>
  )
}

/* ─── The 3-D Scene ──────────────────────────────────────────────────────────── */
function Scene({ services, activeIndex, onSelect }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 6]} intensity={2.2} castShadow />
      <pointLight position={[-8, -4, 4]} intensity={0.9} color="#3b82f6" />
      <pointLight position={[ 8,  4, 4]} intensity={0.6} color="#facc15" />

      {services.map((svc, i) => (
        <PhoneCard
          key={svc.title}
          service={svc}
          index={i}
          total={services.length}
          activeIndex={activeIndex}
          onSelect={onSelect}
        />
      ))}

      <Environment preset="city" />
    </>
  )
}

/* ─── Main export ─────────────────────────────────────────────────────────────── */
export default function ServicesShowcase({ services }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = useCallback(() => setActiveIndex(i => Math.max(0,              i - 1)), [])
  const next = useCallback(() => setActiveIndex(i => Math.min(services.length - 1, i + 1)), [services.length])

  const active = services[activeIndex]

  return (
    <section id="services" className="bg-zinc-950 py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-4 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">Our Services</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
            Full-funnel digital execution.
          </h2>
        </motion.div>

        {/* ── 3-D Canvas ── */}
        <div className="relative h-[420px] md:h-[500px] w-full mt-8 cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
            <Scene services={services} activeIndex={activeIndex} onSelect={setActiveIndex} />
          </Canvas>
          
          {/* Click hint */}
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-zinc-500 pointer-events-none select-none">
            Click a screen to select
          </p>
        </div>

        {/* ── Service Detail Card (below) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 flex flex-col md:flex-row items-start gap-8"
          >
            <div className="flex-1">
              <span className="inline-block rounded-full bg-yellow-400 px-4 py-1 text-xs font-black uppercase tracking-widest text-zinc-900">
                Service {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-black text-white">{active.title}</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed max-w-lg">{active.description}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-zinc-900 hover:bg-yellow-300 hover:-translate-y-0.5 transition-all"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-10 py-6 text-center shrink-0">
              <span className="text-5xl font-black text-yellow-400">{METRICS[activeIndex]}</span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">{METRIC_LABELS[activeIndex]}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Prev / Next nav ── */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-yellow-400' : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={activeIndex === services.length - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
