import React from 'react'
import { Link } from 'react-router-dom'

function CartEmpty() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center p-6">
                <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to={'/'} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default CartEmpty