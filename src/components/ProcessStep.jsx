import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function ProcessStep({ number, title, subtitle, color, isLast = false }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: number * 0.1 }} 
      className="relative flex items-start gap-6 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)} // support touch devices playfully
    >
      {/* Timeline solid line */}
      {!isLast && (
        <div className="absolute left-[27px] md:left-[39px] top-[60px] md:top-[80px] bottom-[-20px] md:bottom-[-30px] w-[2px] bg-zinc-200 transition-colors duration-500 group-hover:bg-yellow-400 group-hover:w-[4px] group-hover:left-[26px] md:group-hover:left-[38px]" />
      )}
      
      {/* Animated Node */}
      <motion.div 
        animate={{ scale: isHovered ? 1.1 : 1 }}
        className={`relative z-10 flex h-14 w-14 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-md transition-colors duration-300 ${isHovered ? 'bg-yellow-400' : 'bg-zinc-100'}`}
      >
         <span className={`text-xl md:text-2xl font-black transition-colors duration-300 ${isHovered ? 'text-zinc-900' : 'text-zinc-400'}`}>0{number}</span>
         {isHovered && (
           <motion.div 
             className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-60 z-[-1]"
           />
         )}
      </motion.div>

      {/* Content */}
      <div className="pt-6 pb-12">
        <motion.div 
          animate={{ x: isHovered ? 10 : 0 }}
          className="flex flex-col"
        >
          <h3 className={`text-2xl md:text-3xl font-black transition-colors duration-300 ${isHovered ? 'text-zinc-900' : 'text-zinc-400'}`}>
            {title}
          </h3>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="inline-flex rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-sm md:text-base font-semibold text-zinc-600 shadow-xl max-w-lg">
                  {subtitle}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProcessStep
