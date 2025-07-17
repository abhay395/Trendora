import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  // const navigate = useNavigate();
  return (
    <div className="flex items-center space-y-8 flex-col justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center border border-gray-200">
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6 " />
        <h2 className="text-3xl font-bold mb-3 tracking-tight">Payment Successful!</h2>
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
      </div>
    </div>
  );
};

export default PaymentSuccess;
