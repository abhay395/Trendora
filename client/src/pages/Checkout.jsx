import React, { useState } from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdDiscount } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import { Link } from 'react-router-dom'
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

    return (
        <div className=" bg-white min-h-screen my-8 pt-17">
            <div className='mb-7'>
                <Stepper currentStep={2} />
            </div>
            <div className="max-w-[90rem] mx-auto grid grid-cols-3 gap-x-10  min-w-[77rem] ">
                {/* Left Section */}
                <div className="col-span-2  w-full ">
                    {/* <h2 className="text-xl font-semibold mb-7">Cart</h2> */}
                    <div className=''>
                        <span className='font-semibold text-lg text-gray-900'>Select A Delivery Address</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-span-1 w-[90%]">
                    <div className="flex flex-col items-center pt-2 rounded-xl border border-gray-200 ">
                        {products.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-4 relative border-b-gray-100 border-b"
                            >
                                <div className="flex items-stretch gap-4 justify-center relative">
                                    <div className=' h-26 w-36 bg-amber-300 rounded-lg overflow-hidden'>
                                        <img src={item.image} alt={item.title} className="object-cover object-top h-full w-full " />
                                    </div>
                                    <div className='h-full space-y-1'>
                                        <h4 className="font-semibold text-sm text-gray-800">{item.title}</h4>
                                        <p className="text-sm font-semibold text-gray-500 flex items-center space-x-1"><span>Girl </span>
                                            <span>Express delivery in <span className='text-gray-700 font-bold'> 3 days</span></span></p>
                                        <div className='flex items-center justify-between w-[60%]  absolute bottom-0'>
                                            <p className="font-bold text-gray-800"><span className='text-gray-400 text-xl mr-1'>$</span>{item.price.toFixed(2)}</p>
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

                            <button className="w-full bg-black text-white py-3 rounded-xl font-semibold cursor-pointer">
                                Place order →
                            </button>
                        </div>) : null
                    }
                </div>
            </div>
        </div>
    );
}
