import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Card({ product, index }) {
  const isOutOfStock = Object.values(product?.sizes || {}).every(item => item.quantity === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Link to={`/product/${product._id}`}>
        <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl  cursor-pointer">

          {/* Image with overlay */}
          <div className="relative overflow-hidden group rounded  transition-shadow duration-500">
            {/* Image with zoom & slight tilt */}
            <img
              src={product?.images?.[0]?.url}
              alt={product?.title}
              effect="blur"
              className="w-full h-72 md:h-80 object-top object-cover transform transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
              loading='lazy'
            />

            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg animate-fadeIn">
                Out of Stock
              </div>
            )}

            {/* New badge with floating animation */}
            {product?.isNew && !isOutOfStock && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow animate-bounce-slow">
                New
              </span>
            )}

            {/* View Details button with fade-up animation */}
            {!isOutOfStock && (
              <button className="absolute bottom-3 cursor-pointer left-1/2 -translate-x-1/2 bg-black text-white px-5 py-2 rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                View Details
              </button>
            )}
          </div>

          {/* Info Section */}
          <div className="p-4 flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>

            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(Math.floor(product?.rating?.average))].map((_, i) => (
                <FaStar key={i} />
              ))}
              {product?.rating?.average > 0 && (
                <span className="text-gray-500 text-xs">({product?.rating.average})</span>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-bold text-gray-900">₹{product.sizes[0].price}</span>
              <span className="text-xs text-gray-400">
                {product.sizes.filter(item => item.quantity > 0).map(item => item.size).join(', ') || 'No sizes'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Card;
