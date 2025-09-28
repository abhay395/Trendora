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
import useUserStore from '../store/userStore';

const BASEURL = import.meta.env.VITE_API_URL;
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdown(!isDropdown);
  const navigate = useNavigate()
  const location = useLocation()
  const { totalProduct } = useCartStore()
  const { user } = useUserStore()
  // Sync searchTerm with URL query param
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSearch = searchParams.get('search') || '';
    setSearchTerm(urlSearch);
  }, [location.search]);

  const handleSearch = () => {
    // Add your search functionality here
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
  }
  const enterHandler = (e) => {
    if (e.key == "Enter") {
      handleSearch()
    }
  }
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdown && !event.target.closest('.dropdown-container')) {
        setIsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdown]);
  useEffect(() => {
    if (user) console.log(user)
  }, [user])
  return (
    <div className=''>
      <nav className="bg-white border-b pb-2 border-gray-200 fixed w-full top-0 font-poppins z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-black hover:text-gray-700 transition-colors duration-200">
              <span className="font-extrabold tracking-wide">
                TRENDORA
              </span>
            </Link>

            {/* Desktop Menu + Search */}
            <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              <Link
                to="/"
                className={`text-black hover:text-gray-600 transition-colors duration-200 font-semibold ${location.pathname === '/' ? 'text-gray-800 border-b-2 border-black' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-black hover:text-gray-600 transition-colors duration-200 font-semibold ${location.pathname === '/products' ? 'text-gray-800 border-b-2 border-black' : ''}`}
              >
                Products
              </Link>
              <Link
                to="/contact"
                className={`text-black hover:text-gray-600 transition-colors duration-200 font-semibold ${location.pathname === '/contact' ? 'text-gray-800 border-b-2 border-black' : ''}`}
              >
                Contact
              </Link>
              {/* New Search Input for desktop */}
              <div className="ml-8 w-80 max-w-xs">
                <div className="flex items-center bg-white rounded-2xl  py-2 px-3 border border-gray-100">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={enterHandler}
                    // onDragEnter={()=>handleSearch()}
                    className="flex-1 border-0 focus:ring-0 outline-none text-gray-800 placeholder-gray-400 text-base bg-transparent"
                    placeholder="Search for products..."
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-black hover:bg-gray-900 cursor-pointer transition-colors duration-200 text-white p-2 rounded-xl flex items-center justify-center ml-2"
                    aria-label="Search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Auth & Cart */}
            <div className="flex items-center space-x-4">
              {/* User Profile / Login */}
              {user ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    {user && user.image ? <img loading='lazy' src={`${BASEURL}/user/avatar?url=${encodeURIComponent(user.image)}`} alt="Profile" className="w-8 h-8 rounded-full" /> : <CgProfile className="text-2xl text-black" />}
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-black hover:bg-gray-100 transition-colors duration-200 font-medium"
                        onClick={() => setIsDropdown(false)}
                      >
                        <FaUserCircle className="text-gray-600" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-3 px-4 py-3 text-black hover:bg-gray-100 transition-colors duration-200 font-medium"
                        onClick={() => setIsDropdown(false)}
                      >
                        <FaBoxOpen className="text-gray-600" />
                        <span>Orders</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 text-black hover:bg-gray-100 transition-colors duration-200 font-medium"
                        onClick={() => setIsDropdown(false)}
                      >
                        <FiSettings className="text-gray-600" />
                        <span>Settings</span>
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <Link
                        to="/logout"
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
                        onClick={() => setIsDropdown(false)}
                      >
                        <FiLogOut className="text-red-500" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="px-4 py-2 text-black font-semibold border border-black rounded-lg hover:bg-black hover:text-white transition-all duration-200"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              )}

              {/* Cart Button */}
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate('/cart')}
              >
                <FaCartShopping className="text-2xl text-black" />
                {totalProduct > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalProduct}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleMenu}
              >
                {isOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-lg text-black hover:bg-gray-100 transition-colors duration-200 font-semibold ${location.pathname === '/' ? 'bg-gray-100 text-black' : ''}`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`block px-3 py-2 rounded-lg text-black hover:bg-gray-100 transition-colors duration-200 font-semibold ${location.pathname === '/products' ? 'bg-gray-100 text-black' : ''}`}
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-lg text-black hover:bg-gray-100 transition-colors duration-200 font-semibold ${location.pathname === '/contact' ? 'bg-gray-100 text-black' : ''}`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              {/* New Search Input for mobile */}
              <div className="mt-4">
                <div className="flex items-center bg-white rounded-2xl py-2 px-3 border border-gray-100">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-1 border-0 focus:ring-0 outline-none text-gray-800 placeholder-gray-400 text-base bg-transparent"
                    placeholder="Search for products..."
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-black hover:bg-gray-900 transition-colors duration-200 text-white p-2 rounded-xl flex items-center justify-center ml-2"
                    aria-label="Search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar