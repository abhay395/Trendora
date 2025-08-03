import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

function Card({ product, index }) {
  // Calculate average rating (if available)
  // const rating = product?.rating;
  const isOutOfStock = Object.values(product?.sizes || {}).every(qty => qty === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      exit={{ opacity: 0, y: 30 }}
      className="h-full"
    >
      <Link to={`/product/${product._id}`}>
        <div className="w-full  xs:h-full xs:max-w-sm md:max-w-md bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col  group border border-gray-100">
          <div className="relative flex items-center justify-center bg-gradient-to-t from-gray-50 via-white to-gray-100">
            <img
              className="h-[360px] xs:h-[300px] md:h-[340px] w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              src={product?.images?.[0]?.url}
              alt={product?.title}
            />
            {isOutOfStock && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Out of Stock
              </span>
            )}
            {product?.isNew && !isOutOfStock && (
              <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                New
              </span>
            )}
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1 truncate">{product.title}</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500 flex items-center text-sm">
                {[...Array(Math.floor(product?.rating))].map((_, i) => (
                  <FaStar key={i} />
                ))}
                {product?.rating > 0 && (
                  <span className="ml-1 text-gray-600 font-medium">({product?.rating})</span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-extrabold text-gray-800">₹{product.price}</span>
              {product?.sizes && (
                <span className="text-xs text-gray-500">
                  {Object.entries(product.sizes)
                    .filter(([size, qty]) => qty > 0)
                    .map(([size]) => size)
                    .join(', ') || 'No sizes'}
                </span>
              )}
            </div>
            <button
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-900'
                }`}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'View Details'}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Card;
