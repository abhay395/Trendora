import React from 'react'
import { FaBoxOpen, FaSearch } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductNotFound() {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-md mx-auto px-4"
            >
                <div className="mb-6">
                    <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-4" />
                    <FaSearch className="mx-auto text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No products found
                </h3>
                <p className="text-gray-500 mb-4">
                    We couldn't find any products matching your criteria.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                    <p>• Try adjusting your filters</p>
                    <p>• Check your search terms</p>
                    <p>• Browse all categories</p>
                </div>
            </motion.div>
        </div>
    )
}

export default ProductNotFound