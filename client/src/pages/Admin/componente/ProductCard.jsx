import React from 'react'
import { motion } from 'framer-motion'
function ProductCard({ product, index, softDeleteProduct, deleteProductPermanently, navigate }) {
    return (
        <div
            key={product._id}
            className="flex flex-col bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition group"
        >
            {/* Image Section */}
            <div className="relative cursor-pointer">
                <img
                    src={product.images[0]?.url}
                    alt={product.title}
                    className="w-full h-80 object-cover object-top rounded-t-lg"
                />
                {product.isOutOfStock && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                        Out of Stock
                    </span>
                )}
                {product.isDeleted && (
                    <span className="absolute top-2 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                        Deleted
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3
                        className="text-lg font-semibold truncate"
                        title={product.title}
                    >
                        {product.title}
                    </h3>
                    <span className="text-gray-900 font-bold text-base">
                        ₹{product?.sizes[0]?.price}
                    </span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
                        {product.category?.name}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                        {product.gender}
                    </span>
                    <span
                        className={`text-xs px-2 py-0.5 rounded font-medium ${product.isOutOfStock
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                            }`}
                    >
                        {product.isOutOfStock ? "Out of Stock" : "In Stock"}
                    </span>
                </div>

                {/* Description */}
                <p
                    className="text-gray-500 text-sm mb-3 line-clamp-2"
                    title={product.description}
                >
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500 font-bold">{product.rating.average} ★</span>
                    <span className="text-xs text-gray-400">/ 5</span>
                </div>

                {/* Sizes */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {product.sizes.map((el, idx) => (
                        <span
                            key={idx}
                            className={`text-xs px-2 py-0.5 rounded border ${el.quantity === 0
                                ? "bg-gray-100 text-gray-400 border-gray-200"
                                : "bg-blue-100 text-blue-700 border-blue-200"
                                }`}
                        >
                            {el.size}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                    <button
                        onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black text-white hover:bg-gray-800 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => softDeleteProduct(product._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                    >
                        Archive
                    </button>
                    <button
                        onClick={() => deleteProductPermanently(product._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard