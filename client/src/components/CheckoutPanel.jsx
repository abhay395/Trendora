import { useNavigate } from 'react-router-dom'
import AddressSection from './AddressSection';
import PaymentSection from './PaymentSection';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners'
import { checkoutProductApi, verifyPaymentApi } from '../api/orderApi';

const razorPayKey = import.meta.env.RAZORPAY_KEY_ID

export default function CheckoutPanel({ selectedItems, onBack }) {
    const [selectedAddress, setSelectedAdress] = useState(null);
    const [paymentMode, setPaymentMode] = useState('')
    const [loading, setLoading] = useState(false)
    const totalPrice = selectedItems.reduce((sum, item) => sum + [...item.productId.sizes].find((size) => size.size == item.size).price * item.quantity, 0)
    const navigate = useNavigate();

    async function checkOutHandler() {
        try {
            if (!selectedAddress) {
                toast.error("Please select Address")
                return
            }
            if (paymentMode == "") {
                toast.error("Please select Payment method")
                return
            }
            setLoading(true)
            const response = await checkoutProductApi({ paymentMethod: paymentMode })
            if (paymentMode == "COD") {
                const orderId = response._id
                navigate(`/payment-done/${orderId}`)
                return;
            }
            const razorpayorder = response.data.result
            const { selectedProduct,
                totalPrice,
                amount, currency, id, } = razorpayorder

            const options = {
                key: razorPayKey,
                amount: amount,
                currency: currency,
                name: "Trendora Shop",
                description: "Payment for your order",
                order_id: id,
                handler: async function (response) {
                    try {
                        setLoading(true)
                        const res = await verifyPaymentApi({
                            ...response,
                            selectedProduct,
                            totalPrice,
                            selectedAddress: selectedAddress,
                            paymentMethod: paymentMode
                        })
                        setLoading(false)
                        const orderId = res.data.result._id
                        toast.success('Your Payment done successfully')
                        navigate(`/payment-done/${orderId}`)
                    } catch (error) {
                        setLoading(false)
                        toast.error("Payment Faild")
                    }
                },
                theme: {
                    color: "#000000",
                },
            };
            const razor = new window.Razorpay(options)
            razor.open()
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    return (
        <div className="max-w-6xl mx-auto relative">
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-black transition-colors text-gray-700 font-medium cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Cart</span>
            </button>

            {loading && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-white/60'>
                    <ClipLoader size={60} color='black' />
                </div>
            )}

            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-10 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-5 flex flex-col w-full">
                    <AddressSection select={selectedAddress} setSelect={setSelectedAdress} />
                    <PaymentSection paymentMode={paymentMode} setPaymentMode={setPaymentMode} />
                </div>

                {/* Right Section */}
                <div className="w-full">
                    <div className='mb-4'>
                        <span className='font-semibold text-lg text-gray-900'>Order Summary</span>
                    </div>
                    <div className="mb-6">
                        <div
                            className="flex flex-col w-full border border-gray-200 overflow-y-auto max-h-[26rem]
                         scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                        >
                            {selectedItems.map((item, index) => (
                                <div className='w-full' key={item._id}>
                                    <div className="flex items-start p-4 gap-4 w-full relative">
                                        <div className='h-24 w-24 sm:h-28 sm:w-36 flex-shrink-0 border border-gray-200'>
                                            <img src={item.productId.images[0].url} alt={item.productId.title} className="object-cover object-top h-full w-full" />
                                        </div>
                                        <div className='h-full space-y-2 relative min-h-24 w-full min-w-0'>
                                            <h4 className="font-bold text-[0.94rem] text-gray-800 truncate">{item.productId.title}</h4>
                                            <div className='flex flex-wrap items-center justify-between gap-2'>
                                                <p className="font-bold text-gray-800"><span className='text-gray-400 text-lg mr-1'>₹</span>{[...item.productId.sizes].find((size) => size.size == item.size).price.toFixed(2)}</p>
                                                <div className='flex items-center space-x-2'>
                                                    <span className='font-semibold text-gray-700 text-sm'>QTY :</span>
                                                    <span className='text-gray-600 font-bold'>{item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < selectedItems.length - 1 && <div className='border-b border-gray-200 mx-4'></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedItems.length > 0 && (
                        <div className='space-y-4'>
                            <h3 className="font-semibold text-gray-700 text-[1.2rem]">Price Details</h3>
                            <div className="border border-gray-200 p-4">
                                <div className="text-sm space-y-4 text-gray-500">
                                    <div className="flex justify-between text-[1rem] font-semibold text-gray-700">
                                        <span>{selectedItems.length} {selectedItems.length > 1 ? "items" : "item"}</span>
                                    </div>
                                    <div className='space-y-3 font-medium'>
                                        {selectedItems.map((item) => (
                                            <div className="flex justify-between gap-4" key={item._id}>
                                                <span className="truncate">{item.quantity} X {item.productId.title}</span>
                                                <span className="flex-shrink-0">₹{[...item.productId.sizes].find((size) => size.size == item.size).price * item.quantity}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between">
                                            <span>Delivery Charges</span>
                                            <span className="text-gray-700">Free Delivery</span>
                                        </div>
                                        <div className='border-t border-gray-200 my-5'></div>
                                        <div className="flex justify-between text-[1rem] text-black font-bold">
                                            <span>Total Amount</span>
                                            <span>₹{totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={checkOutHandler} disabled={loading} className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50">
                                Place order →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
