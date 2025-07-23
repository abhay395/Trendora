import React, { useEffect, useState } from 'react';
import { TbTruckDelivery } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdDiscount } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import Stepper from '../componente/Stepper';
import useCartStore from '../store/cartStore';
import CartEmpty from './CartEmpty';
// const products = [
//   {
//     id: 1,
//     title: "Classic White T-Shirt",
//     description: "100% cotton, slim fit, breathable and lightweight.",
//     price: 499,
//     originalPrice: 799,
//     image: "https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/t/v/c/xl-kcsh-fo-1647-wh-fubar-original-imah4zensmpmzgbn.jpeg?q=70&crop=false",
//     category: "Men"
//   },
//   {
//     id: 2,
//     title: "Men’s Denim Jacket",
//     description: "Stylish blue denim jacket for casual wear.",
//     price: 1899,
//     originalPrice: 2499,
//     image: "https://campussutra.com/cdn/shop/files/JKDENIMP02_M_PLN_NBU_1_80a9e6ee-5622-456b-82f5-a2fb3e18f9f8.jpg?v=1728974706&width=800",
//     category: "Men"
//   },
//   {
//     id: 3,
//     title: "Floral Summer Dress",
//     description: "Light and breezy dress perfect for summer outings.",
//     price: 1399,
//     originalPrice: 1999,
//     image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
//     category: "Women"
//   },
//   {
//     id: 4,
//     title: "Women’s Beige Coat",
//     description: "Elegant coat with a warm inner lining for winter.",
//     price: 2999,
//     originalPrice: 3799,
//     image: "https://m.media-amazon.com/images/I/61OWk8KmCWL._SY879_.jpg",
//     category: "Women"
//   },
// ];

