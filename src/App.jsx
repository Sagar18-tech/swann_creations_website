import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import logo from './assets/images/logo.png'
import cleanCodeVideo from './assets/videos/clean_code.mp4'
import devalayaVideo from './assets/videos/devalaya.mp4'
import ServiceCard from './components/ServiceCard'
import ProcessStep from './components/ProcessStep'
import Hero3DScene from './components/Hero3DScene'
import StrengthsCarousel from './components/StrengthsCarousel'
import ContactForm from './components/ContactForm'
import ServicesShowcase from './components/ServicesShowcase'
import ProcessRoadmap from './components/ProcessRoadmap'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const MotionDiv = motion.div
  const MotionArticle = motion.article

  const services = [
    {
      title: 'Performance Marketing',
      description:
        'Data-driven campaigns across search and social channels to acquire high-intent customers efficiently.',
    },
    {
      title: 'Creative Video Production',
      description:
        'High-end commercial films, brand storytelling, and ad shoots designed to visually captivate and convert.',
    },
    {
      title: 'Content Creation',
      description:
        'Creative content systems tailored for ads, websites, and social feeds that keep your brand memorable.',
    },
    {
      title: 'Social Media Management',
      description:
        'Consistent publishing, community engagement, and strategic planning to build awareness and trust.',
    },
    {
      title: 'Branding',
      description:
        'Positioning, messaging, and visual identity designed to make your brand distinct and hard to ignore.',
    },
  ]

  const processSteps = [
    { title: 'Business Understanding', subtitle: 'Goals, vision & positioning', color: 'bg-yellow-400' },
    { title: 'Digital Audit', subtitle: 'Social media, website & ads review', color: 'bg-yellow-300' },
    { title: 'Growth Strategy', subtitle: 'Clear, data-driven action plan', color: 'bg-yellow-400' },
    { title: 'Market Research', subtitle: 'Industry trends & competitors', color: 'bg-blue-100' },
    { title: 'Audience Insights', subtitle: 'Target behavior & needs', color: 'bg-blue-200' },
    { title: 'Performance Analysis', subtitle: 'What’s working & what’s not', color: 'bg-blue-300' },
  ]

  const previousAgencies = ['Renault', 'Royal Orchid Hotels', 'The Fern']

  return (
    <div className="bg-white text-zinc-900 overflow-x-hidden w-full relative">
      <StrengthsCarousel />
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/95 backdrop-blur-xl transition-all">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <a href="#" className="flex items-center gap-2 relative z-50">
            <img src={logo} alt="Swan Creations" className="h-14 md:h-16 lg:h-20 w-auto rounded object-contain transition-transform hover:scale-105 duration-300" />
          </a>
          
          <ul className="hidden items-center gap-8 text-base font-bold md:flex text-zinc-800">
            <li><a href="#services" className="transition hover:text-yellow-500 hover:-translate-y-0.5 block transform">Services</a></li>
            <li><a href="#process" className="transition hover:text-yellow-500 hover:-translate-y-0.5 block transform">Process</a></li>
            <li><a href="#work" className="transition hover:text-yellow-500 hover:-translate-y-0.5 block transform">Work</a></li>
            <li><a href="#contact" className="transition text-zinc-900 bg-yellow-400 px-6 py-2.5 rounded-full hover:bg-yellow-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transform hover:-translate-y-0.5">Contact Us</a></li>
          </ul>

          <button 
            className="md:hidden relative z-50 p-2 text-zinc-900 hover:text-yellow-500 transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center pt-20 pointer-events-auto"
            >
              <ul className="flex flex-col items-center gap-8 text-3xl font-black text-zinc-900">
                <li><a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors">Services</a></li>
                <li><a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors">Process</a></li>
                <li><a href="#work" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors">Work</a></li>
                <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="rounded-full bg-yellow-400 px-8 py-3 text-2xl hover:bg-yellow-300 transition-colors text-zinc-900 shadow-lg">Contact Us</a></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-16 md:pt-24 pb-16">
          {/* Background 3D Scene */}
          <div className="absolute inset-0 z-0">
             <Hero3DScene />
          </div>
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent pointer-events-none" />

          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center md:px-8">
            <MotionDiv
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="relative z-10"
            >
              <MotionDiv variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <p className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs md:text-sm font-semibold uppercase tracking-wide text-yellow-300 shadow-sm backdrop-blur-sm">
                  Creative Digital Agency
                </p>
              </MotionDiv>
              
              <MotionDiv variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.1] tracking-tighter text-white drop-shadow-sm">
                  Who We <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Are?</span>
                </h1>
              </MotionDiv>
              
              <MotionDiv variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-zinc-300 font-medium drop-shadow-sm">
                  We are a creative digital agency that blends content, strategy, and performance marketing to help brands stand out and scale. From ad shoots to campaigns.
                </p>
              </MotionDiv>
              
              <MotionDiv variants={{ hidden: { opacity: 0, filter: "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)" } }} transition={{ duration: 0.8 }}>
                <p className="mt-8 sm:mt-10 text-lg sm:text-xl md:text-3xl lg:text-3xl font-black italic tracking-tight text-white border-l-4 border-yellow-400 pl-4 sm:pl-6 drop-shadow-sm">
                  We make your brand <span className="text-yellow-400 relative inline-block">impossible to ignore.<div className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-400/20 -z-10 -rotate-1 rounded-full"></div></span>
                </p>
              </MotionDiv>
              
              <MotionDiv variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="#contact"
                  className="relative overflow-hidden group rounded-xl bg-yellow-400 px-8 py-4 text-sm font-bold text-zinc-900 transition-all hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:-translate-y-1 text-center"
                >
                  <span className="relative z-10">Book a Growth Call</span>
                  <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
                </a>
                <a
                  href="#work"
                  className="rounded-xl border-2 border-white/20 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition-all hover:border-white hover:bg-white hover:text-zinc-900 hover:-translate-y-1 hover:shadow-lg text-center"
                >
                  View Portfolio
                </a>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="relative w-full flex flex-col justify-end xl:mt-32"
            >
              <div className="rounded-3xl border border-white/10 bg-zinc-950/40 p-6 md:p-8 backdrop-blur-md shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300">
                  Growth Snapshot
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/5 p-4 border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-3xl font-black text-yellow-300">5x</p>
                    <p className="mt-2 text-sm text-zinc-300">Average lead growth from optimized funnels</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4 border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-3xl font-black text-yellow-300">120+</p>
                    <p className="mt-2 text-sm text-zinc-300">Campaign creatives launched per quarter</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4 sm:col-span-2 border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-lg font-semibold text-zinc-100">Built for ambitious brands in hospitality, retail, and tech.</p>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </section>

        <ServicesShowcase services={services} />
        <ProcessRoadmap steps={processSteps} />

        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <MotionDiv
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-600">Portfolio</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Work that drives impact.
            </h2>
          </MotionDiv>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: 'Devalaya', video: devalayaVideo },
              { name: 'Cleancode', video: cleanCodeVideo }
            ].map((project) => (
              <MotionArticle
                key={project.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                    Case Study
                  </span>
                </div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 group">
                  <video
                    src={project.video}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </MotionArticle>
            ))}
          </div>
        </section>

        <section className="border-y border-zinc-200 bg-zinc-950 py-8 text-white">
          <div className="mx-auto w-full max-w-6xl overflow-hidden px-6 md:px-8">
            <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wide text-zinc-300">
              Previous Agency Experience
            </p>
            <div className="marquee whitespace-nowrap">
              {[...previousAgencies, ...previousAgencies].map((brand, index) => (
                <span key={`${brand}-${index}`} className="mx-8 inline-flex text-2xl font-semibold tracking-wide text-yellow-300">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section id="contact" className="relative overflow-hidden bg-zinc-950 py-20 px-6 md:px-8 z-10 block">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-yellow-400/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
        
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <MotionDiv
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-yellow-400">Get in Touch</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl mb-6">
                  Ready to make your brand <span className="text-yellow-400">impossible to ignore?</span>
                </h2>
                <p className="text-lg text-zinc-300 max-w-md">
                  Drop us a message and our team will get back to you with a tailored growth plan that scales your business.
                </p>
              </MotionDiv>
            </div>
            <div className="relative z-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-12 md:px-8 border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-zinc-900">Swan Creations</h3>
            <p className="mt-2 text-zinc-600">Belagavi, Karnataka</p>
          </div>
          <div className="space-y-2 text-sm text-zinc-700">
            <p>
              Email:{' '}
              <a className="font-medium text-zinc-900 hover:text-yellow-600" href="mailto:bmbrandworks@gmail.com">
                bmbrandworks@gmail.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a className="font-medium text-zinc-900 hover:text-yellow-600" href="tel:+918880701526">
                +91 8880701526
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
