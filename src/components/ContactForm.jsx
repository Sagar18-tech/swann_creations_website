import { motion } from 'framer-motion'

export default function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
    >
      <h3 className="text-2xl font-bold tracking-tight text-white mb-6 text-center">Get in Touch</h3>
      <form className="space-y-5 flex flex-col items-center">
        <div className="w-full">
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-300 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
          />
        </div>
        <div className="w-full">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-300 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
          />
        </div>
        <div className="w-full col-span-2">
            <label htmlFor="service" className="sr-only">Service interested in</label>
            <select
                id="service"
                name="service"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-300 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition appearance-none"
                defaultValue=""
            >
                <option value="" disabled className="text-zinc-500 bg-zinc-900">Select a service</option>
                <option value="performance" className="text-white bg-zinc-900">Performance Marketing</option>
                <option value="seo" className="text-white bg-zinc-900">GBP Optimization & SEO</option>
                <option value="content" className="text-white bg-zinc-900">Content Creation</option>
                <option value="social" className="text-white bg-zinc-900">Social Media Management</option>
                <option value="branding" className="text-white bg-zinc-900">Branding & Identity</option>
                <option value="other" className="text-white bg-zinc-900">Other</option>
            </select>
        </div>
        <div className="w-full">
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="How can we help you?"
            required
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-300 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-yellow-400 px-6 py-3 font-bold text-zinc-900 transition hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  )
}
