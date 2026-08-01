import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, X, Search, User, LogOut, Package, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import useCartStore from '../store/cartStore';
import { useUser } from '../hooks/useUser';
import { useLogout } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const BASEURL = import.meta.env.VITE_API_URL;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdown(!isDropdown);
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const { data: cart = [] } = useCart()
  const { data: user } = useUser();
  const { mutateAsync: logoutUser } = useLogout()

  const logoutHandler = async () => {
    setIsDropdown(false)
    toast.promise(logoutUser(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Something went wrong"
    })
    navigate('/')
  }

  // Sync searchTerm with URL query param
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSearch = searchParams.get('search') || '';
    setSearchTerm(urlSearch);
  }, [location.search]);

  const handleSearch = () => {
    if(searchTerm.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
        setIsOpen(false); // Close mobile menu if open
    }
  }

  const enterHandler = (e) => {
    if (e.key === "Enter") {
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

  // Helper for Nav Links
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
          isActive ? 'text-black' : 'text-gray-400 hover:text-black'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="glass fixed w-full top-0 font-outfit z-50 border-b border-white/20 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-8">
          
          {/* 1. Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <span className="text-2xl font-black tracking-tighter text-black group-hover:text-indigo-600 transition-colors duration-500">
              TRENDORA.
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Shop</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* 3. Search Bar (Desktop) - Premium Glass Style */}
          <div className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full group">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={enterHandler}
                    placeholder="Search drops..."
                    className="w-full glass border-white/40 text-black text-xs font-bold uppercase tracking-widest rounded-2xl py-3 pl-5 pr-12 focus:ring-0 focus:border-white/60 focus:bg-white/40 transition-all placeholder:text-gray-400"
                />
                <button 
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors"
                >
                    <Search size={16} />
                </button>
            </div>
          </div>

          {/* 4. Right Actions */}
          <div className="flex items-center space-x-5">
            
            {/* Cart */}
            {user && (
                <button
                className="relative text-gray-500 hover:text-black transition-all hover:scale-110"
                onClick={() => navigate('/cart')}
                >
                <ShoppingCart strokeWidth={2.5} size={20} />
                {cart?.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                    {cart.length}
                    </span>
                )}
                </button>
            )}

            {/* Profile / Auth */}
            {user ? (
              <div className="relative dropdown-container">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:border-black transition-colors"
                >
                  {user.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-gray-600" />
                  )}
                </button>

                {/* Dropdown */}
                {isDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <Link to="/profile" onClick={() => setIsDropdown(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User size={16} className="mr-3" /> Profile
                    </Link>
                    <Link to="/orders" onClick={() => setIsDropdown(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Package size={16} className="mr-3" /> Orders
                    </Link>
                    <Link to="/settings" onClick={() => setIsDropdown(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings size={16} className="mr-3" /> Settings
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button onClick={logoutHandler} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut size={16} className="mr-3" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="text-sm font-medium text-white bg-black px-5 py-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            
            {/* Mobile Search */}
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={enterHandler}
                    placeholder="Search products..."
                    className="w-full bg-gray-100 text-gray-900 text-sm rounded-md border-none py-2.5 pl-4 pr-10"
                />
                 <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Search size={18} />
                </button>
            </div>

            <div className="space-y-1">
                <Link to="/" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Home</Link>
                <Link to="/products" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Products</Link>
                <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md">Contact</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar