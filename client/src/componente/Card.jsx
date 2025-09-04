import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Card({ product, index }) {
  const isOutOfStock = Object.values(product?.sizes || {}).every(qty => qty === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Link to={`/product/${product._id}`}>
        <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer">
          
          {/* Image with overlay */}
          <div className="relative overflow-hidden">
            <LazyLoadImage
              src={product?.images?.[0]?.url}
              alt={product?.title}
              effect="blur"
              className="w-full h-72 md:h-80  object-top object-cover transition-transform duration-300 group-hover:scale-105"
              wrapperClassName="w-full object-top object-cover"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">
                Out of Stock
              </div>
            )}
            {product?.isNew && !isOutOfStock && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                New
              </span>
            )}
            {!isOutOfStock && (
              <button className="absolute bottom-3 cursor-pointer left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
