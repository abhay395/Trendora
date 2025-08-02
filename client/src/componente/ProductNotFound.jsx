import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductNotFound() {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
            >
                <FaBoxOpen className="mx-auto text-5xl text-gray-700 mb-4" />
                <p className="text-black text-lg font-semibold">No products found</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
                    <span role="img" aria-label="search">🔍</span>
                    Try adjusting your filters
                </p>
            </motion.div>
        </div>
    )
}

export default ProductNotFound