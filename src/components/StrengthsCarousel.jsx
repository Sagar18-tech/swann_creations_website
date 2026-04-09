import { motion } from 'framer-motion'

const strengths = [
  'Performance Marketing',
  'Lead Generation',
  'High-Intent Scaling',
  'Strategic Content',
  'Growth Audits',
  'Market Insights',
  'Conversion Focus',
  'Distinct Branding',
  'Social Strategy',
  'Digital Transformation',
]

function StrengthsCarousel() {
  // Triple the list to ensure smooth infinite loop
  const duplicatedStrengths = [...strengths, ...strengths, ...strengths]

  return (
    <div className="relative w-full overflow-hidden bg-yellow-400 py-3 select-none">
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-yellow-400 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-yellow-400 to-transparent" />
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1035], // Approximate width of one set of items
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedStrengths.map((strength, index) => (
          <div
            key={index}
            className="mx-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 md:mx-8 md:text-base"
          >
            <span className="h-2 w-2 rounded-full bg-zinc-900" />
            {strength}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default StrengthsCarousel
