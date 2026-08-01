import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Archive, Trash2, Star, Tag, AlertCircle } from 'lucide-react';

function ProductCard({ product, index, softDeleteProduct, deleteProductPermanently, navigate }) {
    
    // Check if product is effectively disabled/deleted for visual styling
    const isInactive = product.isDeleted;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-lg ${
                isInactive ? "opacity-75 grayscale-[0.5]" : ""
            }`}
        >
            {/* --- Image Section --- */}
            <div className="relative h-60 overflow-hidden bg-gray-100">
                <img
                    src={product.images[0]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                />
                
                {/* Overlay Gradient for text readability if needed, or specific interactions */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isDeleted && (
                        <span className="inline-flex items-center gap-1 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            <Trash2 size={10} /> DELETED
                        </span>
                    )}
                    {product.isOutOfStock && (
                        <span className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            <AlertCircle size={10} /> SOLD OUT
                        </span>
                    )}
                </div>

                {/* Rating Badge (Floating) */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/20">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-800">{product.rating.average}</span>
                </div>
            </div>

            {/* --- Content Section --- */}
            <div className="flex-1 flex flex-col p-4">
                
                {/* Header: Title & Price */}
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 
                        className="text-base font-semibold text-gray-900 truncate flex-1 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                        title={product.title}
                    >
                        {product.title}
                    </h3>
                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-sm">
                        ₹{product?.sizes[0]?.price}
                    </span>
                </div>

                {/* Meta Details */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <Tag size={12} />
                        <span className="capitalize">{product.category?.name}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="capitalize">{product.gender}</span>
                </div>

                {/* Size Grid (Compact) */}
                <div className="mb-4">
                    <p className="text-[10px] uppercase text-gray-400 font-bold mb-1.5 tracking-wider">Available Sizes</p>
                    <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((el, idx) => (
                            <span
                                key={idx}
                                className={`text-[10px] font-medium px-2 py-1 rounded border transition-colors ${
                                    el.quantity === 0
                                        ? "bg-gray-50 text-gray-400 border-gray-100 decoration-slice line-through"
                                        : "bg-white text-gray-700 border-gray-200"
                                }`}
                            >
                                {el.size}
                            </span>
                        ))}
                    </div>
                </div>

                {/* --- Action Buttons Footer --- */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                    {/* Primary Action: Edit */}
                    <button
                        onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-xs font-medium transition-all active:scale-95"
                    >
                        <Edit3 size={14} />
                        <span>Edit</span>
                    </button>

                    {/* Secondary Action: Archive */}
                    <button
                        onClick={() => softDeleteProduct(product._id)}
                        title={product.isDeleted ? "Restore" : "Archive"}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    >
                        <Archive size={16} />
                    </button>

                    {/* Destructive Action: Permanent Delete */}
                    <button
                        onClick={() => deleteProductPermanently(product._id)}
                        title="Delete Permanently"
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard;