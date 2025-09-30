import { MoveRight } from 'lucide-react';
import Card from '../componente/Card';
import FeatureSection from '../componente/FeatureSection';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useProducts } from '../hooks/useProducts';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import SkeletonCard from '../componente/SkeletonCard';
import { useEffect } from 'react';
import privateAxios from '../api/instance/privateAxios';
// import axios from 'axios'

const BASEURL = import.meta.env.VITE_API_URL
function Home() {
  const { data: products, isLoading, error } = useProducts('', {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  const location = useLocation();
  useEffect(() => {
    async function degbugeConsole() {
      try {
        const res = await privateAxios.get(`${BASEURL}/debug`)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    // call async function from synchronous effect
    degbugeConsole()
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Save token in localStorage (or Zustand/Redux)
      localStorage.setItem("token", token);

      // Optional: remove token from URL after storing
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-0 mt-10 md:mt-4 md:px-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"
    >
      {/* Hero Section */}
      <section className="w-full flex items-center justify-center py-10 md:py-20 bg-gradient-to-r from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef]">
        <div className="max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-x-16 gap-y-10 px-6 md:px-12">
          {/* Left Content */}
          <div className="max-w-xl flex flex-col items-start gap-6">
            <span className="inline-block bg-black text-white text-xs font-semibold px-3 py-1 rounded-full m tracking-widest shadow-md">
              NEW ARRIVALS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-2">
              <span className="bg-gradient-to-r from-black via-gray-700 to-gray-400 bg-clip-text text-transparent">
                Stand Out
              </span>
              <br />
              <span className="text-gray-500">with Custom Tees</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-2">
              Design your own t-shirt and express your unique style. High quality, fast shipping, and endless creativity.
            </p>
            <Link to="/products">
              <button
                className="group relative cursor-pointer py-3 px-10 text-white text-lg font-bold rounded-full overflow-hidden bg-gradient-to-r from-black via-gray-800 to-gray-700 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-x-3"
              >
                Explore More
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                  <MoveRight size={22} />
                </span>
              </button>
            </Link>
          </div>
          {/* Right Image */}
          <div className="w-full flex justify-center items-center">
            <div className="relative">
              <LazyLoadImage
                alt="product"
                src="https://res.cloudinary.com/dhcszkydc/image/upload/v1756402078/pbws8l78ssf0ldaa2z4c.png"
                className="w-[400px] sm:w-[480px] md:w-[550px] lg:w-[580px] xl:w-[600px] h-auto object-cover rounded-3xl shadow-2xl border-4 border-white"
                wrapperClassName="w-[400px] sm:w-[480px] md:w-[550px] lg:w-[580px] xl:w-[600px]"
                style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
                effect="blur"
                visibleByDefault  // 👈 This makes it load immediately, no delay
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2   bg-white/80 backdrop-blur-md w-50 md:w-60 md:text-sm flex items-center justify-center py-2 rounded-full shadow-md text-xs font-semibold text-gray-700">
                100% Cotton • Free Shipping
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Collection */}
      <section className='my-16 md:px-10 lg:px-20'>
        <div className='mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center'>
            <span className='text-gray-500'>Latest</span> Collection
          </h2>
          <p className='text-base md:text-lg font-medium text-gray-500 text-center mt-3'>
            Discover our freshest designs, handpicked for you. Find your next favorite tee!
          </p>
        </div>
        <section className='grid grid-cols-1 px-5 md:px-0 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6'>
          {
            isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              products?.slice(0, 10).map((item) => <Card product={item} key={item._id} />)
            )
          }
        </section>
      </section>

      {/* Best Seller */}
      <section className='my-16 md:px-10 lg:px-20'>
        <div className='mb-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center'>
            <span className='text-yellow-500'>Best</span> Sellers
          </h2>
          <p className='text-base md:text-lg font-medium text-gray-500 text-center mt-3'>
            Our most popular picks, loved by our customers. Grab yours before they're gone!
          </p>
        </div>
        <section className='grid grid-cols-1 px-5 md:px-0 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6'>
          {
            isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              products?.slice(0, 8).map((item) => <Card product={item} key={item._id + '-best'} />)
            )
          }
        </section>
      </section>

      {/* Feature Section */}
      <section className="bg-gradient-to-r from-gray-100 via-white to-gray-100 py-12">
        <FeatureSection />
      </section>
    </motion.div>
  )
}

export default Home