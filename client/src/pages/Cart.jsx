import React, { useState } from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { TiMinus, TiPlus } from "react-icons/ti";

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

export default function Cart() {
  const [selectedItemId, setSelectedItemId] = useState([])
  const [coupon, setCoupon] = useState('MAX500');
  const [allSelected, setAllSelected] = useState(false);
  // const selectedItem = products.find((item) => item.id === 0);
  const discount = 2.5;
  const delivery = 0;
  const total = 45;
  console.log(selectedItemId)

  return (
    <div className="p-8 bg-gray-50 min-h-screen mt-8 pt-30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-24  min-w-7xl ">
        {/* Left Section */}
        <div className="md:col-span-2 w-full ">
          {/* <h2 className="text-xl font-semibold mb-7">Cart</h2> */}
          <div className='flex space-x-2 mb-2'>
            <label
              htmlFor="item-all"
              className="flex cursor-pointer flex-row items-center gap-2.5 text-white light:text-black"
            >
              <input
                checked={allSelected === true}
                onChange={() => {
                  let toggleforAll = !allSelected
                  setAllSelected(toggleforAll)
                  if (toggleforAll) {
                    // let selectedId = products.map((item) => item.id)
                    setSelectedItemId([...products])
                  } else {
                    setSelectedItemId([]);
                  }
                }}
                id={`item-all`}
                type="checkbox"
                className="peer hidden"
              />
              <div
                className="h-5 w-5 flex rounded-md border border-[#a2a1a833] bg-white peer-checked:bg-gray-800 transition"
              >
                <svg
                  fill="none"
                  viewBox="0 0 25 25"
                  className="w-5 h-5 stroke-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>
            <span className='font-bold text-lg  text-gray-900'>1/4 items selected</span>
          </div>
          <div className="bg-white px-4 pt-2 rounded-xl shadow">
            {products.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 relative border-b-gray-100 border-b"
              >
                <div className="flex  items-stretch gap-4 justify-center ">
                  <div className='relative  rounded-lg overflow-hidden'>
                    {/* <input
                      type="checkbox"
                      className='absolute left-5 bottom-0'
                      checked={selectedItemId.includes(item.id)}
                      onChange={() => setSelectedItemId(...selectedItem, item.id)}
                    /> */}
                    {/* <!-- From Uiverse.io by gamerlord295 --> */}
                    <label
                      htmlFor={`item-${item.id}`}
                      className="flex flex-row cursor-pointer items-center gap-2.5 text-white light:text-black absolute top-2 left-2"
                    >
                      <input
                        checked={selectedItemId.some(el => el.id == item.id)}
                        onChange={() => {
                          let updatedid = [];
                          if (selectedItemId.some(el => el.id == item.id)) {
                            updatedid = selectedItemId.filter((el) => el.id != item.id)
                            setSelectedItemId(updatedid)
                            setAllSelected(false);
                          } else {
                            updatedid = [...selectedItemId, item]
                            setSelectedItemId(updatedid);
                            console.log(updatedid.length === products.length)
                            setAllSelected(updatedid.length === products.length)
                          }
                        }}
                        id={`item-${item.id}`}
                        type="checkbox"
                        className="peer hidden"
                      />
                      <div
                        className="h-5 w-5 flex rounded-md border border-[#a2a1a833] bg-white peer-checked:bg-gray-800 transition"
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 25 25"
                          className="w-5 h-5 stroke-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 12.6111L8.92308 17.5L20 6.5"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </label>
                    <img src={item.image} alt={item.title} className="w-45 h-30 object-cover object-top" />
                  </div>
                  <div className='h-full space-y-1'>
                    <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
                    <p className="text-md font-semibold text-gray-500 flex items-center space-x-1"><span>Girl </span> <span><LuDot />
                    </span>{<TbTruckDelivery className='text-xl' />
                      }
                      <span>Express delivery in <span className='text-gray-700 font-bold'> 3 days</span></span></p>
                    <p className="mt-6 text-lg font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <RxCross2 className='absolute top-6 right-0 text-xl text-gray-500 cursor-pointer' />
                <div className="absolute right-0 bottom-5 flex items-center gap-2 ">
                  <button className="px-2 py-2 bg-gray-50 text-gray-600 rounded cursor-pointer"><TiPlus /></button>
                  <span className='text-gray-600 font-bold'>1</span>
                  <button className="px-2 py-2 bg-gray-50 text-gray-600 rounded cursor-pointer"><TiMinus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Coupons</h3>
            <div className="flex items-center justify-between border p-2 rounded">
              <span className="text-sm">{coupon}</span>
              <RxCross2 />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Gifting</h3>
            <p className="text-sm text-gray-500 mb-1">
              Buying for a loved one?
            </p>
            <a href="#" className="text-indigo-600 text-sm font-medium">
              Add gift wrap
            </a>
          </div>

          {
            selectedItemId.length ? (<div className='space-y-4'>
              <div className="bg-white p-4 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Price Details</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>1 item</span>
                    <span>${selectedItemId[0]?.price?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coupon discount</span>
                    <span className="text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">Free Delivery</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>${(total + delivery).toFixed(2)}</span>
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
