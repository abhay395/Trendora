import React from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductNotFound() {
    return (
        <div className="flex items-center justify-center h-screen w-full ">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
            >
                <p className="text-gray-500 text-lg">🔍 No products found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </motion.div>
        </div>
    )
}

export default ProductNotFound