import React from "react";
import { RiCustomerService2Line,RiExchange2Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
// import { RiExchange2Fill } from "react-icons/ri";

// import { RiCustomerService2Line } from "react-icons/ri";
const features = [
  {
    title: "Easy Exchange Policy",
    description: "We offer hassle free exchange policy",
    icon: <RiExchange2Fill/>, // You can replace with a proper icon or use an SVG
  },
  {
    title: "7 Days Return Policy",
    description: "We provide 7 days free return policy",
    icon: <FaCheck/>,
  },
  {
    title: "Best customer support",
    description: "We provide 24/7 customer support",
    icon: <RiCustomerService2Line/>,
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-white py-12 mt-8 px-4 md:px-20 text-center">
      {/* Feature Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-4xl mb-4">{feature?.icon}</div>
            <h3 className="text-lg font-bold">{feature?.title}</h3>
            <p className="text-gray-500 font-semibold">{feature?.description}</p>
          </div>
        ))}
      </div>

      {/* Subscription */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Subscribe now & get 20% off</h2>
        <p className="text-gray-500 mb-4 font-semibold">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 p-2 border font-semibold border-gray-300 rounded-l-md focus:outline-none"
          />
          <button className="w-full sm:w-auto font-bold cursor-pointer bg-black text-white px-4 py-2 rounded-r-md mt-2 sm:mt-0">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
