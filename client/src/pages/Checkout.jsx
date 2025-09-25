import { useNavigate } from 'react-router-dom'
import Stepper from '../componente/Stepper';
import useCartStore from '../store/cartStore';
import AddressSection from '../componente/AddressSection';
import PaymentSection from '../componente/PaymentSection';
import useOrderStore from '../store/orderStore';
import { motion } from 'framer-motion'
import toast from 'react-hot-toast';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners'
import { checkoutProductApi, verifyPaymentApi } from '../api/orderApi';
const razorPayKey = import.meta.env.RAZORPAY_KEY_ID
export default function Checkout() {
    const { cart } = useCartStore()
    const [selectedAddress, setSelectedAdress] = useState(null);
    const [paymentMode, setPaymentMode] = useState('')
    const [Loading, setLoading] = useState(false)
    const discount = 2.5;
    let selectedProduct = cart.filter((item) => item.selected)
    let totalPrice = selectedProduct.reduce((sum, item) => sum + [...item.productId.sizes].find((size) => size.size == item.size).price * item.quantity, 0)
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
            // toast.loading("Redircting to Payment Method")
            setLoading(true)
            const response = await checkoutProductApi({ paymentMethod: paymentMode })
            // return
            if (paymentMode == "COD") {
                const orderId = response.data.result._id
                navigate(`/payment-done/${orderId}`)
                return;
            }
            const razorpayorder = response.data.result
            const { selectedProduct,
                totalPrice,
                amount, currency, id, } = razorpayorder
            // const order = response.result

            const options = {
                key: "rzp_test_RL8vVmMkvsQpjg",
                amount: amount,
                currency: currency,
                name: "Trendora Shop",
                description: "Payment for your order",

                order_id: id,
                handler: async function (response) {
                    try {
                        console.log(response)
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
                    color: "#FF5733",
                },
            };
            const razor = new window.Razorpay(options)
            razor.open()
            // setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }
    // if (true) return <div className='flex items-center justify-center h-screen bg-transparent'> <CircleLoader /></div>
    return (
        <motion.div
            className=" bg-white min-h-screen my-8 pt-0  relative">
            <button
                onClick={() => window.history.back()} // go back
                className="absolute top-0 left-35 flex items-center space-x-2 px-4 py-2 
             bg-white border border-gray-200 rounded-lg cursor-pointer 
             hover:bg-gray-100 transition-all duration-200 
             text-gray-700 font-medium"
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
                <span>Back</span>
            </button>
            <div className={`mb-30 ${Loading ? "opacity-50" : ""} `}>
                <Stepper currentStep={2} />
            </div>
            {
                Loading && <div className='flex items-center justify-center absolute top-1/2 left-1/2 z-99 bg-transparent'> <ClipLoader size={60} color='black' /> </div>
            }
            <div className={`max-w-[90rem] mx-auto grid grid-cols-3 pl-4 min-w-[77rem] ${Loading ? "opacity-50" : ""}`}>

                {/* Left Section */}
                <div className="col-span-2 space-y-5 flex items-center flex-col w-[90%]">
                    {/* <h2 className="text-xl font-semibold mb-7">Cart</h2> */}
                    <AddressSection select={selectedAddress} setSelect={setSelectedAdress} />
                    <PaymentSection paymentMode={paymentMode} setPaymentMode={setPaymentMode} />
                </div>

                {/* Right Section */}
                <div className="col-span-1 w-[31rem] ">
                    <div className='mb-4'>
                        <span className='font-semibold text-lg text-gray-900'>Order Summary</span>
                    </div>
                    <div className="mb-6">
                        {/* <h3 className="font-semibold text-lg text-gray-900 mb-3">Order Summary</h3> */}
                        <div
                            className="flex flex-col w-full pt-2 rounded-xl border border-gray-200 
                         bg-white shadow-sm overflow-y-auto max-h-[26rem] 
                         scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                        >
                            {selectedProduct.map((item, index) => (
                                <div className='w-full' key={index}>
                                    <div className="flex items-start py-4 pl-4  gap-4 w-full relative ">
                                        <div className='h-28 w-[15rem]  rounded-lg overflow-hidden'>
                                            <img src={item.productId.images[0].url} alt={item.productId.title} className="object-cover object-top h-full w-full " />
                                        </div>
                                        <div className='h-full space-y-2 relative min-h-30  w-full '>
                                            <h4 className="font-bold text-[0.94rem] text-gray-800">{item.productId.title.slice(0, 30)}...</h4>
                                            <p className="text-sm font-medium text-gray-500 flex items-center space-x-1">
                                                <span>Estimated delivery by <span className='text-gray-700 text-sm font-bold'>14 July 2025</span></span></p>
                                            <div className='flex items-center justify-between left-0 absolute bottom-2 right-4'>
                                                <p className="font-bold text-gray-800"><span className='text-gray-400 text-xl mr-1'>₹</span>{[...item.productId.sizes].find((size) => size.size == item.size).price.toFixed(2)}</p>
                                                <div className='flex items-center space-x-4 pr-7'>
                                                    <span className='font-semibold text-gray-700'>QTY :</span>
                                                    {/* <div className="flex items-center gap-2 "> */}
                                                    <span className='text-gray-600 font-bold'>{item.quantity}</span>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        index < selectedProduct.length - 1 ? <div className='border-b border-gray-300 mx-5'></div> : null
                                    }
                                </div>
                            ))}
                        </div>
                    </div>

                    {
                        selectedProduct.length > 0 ?
                            (<div className='space-y-4 mt-4' >
                                <h3 className="font-semibold text-gray-700 text-[1.2rem]">Price Details</h3>
                                <div className="bg-[#f5f2fe] p-4 rounded-xl ">
                                    <div className="text-sm space-y-4 text-gray-500">
                                        <div className="flex justify-between text-[1rem] font-semibold text-gray-700">
                                            <span>{selectedProduct.length} item</span>
                                            {/* <span>${selectedItemId[0]?.price?.toFixed(2)}</span> */}
                                        </div>
                                        <div className='space-y-3 font-medium'>
                                            {selectedProduct.map((item) => (<div className="flex justify-between" key={item._id}>
                                                <span>{item.quantity} X {item.productId.title} </span>
                                                <span>₹{[...item.productId.sizes].find((size) => size.size == item.size).price * item.quantity}</span>
                                            </div>))}
                                            {/* <div className="flex justify-between">
                                                <span>Coupon discount</span>
                                                <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                                            </div> */}
                                            <div className="flex justify-between">
                                                <span>Delivery Charges</span>
                                                <span className="text-gray-700">Free Delivery</span>
                                            </div>
                                            {/* <hr className="my-4" /> */}
                                            <div className='border border-gray-300 my-5'></div>
                                            <div className="flex justify-between text-[1rem] text-gray-700 font-semibold">
                                                <span>Total Amount</span>
                                                <span>₹{(totalPrice).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={checkOutHandler} disabled={Loading} className="w-full  bg-black text-white py-3 rounded-xl font-semibold cursor-pointer">
                                    Place order →
                                </button>
                            </div>) : null
                    }
                </div>
            </div>
        </motion.div>
    );
}
