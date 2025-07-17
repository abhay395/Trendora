import React, { useState } from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdDiscount } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import Stepper from '../componente/Stepper';
const products = [
    {
        id: 1,
        title: "Classic White T-Shirt",
        description: "100% cotton, slim fit, breathable and lightweight.",
        price: 499,
        originalPrice: 799,
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/t/v/c/xl-kcsh-fo-1647-wh-fubar-original-imah4zensmpmzgbn.jpeg?q=70&crop=false",
        category: "Men"
    },
    {
        id: 2,
        title: "Men’s Denim Jacket",
        description: "Stylish blue denim jacket for casual wear.",
        price: 1899,
        originalPrice: 2499,
        image: "https://campussutra.com/cdn/shop/files/JKDENIMP02_M_PLN_NBU_1_80a9e6ee-5622-456b-82f5-a2fb3e18f9f8.jpg?v=1728974706&width=800",
        category: "Men"
    },
    {
        id: 3,
        title: "Floral Summer Dress",
        description: "Light and breezy dress perfect for summer outings.",
        price: 1399,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
        category: "Women"
    },
    {
        id: 4,
        title: "Women’s Beige Coat",
        description: "Elegant coat with a warm inner lining for winter.",
        price: 2999,
        originalPrice: 3799,
        image: "https://m.media-amazon.com/images/I/61OWk8KmCWL._SY879_.jpg",
        category: "Women"
    },
];

