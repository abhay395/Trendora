import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
function Card({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      exit={{ opacity: 0, y: 30 }}
    // whileHover={{
    //   scale: 1.03,
    //   boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
    //   y: -5
    // }}
    >
      <Link to={`/product/${product._id}`}>
        <div className=" w-full max-w-xs sm:max-w-sm md:max-w-md sm:h-[400px] md:h-[400px] lg:h-[400px] cursor-pointer  overflow-hidden">
          <div className="relative flex items-center justify-center w-full bg-white overflow-hidden">
            <img
              className="h-[250px] sm:h-[300px] md:h-[350px] hover:scale-110 w-full object-cover object-top transition-transform duration-300"
              src={product?.images[0].url}
              alt={product?.title}
            />
          </div>
          <div className="leading-7 ">
            <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-700 truncate">{product.title}</h2>
            <span className="text-xs sm:text-sm md:text-md font-semibold text-gray-500">₹{product.price}</span>
          </div>
        </div></Link>
    </motion.div>
  )
}

export default Card