export default function Cart() {
  const [allSelected, setAllSelected] = useState(false);
  const [coupon, setCoupon] = useState('MAX500');
  const discount = 2.5;
  const navigate = useNavigate();

  // function related to cart  Store 
  const { isLoading, cart, removeProductFromCart, updateProductQuantity, selectProduct, selectAllProduct } = useCartStore()
  const removeProduct = (cartId) => {
    removeProductFromCart(cartId);
  }
  let selectedProduct = cart?.filter((item) => item.selected)
  //? This function handle Cart Product Quanitiy
  const [disable, setDisable] = useState(false);
  const updateQuanitiy = (cartId, increase = false) => {
    let selectedCart = cart.find(item => item._id === cartId);
    const size = selectedCart.size;
    const sizes = selectedCart.productId.sizes;
    let quantity = selectedCart.quantity
    const availableQty = sizes?.[String(size).toUpperCase()];
    if (increase) {
      if (quantity <= availableQty) {
        quantity++
      } else {
        return;
      }
    } else {
      if (quantity > 1) quantity--
      else return
    }
    if (disable) return;
    setDisable(true)
    updateProductQuantity({ cartId, quantity })
    setTimeout(() => {
      setDisable(false)
    }, 600)
  }
  const selectToggle = (cartId, selected) => {
    selectProduct(cartId, selected)
  }
  const selectAllToggle = (selected) => {
    setAllSelected(selected)
    selectAllProduct(selected);
  }
  useEffect(() => {
    if (selectedProduct.length == cart.length) {
      setAllSelected(true)
    } else {
      setAllSelected(false)
    }
  }, [cart])
  if (isLoading) return <div className='h-screen flex justify-center items-center'>...Loading</div>
  if (cart.length == 0) return <CartEmpty />
  return (
    <div className=" bg-white min-h-screen my-8 pt-17">
      <div className='mb-7'>
        <Stepper currentStep={1} />
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-16  min-w-[77rem] ">
        {/* Left Section */}
        <div className="md:col-span-2 w-full">
          {/* <h2 className="text-xl font-semibold mb-7">Cart</h2> */}
          <div className='flex space-x-2 mb-3'>
            <label
              htmlFor="item-all"
              className="flex cursor-pointer flex-row items-center gap-2.5 text-white light:text-black"
            >
              <input
                checked={allSelected}
                onChange={() => {
                  selectAllToggle(!allSelected)
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
            <span className='font-semibold text-lg  text-gray-700'>{selectedProduct.length}/{cart.length} items selected</span>
          </div>
          <div className="bg-white px-4 pt-2 rounded-xl border border-gray-200">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-4 relative border-b-gray-100 border-b"
              >
                <div className="flex  items-stretch gap-4 justify-center ">
                  <div className='relative  rounded-lg overflow-hidden'>
                    <label
                      htmlFor={`item-${item._id}`}
                      className="flex flex-row cursor-pointer items-center gap-2.5 text-white light:text-black absolute top-2 left-2"
                    >
                      <input
                        checked={item.selected}
                        onChange={() => {
                          let selected = item.selected
                          selectToggle(item._id, !selected)
                        }}
                        id={`item-${item._id}`}
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
                    <img src={item.productId.images[0].url} alt={item.productId.title} className="w-45 h-30 object-cover object-top" />
                  </div>
                  <div className='h-full space-y-1'>
                    <h4 className="font-semibold text-lg text-gray-800">{item.productId.title}</h4>
                    <p className="text-md font-semibold text-gray-500 flex items-center space-x-1"><span>{item.productId.gender} </span> <span><LuDot />
                    </span>{<TbTruckDelivery className='text-xl' />
                      }
                      <span>Express delivery in <span className='text-gray-700 font-bold'> 3 days</span></span></p>
                    <p className='font-semibold text-gray-600'>Size : <span className='font-bold text-gray-800'>{item.size}</span></p>
                    <p className="mt-4 text-lg font-bold text-gray-800"><span className='text-gray-400 text-xl mr-1'>₹</span>{item.productId.price.toFixed(2)}</p>
                  </div>
                </div>
                <RxCross2 className='absolute font-bold top-5 right-0 text-xl text-gray-500 cursor-pointer' onClick={() => removeProduct(item._id)} />
                <div className="absolute right-0 bottom-4 flex items-center gap-2 ">
                  <button onClick={() => updateQuanitiy(item._id, true)} className="px-2 py-2 bg-gray-50 text-gray-600 rounded cursor-pointer"><TiPlus /></button>
                  <span className='text-gray-600 font-bold'>{item.quantity}</span>
                  <button onClick={() => updateQuanitiy(item._id, false)} className="px-2 py-2 bg-gray-50 text-gray-600 rounded cursor-pointer"><TiMinus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[100%]">
          <div className="p-0 rounded-xl">
            <h3 className="font-semibold text-gray-600 mb-3 text-[1.3rem]">Coupons</h3>
            <div className="flex items-center justify-between border-gray-300 border p-3 rounded-xl">
              <p className='font-semibold text-gray-700 flex  items-center w-[40%] space-x-2 text-lg'><MdDiscount className='text-lg mt-1' /> <span>Coupans</span>
              </p>
              <div className='flex justify-center items-center gap-x-2'>
                <span className="text-md font-semibold text-green-600">{coupon}</span>
                <RxCross2 className='text-lg cursor-pointer text-gray-500' />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3 relative">
            <h3 className="font-semibold text-gray-700 text-[1.2rem]">Gifting</h3>
            <div className='space-y-4 bg-[#f5f2fe] py-4 rounded-xl flex gap-x-4 items-center justify-center flex-row-reverse'>
              <div>
                <FaGift className="text-[84px] text-indigo-500 " />
              </div>
              <div className='space-y-5'>
                <p className="text-lg font-semibold text-gray-800 mb-1">
                  Buying for a loved one?
                </p>
                <p className="text-sm text-gray-600 mt-2 mb-1">
                  Send Persnalized message in 20$
                </p>
                <Link to={'/'} className="text-indigo-600 text-md font-semibold mt-6">
                  Add gift wrap
                </Link>
              </div>
            </div>
          </div>

          {
            selectedProduct.length > 0 ? (<div className='space-y-4 mt-4'>
              <h3 className="font-semibold text-gray-700 text-[1.2rem]">Price Details</h3>
              <div className="bg-[#f5f2fe] p-4 rounded-xl ">
                <div className="text-sm space-y-4 text-gray-500">
                  <div className="flex justify-between text-[1rem] font-semibold text-gray-700">
                    <span>1 item</span>
                    {/* <span>${selectedItemId[0]?.price?.toFixed(2)}</span> */}
                  </div>
                  <div className='space-y-3 font-medium'>
                    {
                      selectedProduct.map((item) => {
                        return <div key={item._id} className="flex justify-between">
                          <span>{item.quantity} X {item.productId.title}</span>
                          <span>₹{item.totalPrice}</span>
                        </div>
                      })
                    }
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
                      <span>${(selectedProduct.reduce((sum, item) => sum + item.totalPrice, 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/checkout')} className="w-full bg-black text-white py-3 rounded-xl font-semibold cursor-pointer">
                Place order →
              </button>
            </div>) : null
          }
        </div>
      </div>
    </div>
  );
}
