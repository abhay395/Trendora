import React, { useEffect } from "react";
import useOrderStore from "../store/orderStore";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import {
    FaBox,
    FaMoneyBill,
    FaCalendarAlt,
    FaShoppingCart,
} from "react-icons/fa";

const Orders = () => {
    const { order, fetchOrderList, isLoading } = useOrderStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrderList();
    }, [fetchOrderList]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white py-12"
        >
            <div className="max-w-6xl mx-auto px-4 mt-10">
                {/* Title */}
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-4xl font-extrabold text-black">Your Orders</h1>
                    <div className="h-1 w-20 bg-black rounded"></div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20 text-gray-500">
                        Loading orders...
                    </div>
                ) : order.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
                        <span className="text-5xl block mb-4">🛒</span>
                        <p className="text-lg text-gray-600 font-medium">
                            You haven’t placed any orders yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {order.map((o, index) => (
                            <motion.div
                                key={o._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="bg-white border border-gray-200 rounded-2xl shadow p-6"
                            >
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div className="text-lg font-semibold text-black">
                                        🧾 Order ID:{" "}
                                        <span className="font-mono text-black">
                                            {o._id.slice(-8)}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 mt-2 md:mt-0 gap-2">
                                        <FaCalendarAlt />
                                        {new Date(o.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Product Thumbnails */}
                                <div className="flex items-center gap-3 overflow-x-auto py-3 rounded-lg border border-gray-100 px-2">
                                    {o.items.slice(0, 3).map((p) => (
                                        <img
                                            key={p._id}
                                            src={p.image}
                                            alt={p.name}
                                            className="w-16 h-16 object-cover rounded-lg hover:scale-105 transition"
                                        />
                                    ))}
                                    {o.items.length > 3 && (
                                        <div className="text-sm text-gray-700 font-medium">
                                            +{o.items.length - 3} more
                                        </div>
                                    )}
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
                                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                        <FaShoppingCart className="text-black" />
                                        <span className="text-gray-900 font-medium">
                                            {o.items.length > 1? 'Items:':'Item'} <strong>{o.items.length}</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                        <FaMoneyBill className="text-black" />
                                        <span className="text-gray-900 font-medium">
                                            Total: <strong>₹{o.totalPrice}</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                        <FaBox className="text-black" />
                                        <span className="text-gray-900 font-medium">
                                            Status:
                                            <span
                                                className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full ${o.status === "Delivered"
                                                    ? "bg-green-600 text-white"
                                                    : o.status === "Shipped"
                                                        ? "bg-blue-600 text-white"
                                                        : o.status === "Cancelled"
                                                            ? "bg-red-600 text-white"
                                                            : "bg-yellow-500 text-black"
                                                    }`}
                                            >
                                                {o.status}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 mt-8">
                                    <button
                                        className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition font-semibold"
                                        onClick={() => navigate(`/order/${o._id}`)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="px-6 py-2 rounded-lg border border-black text-black bg-white hover:bg-black hover:text-white transition font-semibold"
                                        onClick={() => navigate(`/order/${o._id}/track`)}
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Orders;
