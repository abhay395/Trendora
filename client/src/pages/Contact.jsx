import React from 'react'
import logo from '../assets/logo1.png'
import { motion } from 'framer-motion'
function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Logo & Info (desktop only) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
          <img src={logo} alt="Trendora Logo" className="w-50 h-50 object-contain scale-200" />
          <h2 className="text-2xl font-bold text-black mb-2">Get in Touch</h2>
          <p className="text-gray-500 mb-4 text-center">We're here to help and answer any question you might have.</p>
          <div className="text-gray-600 text-sm space-y-2">
            <div>Email: <a href="mailto:support@trendora.com" className="text-black font-medium hover:underline">support@trendora.com</a></div>
            <div>Phone: <a href="tel:+1234567890" className="text-black font-medium hover:underline">+1 234 567 890</a></div>
            <div className="pt-4 text-xs text-gray-400">Trendora &copy; {new Date().getFullYear()}</div>
          </div>
        </div>
        {/* Right: Contact Form */}
        <div className="flex flex-col justify-center p-8">
          <h1 className="text-3xl font-bold text-black mb-2 text-center md:text-left">Contact Us</h1>
          <p className="text-gray-500 mb-8 text-center md:text-left">We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-gray-900" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-gray-900" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-gray-900 resize-none" placeholder="How can we help you?" />
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition">Send Message</button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact