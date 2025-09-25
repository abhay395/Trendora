import React from "react";

function PaymentSection({ paymentMode, setPaymentMode }) {
    return (
        <div className="w-full">
            <div className="mb-4 text-left w-full">
                <span className="font-semibold text-lg text-gray-900">
                    Select a Payment Option
                </span>
            </div>

            <div className="flex flex-col w-full items-center justify-center space-y-4">
                {/* COD Option */}
                <div className="w-full py-3 flex flex-col border rounded-xl border-gray-200 px-5">
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="payment"
                            value="COD"
                            onChange={() => setPaymentMode("COD")}
                            checked={paymentMode === "COD"}
                            className="w-5 h-5 accent-black"
                            id="cod"
                        />
                        <label htmlFor="cod" className="cursor-pointer">
                            <p className="font-semibold text-[1.02rem] text-gray-800">
                                Cash on Delivery
                            </p>
                        </label>
                    </div>
                </div>

                {/* Razorpay Online Option */}
                <div className="w-full py-3 flex flex-col border rounded-xl border-gray-200 px-5">
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="payment"
                            value="ONLINE"
                            onChange={() => setPaymentMode("ONLINE")}
                            checked={paymentMode === "ONLINE"}
                            className="w-5 h-5 accent-black"
                            id="online"
                        />
                        <label htmlFor="online" className="cursor-pointer">
                            <p className="font-semibold text-[1.02rem] text-gray-800">
                                Pay Online (via Razorpay)
                            </p>
                        </label>
                    </div>
                    {paymentMode === "ONLINE" && (
                        <div className="mt-3 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                            You will be redirected to Razorpay’s secure payment page.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaymentSection;
