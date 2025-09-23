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
import OrderTracking from "./OrderProgressBar";
import OrderProgressBar from "./OrderProgressBar";

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mt-22 my-20"
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-400 pb-5 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaShoppingBag className="text-primary" /> Order # {order?._id.slice(-8)}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Status Badge */}
                    <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold capitalize shadow-sm ${order?.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order?.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {order?.status}
                    </span>

                    {/* Estimated Delivery Date */}
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full shadow-sm">
                        <FaCalendarAlt className="text-yellow-600 text-sm" />
                        <span className="text-sm font-medium text-yellow-700">
                            {order?.estimateDeliveryDate
                                ? formatDate(order?.estimateDeliveryDate)
                                : "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <FaBox className="text-gray-700 text-xl" />
                    <div>
                        <p className="font-medium text-gray-900">Items</p>
                        <p className="text-gray-600">{order?.items?.length || 0} products</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <FaTruck className="text-gray-700 text-xl" />
                    <div>
                        <p className="font-medium text-gray-900">Shipping</p>
                        <p className="text-gray-600">
                            {order?.address?.street + " " + order?.address?.city + " " + order?.address?.state || "No address provided"}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <FaCreditCard className="text-gray-700 text-xl" />
                    <div>
                        <p className="font-medium text-gray-900">Payment</p>
                        <p className="text-gray-600">{order?.paymentMethod || "Cash"}</p>
                    </div>
                </div>
            </div>

            {/* Items */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
                {order?.items?.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-gray-500 text-sm">
                                    Qty: {item.quantity} × ₹{item.price}
                                </p>
                            </div>
                        </div>
                        <p className="font-semibold text-gray-900">
                            ₹{item.quantity * item.price}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-8 border-t border-gray-400 pt-4 flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>₹{totalAmount}</span>
            </div>

            {/* Dates */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-gray-700" />
                    <span>Ordered on {formatDate(order?.createdAt)}</span>
                </div>
                {order?.deliveredAt && (
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-gray-700" />
                        <span>Delivered on {formatDate(order?.deliveredAt)}</span>
                    </div>
                )}
            </div>
            {/* Order Tracking Section */}
            <div className="mt-10">
            <OrderProgressBar status={'Delivered'} />
            </div>

        </motion.div>
    );
};

export default OrderDetaile;
