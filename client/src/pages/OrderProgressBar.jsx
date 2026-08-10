import React from "react";
import { CheckCircle2, Package, Truck, Home, Clock } from "lucide-react";

/**
 * OrderProgress Component
 * Props:
 *  currentStep: number (0-based index of current step)
 */
export default function OrderProgressBar({ currentStep }) {
  
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
        <div key={step.key} className="flex flex-col items-center relative flex-1">
          {/* Circle with icon */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2
              ${index <= currentStep ? "bg-black border-black text-white" : "bg-white border-gray-300 text-gray-400"}`}
          >
            {index < currentStep ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              step.icon
            )}
          </div>

          {/* Label */}
          <div
            className={`mt-2 text-center text-[10px] font-black uppercase tracking-widest
              ${index <= currentStep ? "text-black" : "text-gray-400"}`}
          >
            {step.title}
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`absolute left-1/2 top-5 -translate-y-1/2 h-0.5 w-full -z-10
                ${index < currentStep ? "bg-black" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
