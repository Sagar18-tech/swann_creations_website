import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function ServiceCard({ title, description, delay = 0 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d"
        }}
        className="group relative flex flex-col items-center justify-center aspect-square bg-yellow-400 p-8 text-center shadow-lg transition-colors duration-300 hover:shadow-2xl hover:z-10"
      >
        {/* Floating decorative border */}
        <div 
          style={{ transform: "translateZ(30px)" }} 
          className="absolute inset-4 border-b-2 border-r-2 border-zinc-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
        />
        <div 
          style={{ transform: "translateZ(15px)" }} 
          className="absolute inset-4 border-t-2 border-l-2 border-zinc-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
        />
        
        <div style={{ transform: "translateZ(50px)" }} className="z-10 pointer-events-none">
          <h3 className="text-xl font-black uppercase leading-tight text-zinc-900 md:text-2xl drop-shadow-md">{title}</h3>
          <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-800 opacity-0 transition-all duration-300 group-hover:opacity-100 drop-shadow-sm">
            {description}
          </p>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="absolute bottom-6 right-6 h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center text-yellow-400 transition-transform duration-300 group-hover:scale-110 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default ServiceCard
