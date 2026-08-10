import React, { useEffect, useState } from "react";
import {
    FaBox,
    FaTruck,
    FaCreditCard,
    FaCalendarAlt,
    FaShoppingBag,
} from "react-icons/fa";
import useOrderStore from "../store/orderStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import OrderProgressBar from "./OrderProgressBar";

const STATUS_META = {
    confirmed: { label: "Confirmed", dot: "bg-gray-400" },
    packed: { label: "Packed", dot: "bg-gray-400" },
    shipped: { label: "Shipped", dot: "bg-black" },
    out_for_delivery: { label: "Out For Delivery", dot: "bg-black" },
    delivered: { label: "Delivered", dot: "bg-black" },
    cancelled: { label: "Cancelled", dot: "bg-red-600" },
};

const OrderDetaile = () => {
    const [order, setOrder] = useState(null);
    const { fetchOrderById, isLoading } = useOrderStore();
    const { id } = useParams();

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            : "N/A";

    useEffect(() => {
        async function loadOrder() {
            let data = await fetchOrderById(id);
            setOrder(data);
        }
        loadOrder();
    }, [id]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#111" size={60} />
            </div>
        );
    }
    const totalAmount = order?.items?.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );
    const statusMeta = STATUS_META[order?.status] || { label: order?.status, dot: "bg-gray-400" };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-white border border-gray-200 p-8 mt-28 mb-20"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5 mb-6">
                <h1 className="text-2xl font-black text-black flex items-center gap-2">
                    <FaShoppingBag /> Order #{order?._id.slice(-8).toUpperCase()}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Status Badge */}
                    <span className="inline-flex items-center gap-2 px-3 py-1 border border-gray-300 text-[10px] font-black uppercase tracking-widest">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dot}`}></span>
                        {statusMeta.label}
                    </span>

                    {/* Estimated Delivery Date */}
                    <div className="flex items-center gap-2 border border-gray-200 px-3 py-1">
                        <FaCalendarAlt className="text-gray-500 text-sm" />
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
                            Est. {order?.estimateDeliveryDate ? formatDate(order?.estimateDeliveryDate) : "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order Info */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 border border-gray-200 divide-x divide-y sm:divide-y-0 divide-gray-200 mb-8">
                <div className="flex items-start gap-3 p-4">
                    <FaBox className="text-gray-500 text-xl" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Items</p>
                        <p className="text-black font-bold">{order?.items?.length || 0} products</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4">
                    <FaTruck className="text-gray-500 text-xl" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Shipping To</p>
                        <p className="text-black font-bold">
                            {order?.address ? `${order.address.city}, ${order.address.state}` : "No address provided"}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4">
                    <FaCreditCard className="text-gray-500 text-xl" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payment</p>
                        <p className="text-black font-bold">{order?.paymentMethod || "Cash"}</p>
                        <p className={`text-[10px] font-black uppercase tracking-wide mt-0.5 ${order?.paymentStatus === "paid" ? "text-black" : "text-gray-400"}`}>
                            {order?.paymentStatus}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4">
                    <FaCalendarAlt className="text-gray-500 text-xl" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total</p>
                        <p className="text-black font-bold">₹{totalAmount}</p>
                    </div>
                </div>
            </div>

            {/* Items */}
            <h2 className="text-lg font-black text-black mb-4 uppercase tracking-tight">Order Items</h2>
            <div className="border border-gray-200 divide-y divide-gray-200">
                {order?.items?.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex justify-between items-center p-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-cover border border-gray-200"
                            />
                            <div>
                                <p className="font-bold text-black">{item.title}</p>
                                <p className="text-gray-500 text-sm">
                                    Size: {item.size} · Qty: {item.quantity} × ₹{item.price}
                                </p>
                            </div>
                        </div>
                        <p className="font-bold text-black">
                            ₹{item.quantity * item.price}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-6 border-t border-gray-300 pt-4 flex justify-between text-lg font-black text-black">
                <span>Total</span>
                <span>₹{totalAmount}</span>
            </div>

            {/* Dates */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-gray-500" />
                    <span>Ordered on {formatDate(order?.createdAt)}</span>
                </div>
                {order?.deliveredAt && (
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>Delivered on {formatDate(order?.deliveredAt)}</span>
                    </div>
                )}
            </div>
            {/* Order Tracking Section */}
            <div className="mt-10 border-t border-gray-200 pt-6">
                <OrderProgressBar
                    currentStep={["confirmed", "packed", "shipped", "out_for_delivery", "delivered"].indexOf(order?.status)}
                />
            </div>
        </motion.div>
    );
};

export default OrderDetaile;
