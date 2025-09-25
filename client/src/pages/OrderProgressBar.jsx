import React from "react";
import { CheckCircle2, Package, Truck, Home, Clock } from "lucide-react";

/**
 * OrderProgress Component
 * Props:
 *  currentStep: number (0-based index of current step)
 */
export default function OrderProgressBar({ currentStep }) {
  console.log(currentStep)
  // Define steps with icons
  const steps = [
    { key: "confirmed", title: "Confirmed", icon: <Clock className="w-5 h-5" /> },
    { key: "packed", title: "Packed", icon: <Package className="w-5 h-5" /> },
    { key: "shipped", title: "Shipped", icon: <Truck className="w-5 h-5" /> },
    { key: "delivered", title: "Delivered", icon: <Home className="w-5 h-5" /> },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto p-6">
      {steps.map((step, index) => (
        <div key={step.key} className="flex flex-col items-center relative">
          {/* Circle with icon */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white 
              ${index <= currentStep ? "bg-green-600" : "bg-gray-300"}`}
          >
            {index < currentStep ? (
              <CheckCircle2 className="w-6 h-6 text-white" />
            ) : (
              step.icon
            )}
          </div>

          {/* Label */}
          <div
            className={`mt-2 text-center text-sm font-medium 
              ${index <= currentStep ? "text-green-700" : "text-gray-500"}`}
          >
            {step.title}
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`absolute left-full top-5 -translate-y-1/2 h-0.5 w-full 
                ${index < currentStep ? "bg-green-600" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
