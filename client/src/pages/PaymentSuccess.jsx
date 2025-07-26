import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import useOrderStore from "../store/orderStore";
import { motion } from 'framer-motion';
import { useEffect } from "react";
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.2,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.1, type: "spring", stiffness: 50 }
  }
};

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer)
  }, [])
  return (
    <motion.div
      className="flex items-center space-y-8 flex-col justify-center min-h-screen bg-gray-50 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-2xl p-10 max-w-md w-full text-center border border-gray-200 shadow-xl"
      >
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-3 tracking-tight">
          Order placed Successful!
        </h2>
        <p>Order Id: <span className="font-semibold">{id}</span></p>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for your purchase.<br />
          Your order has been placed successfully.
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-gray-900 transition-all duration-200"
        >
          Back to Home
        </Link>
        <div className="mt-6 text-sm text-gray-400">
          You will receive a confirmation email soon.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSuccess;
