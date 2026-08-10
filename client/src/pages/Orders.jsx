import React, { useEffect } from "react";
import useOrderStore from "../store/orderStore";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { FaCalendarAlt } from "react-icons/fa";
import { PackageSearch } from "lucide-react";

const STATUS_META = {
    confirmed: { label: "Confirmed", dot: "bg-gray-400" },
    packed: { label: "Packed", dot: "bg-gray-400" },
    shipped: { label: "Shipped", dot: "bg-black" },
    out_for_delivery: { label: "Out For Delivery", dot: "bg-black" },
    delivered: { label: "Delivered", dot: "bg-black" },
    cancelled: { label: "Cancelled", dot: "bg-red-600" },
};

const formatDate = (date) =>
    date
        ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
        : "N/A";

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
            className="min-h-screen bg-white pt-32 pb-12"
        >
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <div className="flex items-end justify-between mb-10 pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-black text-black tracking-tight">Your Orders</h1>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                        {order.length} {order.length === 1 ? "Order" : "Orders"}
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20 text-gray-500">
                        Loading orders...
                    </div>
                ) : order.length === 0 ? (
                    <div className="border border-gray-200 p-16 text-center">
                        <PackageSearch className="w-10 h-10 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg text-gray-600 font-medium">
                            You haven't placed any orders yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {order.map((o, index) => {
                            const statusMeta = STATUS_META[o.status] || { label: o.status, dot: "bg-gray-400" };
                            return (
                                <motion.div
                                    key={o._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="bg-white border border-gray-200"
                                >
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-6 py-5 border-b border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-black text-black">
                                                Order <span className="font-mono">#{o._id.slice(-8).toUpperCase()}</span>
                                            </span>
                                            <span className="inline-flex items-center gap-2 px-3 py-1 border border-gray-300 text-[10px] font-black uppercase tracking-widest">
                                                <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dot}`}></span>
                                                {statusMeta.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500 gap-2 font-medium uppercase tracking-wide">
                                            <FaCalendarAlt />
                                            Placed {formatDate(o.createdAt)}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Product Thumbnails */}
                                        <div className="flex items-center gap-3 overflow-x-auto pb-2">
                                            {o.items.slice(0, 4).map((p) => (
                                                <img
                                                    key={p._id}
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="w-16 h-16 object-cover border border-gray-200 flex-shrink-0"
                                                />
                                            ))}
                                            {o.items.length > 4 && (
                                                <div className="text-sm text-gray-500 font-medium flex-shrink-0">
                                                    +{o.items.length - 4} more
                                                </div>
                                            )}
                                        </div>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 divide-x divide-y sm:divide-y-0 divide-gray-200 mt-6 text-sm">
                                            <div className="px-4 py-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                                                    {o.items.length > 1 ? "Items" : "Item"}
                                                </p>
                                                <p className="font-bold text-black">{o.items.length}</p>
                                            </div>
                                            <div className="px-4 py-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total</p>
                                                <p className="font-bold text-black">₹{o.totalPrice}</p>
                                            </div>
                                            <div className="px-4 py-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Payment</p>
                                                <p className="font-bold text-black">{o.paymentMethod}</p>
                                                <p className={`text-[10px] font-black uppercase tracking-wide mt-0.5 ${o.paymentStatus === "paid" ? "text-black" : "text-gray-400"}`}>
                                                    {o.paymentStatus}
                                                </p>
                                            </div>
                                            <div className="px-4 py-3">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                                                    {o.status === "delivered" ? "Delivered" : "Est. Delivery"}
                                                </p>
                                                <p className="font-bold text-black">
                                                    {o.status === "delivered" ? formatDate(o.deliveredAt) : formatDate(o.estimateDeliveryDate)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-3 mt-6">
                                            <button
                                                className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors font-bold text-xs uppercase tracking-widest"
                                                onClick={() => navigate(`/order/${o._id}`)}
                                            >
                                                Track Order
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Orders;
