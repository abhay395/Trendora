import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUserById } from "../../hooks/useAdmin";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaEdit,
    FaCheckCircle,
    FaTimesCircle,
    FaShoppingCart,
    FaClipboardList,
    FaUserTag,
    FaInfoCircle,
} from "react-icons/fa";

function StatCard({ label, value, icon: Icon, color }) {
    return (
        <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 shadow-sm">
            <div className={`p-2 rounded-full ${color} bg-opacity-10`}>
                <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div>
                <div className="text-xs text-gray-500">{label}</div>
                <div className="font-medium text-md text-gray-700">{value}</div>
            </div>
        </div>
    );
}

export default function UserDetails() {
    const [activeTab, setActiveTab] = useState("orders");
    const { id } = useParams();
    const { data: user, isLoading } = useUserById(id);

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: User Info */}
                <div className="lg:col-span-1 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6">
                    <div className="relative">
                        {user.isImage && user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow"
                            />
                        ) : (
                            <div className="w-30 h-30 rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold text-gray-200 border-4 border-gray-900 shadow">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        {/* <span
                            className={`absolute bottom-2 right-2 flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium shadow ${user.isActive
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                        >
                            {user.isActive ? (
                                <FaCheckCircle className="h-4 w-4 mr-1" />
                            ) : (
                                <FaTimesCircle className="h-4 w-4 mr-1" />
                            )}
                            {user.isActive ? "Active" : "Inactive"}
                        </span> */}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                        <div className="flex items-center justify-center gap-2 mt-1 text-gray-500 text-sm">
                            <FaEnvelope className="h-4 w-4 mr-1" />
                            {user.email || "—"}
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-1 text-gray-500 text-sm">
                            <FaPhone className="h-4 w-4 mr-1" />
                            {user.phone || "—"}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full mt-4">
                        <StatCard
                            label="Role"
                            value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            icon={FaUserTag}
                            color="text-gray-500"
                        />
                        <StatCard
                            label="Joined"
                            value={new Date(user.createdAt).toLocaleDateString()}
                            icon={FaCalendarAlt}
                            color="text-gray-500"
                        />
                        <StatCard
                            label="Last Update"
                            value={new Date(user.updatedAt).toLocaleDateString()}
                            icon={FaEdit}
                            color="text-gray-500"
                        />
                    </div>
                    <div className="w-full mt-4">
                        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                            <FaInfoCircle className="h-3 w-3" />
                            Bio
                        </div>
                        <div className="bg-gray-50 rounded-lg px-3 py-2 text-gray-700 text-sm min-h-[48px]">
                            {user.bio || <span className="text-gray-400">No bio provided</span>}
                        </div>
                    </div>
                </div>

                {/* Right: Orders + Carts */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 flex flex-col">
                    {/* Tabs */}
                    <div className="flex gap-2  mb-6">
                        <button
                            className={`flex items-center gap-2 px-5 py-2 rounded-t-lg font-medium transition-all ${activeTab === "orders"
                                    ? "bg-gray-50 text-gray-500 border-b-2 border-gray-500"
                                    : "text-gray-500 hover:text-gray-500"
                                }`}
                            onClick={() => setActiveTab("orders")}
                        >
                            <FaClipboardList className="h-5 w-5" />
                            Orders
                        </button>
                        <button
                            className={`flex items-center gap-2 px-5 py-2 rounded-t-lg font-medium transition-all ${activeTab === "carts"
                                    ? "bg-gray-50 text-gray-500 border-b-2 border-gray-500"
                                    : "text-gray-500 hover:text-gray-500"
                                }`}
                            onClick={() => setActiveTab("carts")}
                        >
                            <FaShoppingCart className="h-5 w-5" />
                            Carts
                        </button>
                    </div>

                    {/* Orders */}
                    {activeTab === "orders" && (
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {user.orders?.length ? (
                                user.orders.map((order) => (
                                    <div
                                        key={order._id}
                                        className=" rounded-xl p-5 space-y-2 bg-gradient-to-r from-gray-50 to-white shadow-sm"
                                    >
                                        <div className="flex flex-wrap gap-4 items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold text-gray-700">
                                                    <FaClipboardList className="inline mr-1 text-blue-400" />
                                                    Status:
                                                </span>
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.status === "Delivered"
                                                            ? "bg-green-100 text-green-600"
                                                            : order.status === "Cancelled"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold text-gray-700">
                                                    <FaCheckCircle className="inline mr-1 text-green-400" />
                                                    Payment:
                                                </span>
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.paymentStatus === "Paid"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold text-gray-700">
                                                    <FaCalendarAlt className="inline mr-1 text-purple-400" />
                                                    Delivery:
                                                </span>
                                                <span>
                                                    {order.estimateDeliveryDate
                                                        ? new Date(order.estimateDeliveryDate).toLocaleDateString()
                                                        : "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-semibold text-gray-700">
                                                    <FaShoppingCart className="inline mr-1 text-pink-400" />
                                                    Total:
                                                </span>
                                                <span>₹{order.totalPrice}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-700 mt-2 mb-1">
                                                Items:
                                            </div>
                                            <ul className="mt-2 space-y-2">
                                                {order.items.map((item) => (
                                                    <li
                                                        key={item._id}
                                                        className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-12 h-12 rounded object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-medium">{item.title}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {item.size} • ₹{item.price} x {item.quantity}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400 py-12">
                                    <FaClipboardList className="h-10 w-10 mb-2" />
                                    <p>No orders yet.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Carts */}
                    {activeTab === "carts" && (
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {user.carts?.length ? (
                                user.carts.map((cart) => (
                                    <div
                                        key={cart._id}
                                        className="border border-gray-300 rounded-xl p-4 flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-white shadow-sm"
                                    >
                                        <img
                                            src={cart.productId.image}
                                            alt={cart.productId.title}
                                            className="w-14 h-14 rounded object-cover border border-gray-300"
                                        />
                                        <div>
                                            <p className="font-medium">{cart.productId.title}</p>
                                            <p className="text-sm text-gray-500">
                                                {cart.size} • Qty: {cart.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400 py-12">
                                    <FaShoppingCart className="h-10 w-10 mb-2" />
                                    <p>No items in cart.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
