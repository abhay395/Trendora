import { useNavigate } from 'react-router-dom'
import Stepper from '../componente/Stepper';
import useCartStore from '../store/cartStore';
import { MoonLoader } from 'react-spinners';
import AddressSection from '../componente/AddressSection';
export default function Checkout() {
    const { cart, isLoading } = useCartStore()
    const discount = 2.5;
    let selectedProduct = cart.filter((item) => item.selected)
    let totalPrice = selectedProduct.reduce((sum, item) => sum + item.totalPrice, 0)
    const navigate = useNavigate();
    if (isLoading) return <div className='h-screen flex items-center justify-center'><MoonLoader color='#000' /></div>
    return (
        <div className=" bg-white min-h-screen my-8 pt-17">
            <div className='mb-7'>
                <Stepper currentStep={2} />
            </div>
            <div className="max-w-[90rem] mx-auto grid grid-cols-3 pl-4 min-w-[77rem] ">
                {/* Left Section */}
                <div className="col-span-2 space-y-5 flex items-center flex-col w-[90%]">
                    {/* <h2 className="text-xl font-semibold mb-7">Cart</h2> */}
                    <AddressSection />
                    <div className='w-full'>
                        <div className='mb-4  text-left w-full'>
                            <span className='font-semibold text-lg text-gray-900'>Select A Delivery Address</span>
                        </div>
                        <div className="flex flex-col w-full items-center justify-center space-y-4 ">
                            <div className='w-full space-y-2  pt-4 flex  flex-col border rounded-xl border-gray-200 px-5'>
                                <div className='flex items-center space-x-3'>
                                    <input type="radio" name='payment' className='w-5 h-5  accent-black' id='1' />
                                    <label htmlFor='1' className='space-y-2'>
                                        <p className='font-semibold text-[1.02rem] text-gray-800'>Debit/Card</p>
                                    </label>
                                </div>
                                {/* <div> */}
                                <form className=" bg-white px-10 py-6 space-y-6">
                                    {/* Name */}
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Lydia George"
                                            className="w-full border outline-none border-gray-300 px-4 py-2 rounded-lg"
                                        />
                                    </div>

                                    {/* Card Number */}
                                    <div className="flex flex-col space-y-1">
                                        <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number *</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            placeholder="2432 1234 3212 5321"
                                            className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none"
                                        />
                                    </div>

                                    {/* Expiry + CVV */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="expiry" className="text-sm font-medium text-gray-700">Expiry Date *</label>
                                            <input
                                                type="month"
                                                id="expiry"
                                                className="w-full border outline-none border-gray-300 px-4 py-2 rounded-lg"
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV *</label>
                                            <input
                                                type="password"
                                                id="cvv"
                                                placeholder="***"
                                                maxLength={3}
                                                className="w-full border outline-none border-gray-300 px-4 py-2 rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    {/* Save Card */}
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="saveCard" className="w-4 h-4 accent-black" />
                                        <label htmlFor="saveCard" className="text-sm text-gray-700">Save this card for later use</label>
                                    </div>
                                </form>

                                {/* </div> */}
                            </div>
                            {/* <div className='border-b w-full border-gray-300 my-4'></div> */}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-span-1 w-[31rem] ">
                    <div className='mb-4'>
                        <span className='font-semibold text-lg text-gray-900'>Order Summary</span>
                    </div>
                    <div className="flex flex-col w-full items-center justify-center pt-2 rounded-xl border border-gray-200 ">
                        {selectedProduct.map((item, index) => (
                            <div className='w-full'>
                                <div className="flex items-start py-4 pl-4  gap-4 w-full relative ">
                                    <div className='h-28 w-[15rem]  rounded-lg overflow-hidden'>
                                        <img src={item.productId.images[0].url} alt={item.productId.title} className="object-cover object-top h-full w-full " />
                                    </div>
                                    <div className='h-full space-y-2 relative min-h-30  w-full '>
                                        <h4 className="font-bold text-[0.94rem] text-gray-800">{item.productId.title}</h4>
                                        <p className="text-sm font-medium text-gray-500 flex items-center space-x-1">
                                            <span>Estimated delivery by <span className='text-gray-700 text-sm font-bold'>14 July 2025</span></span></p>
                                        <div className='flex items-center justify-between left-0 absolute bottom-2 right-4'>
                                            <p className="font-bold text-gray-800"><span className='text-gray-400 text-xl mr-1'>₹</span>{item.productId.price.toFixed(2)}</p>
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
                            (<div className='space-y-4 mt-4'>
                                <h3 className="font-semibold text-gray-700 text-[1.2rem]">Price Details</h3>
                                <div className="bg-[#f5f2fe] p-4 rounded-xl ">
                                    <div className="text-sm space-y-4 text-gray-500">
                                        <div className="flex justify-between text-[1rem] font-semibold text-gray-700">
                                            <span>{selectedProduct.length} item</span>
                                            {/* <span>${selectedItemId[0]?.price?.toFixed(2)}</span> */}
                                        </div>
                                        <div className='space-y-3 font-medium'>
                                            {selectedProduct.map((item) => (<div className="flex justify-between">
                                                <span>{item.quantity} X {item.productId.title} </span>
                                                <span>${item?.totalPrice?.toFixed(2)}</span>
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

                                <button onClick={() => navigate('/payment-done')} className="w-full bg-black text-white py-3 rounded-xl font-semibold cursor-pointer">
                                    Place order →
                                </button>
                            </div>) : null
                    }
                </div>
            </div>
        </div>
    );
}
