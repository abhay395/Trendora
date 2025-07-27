import { useEffect } from 'react'
import myImage from '../assets/HeroSectionImage.png';
import { MoveRight } from 'lucide-react';
import Card from '../componente/Card';
import FeatureSection from '../componente/FeatureSection';
import { Link } from 'react-router-dom';
import useProductStore from '../store/productStore';
import { motion } from 'framer-motion'
import { MoonLoader } from 'react-spinners'
function Home() {
  const { fetchProducts, products, isLoading } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [])
  if (isLoading) return <div className='h-screen flex items-center justify-center'><MoonLoader color='#000' /></div>
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}

      className="min-h-screen px-6 md:px-12 bg-white">
      <div className='flex items-center justify-center'>
        <div className="max-w-7xl w-full flex  flex-col-reverse sm:flex-row items-center justify-between gap-x-10 gap-y-3">
          {/* Left Content */}
          <div className="max-w-xl sm:mt-19 lg:mt-14">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold  text-gray-900 mb-4">
              Customized <br />
              <span className="text-gray-500 ">Printed Tees</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg mb-6">
              We offer personalized printed t-shirts. Choose your style, add your design, and wear your creativity.
            </p>
            <button
              className="relative cursor-pointer py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out  hover:scale-105 hover:text-white  active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-black before:to-black before:transition-all flex justify-center items-center gap-x-3 before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            >
              Explore More <MoveRight />
            </button>
          </div>
          {/* Right Image */}
          <div className="w-full  flex justify-center mt-24 lg:mt-40">
            <img
              src={myImage}
              alt="Boy in customized tee"
              className="w-full max-w-[1000px] h-auto object-cover "
            />
          </div>
        </div>
      </div>
      {/* // Lattest Collection  */}
      <section className='my-14 md:px-10 lg:px-20'>
        <div className=''>
          <h1 className='text-4xl font-bold text-gray-700 px-2 text-center'><span className='text-gray-500'>Lattest</span> Collection </h1>
          <p className='text-lg font-semibold text-gray-400 px-2 text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla veniam iure unde vitae,  </p>
        </div>
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-x-3 gap-y-2 lg:gap-x-4  lg:gap-y-5'>
          {
            products.map((item) => <Link key={item._id} to={`product/${item._id}`}><Card product={item} /></Link>)
          }
        </section>
      </section>
      {/* // Best Sailer */}
      <section className='my-14 px-20'>
        <div className='py-4'>
          <h1 className='text-4xl font-bold text-gray-700 px-2 text-center '><span className='text-gray-500'>Best</span> Seller </h1>
          <p className='text-lg font-semibold text-gray-400 px-2 text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nulla veniam iure unde vitae,  </p>
        </div>
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-x-3 gap-y-2 lg:gap-x-4  lg:gap-y-5'>
          {
            products.map((item) => <Link key={item._id} to={`product/${item._id}`}><Card product={item} /></Link>)
          }
        </section>
      </section>
      {/* Feature Section */}
      <section>
        <FeatureSection />
      </section>
    </motion.div>
  )
}

export default Home