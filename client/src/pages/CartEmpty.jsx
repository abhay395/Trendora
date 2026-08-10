import React from 'react'
import { Link } from 'react-router-dom'

function CartEmpty() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center p-6">
                <h1 className="text-3xl font-black text-black mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to={'/'} className="inline-block bg-black text-white px-6 py-2.5 font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default CartEmpty