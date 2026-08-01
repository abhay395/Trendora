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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link to={`/product/${product._id}`}>
        <div className="group relative bg-white rounded-[2rem] shadow-premium overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100/50">

          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={product?.images?.[0]?.url}
              alt={product?.title}
              className="w-full h-full object-top object-cover transform transition duration-1000 ease-out group-hover:scale-110"
              loading='lazy'
            />

            {/* Glass Overlay for Stock */}
            {isOutOfStock && (
              <div className="absolute inset-0 glass-dark flex items-center justify-center text-white font-black text-xs uppercase tracking-[0.2em]">
                Out of Stock
              </div>
            )}

            {/* Luxe New Badge */}
            {product?.isNew && !isOutOfStock && (
              <span className="absolute top-5 left-5 glass border-white/50 text-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                New Arrival
              </span>
            )}

            {/* Quick View Button */}
            {!isOutOfStock && (
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 px-6">
                <button className="w-full glass border-white/40 text-black py-3 rounded-2xl font-bold text-xs uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Quick View
                </button>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-gray-900 truncate flex-1 uppercase tracking-tight">{product.title}</h3>
                <span className="text-lg font-black text-black ml-4">₹{product.sizes[0].price}</span>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-luxe-gold flex items-center gap-1 uppercase tracking-wider">
                        <FaStar size={10} /> 
                        {product?.rating?.average || 0}
                    </span>
                    <span className="text-[9px] font-medium text-gray-400 uppercase tracking-widest">
                        ({product?.rating?.count || 0} Reviews)
                    </span>
                </div>
                <div className="flex -space-x-2">
                     {product.sizes.filter(item => item.quantity > 0).slice(0, 3).map((item, i) => (
                         <div key={i} className="w-6 h-6 rounded-full glass border-white/60 flex items-center justify-center text-[8px] font-black uppercase text-gray-600 shadow-sm ring-2 ring-white">
                             {item.size}
                         </div>
                     ))}
                     {product.sizes.length > 3 && (
                         <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400 ring-2 ring-white">
                             +{product.sizes.length - 3}
                         </div>
                     )}
                </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Card;
