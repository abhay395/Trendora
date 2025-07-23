import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings, FiLogOut } from 'react-icons/fi';
// import { FaGift } from 'react-icons/bs';
import { FaBoxOpen, FaUserCircle } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import '../Navbar.css'
import useCartStore from '../store/cartStore';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdown(!isDropdown);
  const navigate = useNavigate()
  const location = useLocation()
  const { totalProduct } = useCartStore()
  useEffect(() => {
    if (!isDropdown) {
      setIsDropdown(!isDropdown)
    }
  }, [location])
  return (
    <nav className="bg-white border-b border-gray-300 fixed w-full top-0 font-poppins z-50 opacity-95 backdrop-blur-md ">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-center md:justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold font-poppins md:text-3xl text-black font-extrabold">TRENDORA</Link>
        {/* Desktop Menu */}
        <div className="hidden text-lg md:flex md:text-md font-semibold gap-6">
          <Link to="/" className="nav-link text-gray-700">Home</Link>
          <Link to="/products" className="nav-link text-gray-700">Products</Link>
          <Link to="/contact" className=" nav-link text-gray-700">Contact</Link>
        </div>
        <div className='md:flex md:items-center md:justify-center gap-x-5 absolute left-4 md:static'>
          {localStorage.getItem('token') ? (
            <div className="relative lg:inline-block text-left">
              <div onClick={toggleDropdown}>
                <CgProfile className='text-2xl text-gray-800 cursor-pointer' />
              </div>
              {/* Dropdown Items */}
              <div
                className={`absolute ${isDropdown ? 'hidden' : ''} md:right-[10px]  z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                tabIndex={-1}
              >
                <div role="none" className='text-md font-semibold'>
                  <Link
                    to="/"
                    className="flex items-center gap-x-3 px-8 py-2 hover:bg-gray-100 transition duration-300 ease-in-out text-gray-700"
                    role="menuitem"
                  >
                    <FaUserCircle className="text-gray-600" /> Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-x-3 px-7 py-2 hover:bg-gray-100 transition duration-300 ease-in-out text-gray-700"
                    role="menuitem"
                  >
                    <FaBoxOpen className="text-gray-600" /> Orders
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-x-3 px-7 py-2 hover:bg-gray-100 transition duration-300 ease-in-out text-gray-700"
                    role="menuitem"
                  >
                    <FiSettings className="text-gray-600" /> Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center gap-x-3 px-7 py-2 hover:bg-gray-100 transition duration-300 ease-in-out text-gray-700"
                    role="menuitem"
                  >
                    <FiLogOut className="text-gray-600" /> Logout
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <button
              className='cursor-pointer font-semibold border-[0.6px] border-black hover:bg-gray-100 px-3 py-1 rounded-2xl'
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}

          {/* Cart Button */}
          <div className='relative p-3'>
            <button className='cursor-pointer hidden lg:block' onClick={() => navigate('/cart')}>
              <FaCartShopping className='text-2xl text-gray-800' />
             { totalProduct>0?<span className='absolute rounded-full h-5 w-5 top-0 text-sm right-0 bg-gray-700 text-white'>{totalProduct}</span>:null}
            </button>
          </div>
        </div>
        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700 absolute right-4 cursor-pointer focus:outline-none "
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Home</Link>
          <Link to="/products" className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Products</Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600" onClick={toggleMenu}>Contact</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar