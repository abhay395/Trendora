
import React from 'react'
import { motion } from 'framer-motion'

function Contact() {
  const [formData, setFormData] = React.useState({
    cleint_name: '',
    email: '',
    post: '',
    linkedin_post_url: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white flex items-center justify-center px-4 py-24 font-outfit"
    >
      <div className="w-full max-w-4xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* Left — Info Panel */}
        <div className="hidden md:flex flex-col justify-between bg-black p-10">
          <span className="text-xl font-black tracking-tighter text-white">TRENDORA.</span>

          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-tight mb-4">
              Get in<br />Touch.
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
              We're here to help.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Email</p>
              <a href="mailto:support@trendora.com" className="text-[11px] font-bold text-white hover:underline underline-offset-4 transition-all">
                support@trendora.com
              </a>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-1">Phone</p>
              <a href="tel:+1234567890" className="text-[11px] font-bold text-white hover:underline underline-offset-4 transition-all">
                +1 234 567 890
              </a>
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-700 pt-4">
              © {new Date().getFullYear()} Trendora
            </p>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col justify-center p-10 bg-white">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-black tracking-tighter uppercase mb-2">Contact Us</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Fill out the form and we'll get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={(e) => setFormData({ ...formData, cleint_name: e.target.value })}
                value={formData.cleint_name}
                className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold tracking-wide focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 placeholder:font-normal placeholder:tracking-normal"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
                className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold tracking-wide focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 placeholder:font-normal placeholder:tracking-normal"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Your message here..."
                onChange={(e) => setFormData({ ...formData, post: e.target.value })}
                value={formData.post}
                className="w-full bg-white border border-gray-200 px-4 py-3.5 text-xs font-bold tracking-wide focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300 placeholder:font-normal placeholder:tracking-normal"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </motion.div>
  )
}

export default Contact