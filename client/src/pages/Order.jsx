import React, { useEffect } from 'react';
import useOrderStore from '../store/orderStore';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaMoneyBill, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';

const Orders = () => {
    const { order, fetchOrderList, isLoading } = useOrderStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrderList();
    }, [fetchOrderList]);

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-semibold text-black mb-10">Your Orders</h1>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="text-gray-500 text-lg">Loading orders...</span>
                    </div>
                ) : order.length === 0 ? (
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-10 text-gray-500 text-center">
                        <span className="text-3xl block mb-2">🛒</span>
                        You haven’t placed any orders yet.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {order.map((o) => (
                            <div
                                key={o._id}
                                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition hover:shadow-md"
                            >
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                    <div className="flex items-center gap-2 text-black font-medium">
                                        🧾 Order ID: <span className="text-gray-700">{o._id.slice(-8)}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0 gap-2">
                                        <FaCalendarAlt />
                                        {new Date(o.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Product Thumbnails */}
                                <div className="flex items-center gap-3 overflow-x-auto py-3 bg-gray-50 rounded-lg px-2">
                                    {o.items.slice(0, 3).map((p) => (
                                        <img
                                            key={p._id}
                                            src={p.image}
                                            alt={p.name}
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                    ))}
                                    {o.items.length > 3 && (
                                        <div className="text-sm text-gray-600 font-medium">
                                            +{o.items.length - 3} more
                                        </div>
                                    )}
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-sm">
                                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                                        <FaShoppingCart className="text-black" />
                                        <span className="text-gray-800">Items: <strong>{o.items.length}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                                        <FaMoneyBill className="text-black" />
                                        <span className="text-gray-800">Total: <strong>₹{o.totalPrice}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                                        <FaBox className="text-black" />
                                        <span className="text-gray-800">
                                            Status:
                                            <span
                                                className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full
                                                    ${
                                                        o.status === 'Delivered'
                                                            ? 'bg-green-100 text-green-700'
                                                            : o.status === 'Shipped'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : o.status === 'Cancelled'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }
                                                `}
                                            >
                                                {o.status}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <button
                                        className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition font-medium"
                                        onClick={() => navigate(`/order/${o._id}`)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="px-5 py-2 rounded-lg border border-black text-black bg-white hover:bg-black hover:text-white transition font-medium"
                                        onClick={() => navigate(`/order/${o._id}/track`)}
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
