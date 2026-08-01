import React from "react";
import { RiCustomerService2Line, RiExchange2Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

const features = [
  {
    title: "Easy Exchange Policy",
    description: "Hassle-free exchanges for your peace of mind.",
    icon: (
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-100 via-yellow-50 to-white shadow-md mb-4">
        <RiExchange2Fill className="text-yellow-500 text-3xl" />
      </span>
    ),
  },
  {
    title: "7 Days Return Policy",
    description: "Enjoy 7 days of free returns on all orders.",
    icon: (
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-100 via-green-50 to-white shadow-md mb-4">
        <FaCheck className="text-green-500 text-3xl" />
      </span>
    ),
  },
  {
    title: "24/7 Customer Support",
    description: "We're here for you, anytime you need us.",
    icon: (
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-white shadow-md mb-4">
        <RiCustomerService2Line className="text-blue-500 text-3xl" />
      </span>
    ),
  },
];

const FeatureSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-14 rounded-3xl bg-gradient-to-r from-gray-100 via-white to-gray-100">
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md py-8 px-6 hover:shadow-xl transition-shadow duration-200"
          >
            {feature.icon}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-500 font-medium text-base">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Subscription */}
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-white via-gray-50 to-white rounded-2xl shadow p-8 flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Subscribe & <span className="text-yellow-500">Get 20% Off</span>
        </h2>
        <p className="text-gray-500 mb-5 font-medium text-center">
          Join our newsletter for exclusive deals, new arrivals, and style inspiration.
        </p>
        <form
          className="w-full flex flex-col sm:flex-row items-center gap-3"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black font-medium text-gray-700 bg-white shadow-sm transition"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-black text-white font-bold text-lg shadow hover:bg-gray-900 transition"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeatureSection;