export default function Checkout() {
    const [selectedItemId, setSelectedItemId] = useState([{
        id: 1,
        title: "Classic White T-Shirt",
        description: "100% cotton, slim fit, breathable and lightweight.",
        price: 499,
        originalPrice: 799,
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/t/v/c/xl-kcsh-fo-1647-wh-fubar-original-imah4zensmpmzgbn.jpeg?q=70&crop=false",
        category: "Men"
    },
    {
        id: 2,
        title: "Men’s Denim Jacket",
        description: "Stylish blue denim jacket for casual wear.",
        price: 1899,
        originalPrice: 2499,
        image: "https://campussutra.com/cdn/shop/files/JKDENIMP02_M_PLN_NBU_1_80a9e6ee-5622-456b-82f5-a2fb3e18f9f8.jpg?v=1728974706&width=800",
        category: "Men"
    },
    {
        id: 3,
        title: "Floral Summer Dress",
        description: "Light and breezy dress perfect for summer outings.",
        price: 1399,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
        category: "Women"
    }])
    const [coupon, setCoupon] = useState('MAX500');
    const [allSelected, setAllSelected] = useState(false);
    // const selectedItem = products.find((item) => item.id === 0);
    const discount = 2.5;
    const delivery = 0;
    const total = 45;
    console.log(selectedItemId)
    const navigate = useNavigate();
    return (
        <div className=" bg-white min-h-screen my-8 pt-17">
            <div className='mb-7'>
                <Stepper currentStep={2} />
            </div>
            <div className="max-w-[90rem] mx-auto grid grid-cols-3 pl-4 min-w-[77rem] ">
                {/* Left Section */}
                <div className="col-span-2 space-y-5 flex items-center flex-col w-[90%]">
                    {/* <h2 className="text-xl font-semibold mb-7">Cart</h2> */}
                    <div className='w-full'>
                        <div className='mb-4  text-left w-full'>
                            <span className='font-semibold text-lg text-gray-900'>Select A Delivery Address</span>
                        </div>
                        <div className="flex flex-col w-full items-center justify-center px-5 py-5 rounded-xl border border-gray-200 ">
                            <div className='w-full space-y-2  pt-1 flex space-x-3 items-start'>
                                <input type="radio" name='address' className='w-5 h-5 mt-1 accent-black' id='1' />
                                <label htmlFor='1' className='space-y-2'>
                                    <p className='font-semibold text-[1.02rem] text-gray-800'>Lydia Geroge</p>
                                    <p className='text-[0.9rem] font-medium text-gray-500'>2345 Glacier View Dr, Eagle River, Alaska 9957, USA</p>
                                </label>
                            </div>
                            <div className='border-b w-full border-gray-300 my-4'></div>
                            <div className='w-full space-y-2  pt-1 flex space-x-3 items-start'>
                                <input type="radio" id='2' name='address' className='w-5 h-5 mt-1 accent-black' />
                                <label htmlFor='2' className='space-y-2'>
                                    <p className='font-semibold text-[1.02rem] text-gray-800'>Lydia Geroge</p>
                                    <p className='text-[0.9rem] font-medium text-gray-500'>2345 Glacier View Dr, Eagle River, Alaska 9957, USA</p>
                                </label>
                            </div>
                        </div>
                    </div>
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
                        {products.map((item, index) => (
                            // <div
                            //     key={item.id}
                            //     className="bg-amber-700 w-full py-4 my-2  relative border-b-gray-100 border-b"
                            // >
                            <div className='w-full'>
                                <div className="flex items-start py-4 pl-4  gap-4 w-full relative ">
                                    <div className='h-28 w-[15rem]  rounded-lg overflow-hidden'>
                                        <img src={item.image} alt={item.title} className="object-cover object-top h-full w-full " />
                                    </div>
                                    <div className='h-full space-y-2 relative min-h-30  w-full '>
                                        <h4 className="font-bold text-[0.94rem] text-gray-800">{item.title}</h4>
                                        <p className="text-sm font-medium text-gray-500 flex items-center space-x-1">
                                            <span>Estimated delivery by <span className='text-gray-700 text-sm font-bold'>14 July 2025</span></span></p>
                                        <div className='flex items-center justify-between left-0 absolute bottom-2 right-4'>
                                            <p className="font-bold text-gray-800"><span className='text-gray-400 text-xl mr-1'>$</span>{item.price.toFixed(2)}</p>
                                            <div className='flex items-center space-x-4'>
                                                <span className='font-medium text-gray-700'>QTY :</span>
                                                <div className="flex items-center gap-2 ">
                                                    <button className="px-2 py-2 bg-gray-50 text-gray-600 rounded cursor-pointer"><TiPlus /></button>
                                                    <span className='text-gray-600 font-bold'>1</span>
                                                    <button className="px-2 py-2 bg-gray-50 text-gray-600 rounded cursor-pointer"><TiMinus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    index < products.length - 1 ? <div className='border-b border-gray-300 mx-5'></div> : null
                                }
                            </div>
                            // </div>
                        ))}
                    </div>
                    {
                        selectedItemId.length ? (<div className='space-y-4 mt-4'>
                            <h3 className="font-semibold text-gray-700 text-[1.2rem]">Price Details</h3>
                            <div className="bg-[#f5f2fe] p-4 rounded-xl ">
                                <div className="text-sm space-y-4 text-gray-500">
                                    <div className="flex justify-between text-[1rem] font-semibold text-gray-700">
                                        <span>1 item</span>
                                        {/* <span>${selectedItemId[0]?.price?.toFixed(2)}</span> */}
                                    </div>
                                    <div className='space-y-3 font-medium'>
                                        <div className="flex justify-between">
                                            <span>1 X Classic t-shirt</span>
                                            <span>${selectedItemId[0]?.price?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Coupon discount</span>
                                            <span className="text-green-600">-${discount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Delivery Charges</span>
                                            <span className="text-gray-700">Free Delivery</span>
                                        </div>
                                        {/* <hr className="my-4" /> */}
                                        <div className='border border-gray-300 my-5'></div>
                                        <div className="flex justify-between text-[1rem] text-gray-700 font-semibold">
                                            <span>Total Amount</span>
                                            <span>${(total + delivery).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={()=>navigate('/payment-done')} className="w-full bg-black text-white py-3 rounded-xl font-semibold cursor-pointer">
                                Place order →
                            </button>
                        </div>) : null
                    }
                </div>
            </div>
        </div>
    );
}
