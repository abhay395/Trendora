import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
import '../Navbar.css'
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen)
  const navigate = useNavigate()
  return (
    <nav className="bg-white fixed w-full top-0 z-50 opacity-95 backdrop-blur-md	">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className=" text-xl font-bold md:text-3xl text-black font-extrabold">TRENDORA</Link>
        {/* Desktop Menu */}
        <div className="hidden text-lg font-poppins md:flex md:text-md font-semibold gap-6">
          <Link to="/" className="nav-link text-gray-700">Home</Link>
          <Link to="/about" className="nav-link text-gray-700">About</Link>
          <Link to="/products" className="nav-link text-gray-700">Products</Link>
          <Link to="/contact" className=" nav-link text-gray-700">Contact</Link>
        </div>
        <div className='md:flex md:items-center md:justify-center gap-x-5'>
          <button className='cursor-pointer font-semibold  border-[0.6px] border-black hover:bg-gray-100 px-3 py-1 rounded-2xl' onClick={()=>navigate('/login')}>Login</button>
          <button className='cursor-pointer' onClick={()=>navigate('/cart')}><ShoppingCart /></button>
        </div>
        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none "
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>About</Link>
          <Link to="/products" className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Products</Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Contact</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar