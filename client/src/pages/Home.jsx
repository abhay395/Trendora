import { MoveRight, Sparkles, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import FeatureSection from '../components/FeatureSection';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SkeletonCard from '../components/SkeletonCard';
import { useEffect } from 'react';
import privateAxios from '../api/instance/privateAxios';

const BASEURL = import.meta.env.VITE_API_URL;

// Animation Variants for Staggered Effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Home() {
  const { data: products, isLoading, error } = useProducts('', {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white overflow-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative w-full pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
        
        {/* Abstract Background Decoration - Mesh Gradient Style */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-slate-50/80 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start max-w-2xl"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/40 mb-8 shadow-sm">
              <Sparkles size={14} className="text-luxe-gold" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-800">New Collection 2024</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-[0.95] mb-8 tracking-tighter">
              Wear Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-700 to-gray-500">
                True Identity.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-lg font-medium">
              Premium custom tees designed to express your unique style. 
              Quality cotton, precision printing, and fits that feel tailored just for you.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link to="/products">
                <button className="group relative px-10 py-5 bg-black text-white rounded-full font-bold shadow-2xl hover:bg-gray-800 transition-all duration-500 flex items-center gap-4 overflow-hidden">
                  <span className="relative z-10">Explore Shop</span>
                  <MoveRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </button>
              </Link>
            </div>
            
            <div className="mt-14 flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    Fast Shipping
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    Premium Quality
                </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
               className="relative z-10 animate-float"
            >
                <LazyLoadImage
                  alt="Modern T-Shirt Model"
                  src="https://res.cloudinary.com/dhcszkydc/image/upload/v1756402078/pbws8l78ssf0ldaa2z4c.png"
                  className="w-full max-w-[450px] lg:max-w-[550px] h-auto object-cover rounded-[3rem] shadow-premium border-[12px] border-white/50 backdrop-blur-sm"
                  effect="blur"
                  visibleByDefault
                />
                
                {/* Float Badge */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass border-white/60 px-8 py-4 rounded-3xl shadow-xl flex items-center gap-4 whitespace-nowrap">
                   <div className="bg-black p-2.5 rounded-2xl shadow-lg">
                       <TrendingUp size={20} className="text-white"/>
                   </div>
                   <div>
                       <p className="text-[9px] uppercase text-gray-400 font-black tracking-[0.15em]">Material</p>
                       <p className="text-sm font-bold text-black">100% Organic Cotton</p>
                   </div>
                </div>
            </motion.div>
            
            {/* Background Blob behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-indigo-50/40 to-transparent rounded-full blur-[80px] -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* --- Latest Collection --- */}
      <section className="py-20 md:px-10 lg:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end px-6 md:px-0 mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Fresh Drops
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Newest additions to elevate your wardrobe.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
            View All Products
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 px-5 md:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : products?.slice(0, 8).map((item) => (
                <motion.div key={item._id} variants={itemVariants}>
                  <Card product={item} />
                </motion.div>
              ))
          }
        </motion.div>
      </section>

      {/* --- Best Sellers --- */}
      <section className="py-20 bg-gray-50/50 md:px-10 lg:px-20">
         <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto px-6">
                <span className="text-yellow-600 font-bold tracking-widest text-xs uppercase mb-2 block">Customer Favorites</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Best Sellers
                </h2>
                <p className="text-gray-500">
                    The pieces everyone is talking about. These designs are flying off the shelves—grab yours before they're gone.
                </p>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 px-5 md:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                    : products?.slice(0, 4).map((item) => ( // Showing top 4 for exclusive feel
                        <motion.div key={item._id + '-best'} variants={itemVariants}>
                            <Card product={item} />
                        </motion.div>
                    ))
                }
            </motion.div>
         </div>
      </section>

      {/* --- Features --- */}
      <section className="bg-white py-12 border-t border-gray-100">
        <FeatureSection />
      </section>
      
    </div>
  );
}

export default Home;