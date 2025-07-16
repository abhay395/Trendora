import React from "react";

const Stepper = ({ currentStep }) => {
    const steps = ["Cart", "Address", "Payment"];

    return (
        <div className="flex items-center justify-between w-full max-w-xl mx-auto">
            {steps.map((label, index) => {
                const stepNum = index + 1;
                const isActive = currentStep === stepNum;
                const isCompleted = currentStep >= stepNum;

                return (
                    <div key={label} className="flex-1 flex items-center ">
                        {/* Line before circle (except first) */}
                        {index !== 0 && (
                            <div className={`h-0.5 flex-2 bg-gray-300 ${isCompleted ? "bg-gray-700" : ""} border-gray-300 mb-8`} />
                        )}

                        <div className="flex flex-col items-center">
                            {/* Step circle */}
                            <div
                                className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium
                  ${isCompleted ? "bg-black text-white" : "border border-gray-300 text-gray-700 bg-white"}
                `}
                            >
                                {stepNum}
                            </div>
                            {/* Step label */}
                            <span className={`mt-2 text-sm ${isCompleted ? "font-semibold text-black" : "text-gray-600"}`}>
                                {label}
                            </span>
                        </div>
                        {/* Line after circle (except last) */}
                        {index !== steps.length - 1 && (
                            <div className={`h-0.5 bg-gray-300 ${isCompleted ? "bg-gray-700" : ""} flex-2 border-gray-300 mb-8`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;
