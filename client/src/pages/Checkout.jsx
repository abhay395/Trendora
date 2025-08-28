import { useNavigate } from 'react-router-dom'
import Stepper from '../componente/Stepper';
import useCartStore from '../store/cartStore';
import AddressSection from '../componente/AddressSection';
import PaymentSection from '../componente/PaymentSection';
import useOrderStore from '../store/orderStore';
import { motion } from 'framer-motion'
import useProductStore from '../store/productStore';
import toast from 'react-hot-toast';
import { useState } from 'react';
export default function Checkout() {
    const { cart } = useCartStore()
    const { checkoutProduct } = useOrderStore();
    const { fetchProducts } = useProductStore();
    const [selectedAddress, setSelectedAdress] = useState(null);
    const [selectedPaymentMode, setPaymentMode] = useState('cash')
    const discount = 2.5;
    let selectedProduct = cart.filter((item) => item.selected)
    let totalPrice = selectedProduct.reduce((sum, item) => sum + [...item.productId.sizes].find((size) => size.size == item.size).price * item.quantity, 0)

    let checkOutHandler = async () => {
        if (!selectedAddress) {
            toast.error("Please select Address")
            return
        }
        const id = await checkoutProduct()
        if (id) {
            fetchProducts()
            navigate(`/payment-done/${id}`)
        }
    }
    const navigate = useNavigate();
    return (
        <motion.div
            className=" bg-white min-h-screen my-8 pt-17">
            <div className='mb-7'>
                <Stepper currentStep={2} />
            </div>
            <div className="max-w-[90rem] mx-auto grid grid-cols-3 pl-4 min-w-[77rem] ">
                {/* Left Section */}
                <div className="col-span-2 space-y-5 flex items-center flex-col w-[90%]">
                    {/* <h2 className="text-xl font-semibold mb-7">Cart</h2> */}
                    <AddressSection select={selectedAddress} setSelect={setSelectedAdress} />
                    <PaymentSection paymentMode={selectedPaymentMode} setPaymentMode={setPaymentMode} />
                </div>

                {/* Right Section */}
                <div className="col-span-1 w-[31rem] ">
                    <div className='mb-4'>
                        <span className='font-semibold text-lg text-gray-900'>Order Summary</span>
                    </div>
                    <div className="flex flex-col w-full items-center justify-center pt-2 rounded-xl border border-gray-200 ">
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
                            // </div>
                        ))}
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
                                                <span>${[...item.productId.sizes].find((size) => size.size == item.size).price * item.quantity}</span>
                                            </div>))}
                                            <div className="flex justify-between">
                                                <span>Coupon discount</span>
                                                <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                                            </div>
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

                                <button onClick={checkOutHandler} className="w-full bg-black text-white py-3 rounded-xl font-semibold cursor-pointer">
                                    Place order →
                                </button>
                            </div>) : null
                    }
                </div>
            </div>
        </motion.div>
    );
}
