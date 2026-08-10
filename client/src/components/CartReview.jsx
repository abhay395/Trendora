import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { TiMinus, TiPlus } from "react-icons/ti";
import { AnimatePresence, motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useRemoveProductFromCart, useSelectAllProduct, useSelectProduct, useUpdateProductQuantity } from '../hooks/useCart';
import toast from 'react-hot-toast';

export default function CartReview({ cart, onContinue }) {
  const [allSelected, setAllSelected] = useState(false);

  const { mutateAsync: updateProductQuantity } = useUpdateProductQuantity();
  const { mutateAsync: selectProduct } = useSelectProduct();
  const { mutateAsync: selectAllProduct } = useSelectAllProduct();
  const { mutateAsync: removeProductFromCart } = useRemoveProductFromCart();

  const removeProduct = async (cartId) => {
    await removeProductFromCart(cartId);
  }
  const selectToggle = async (cartId, selected) => {
    let response = await selectProduct({ cartId, selected });
    if (response?.message) {
      toast.error(response?.message)
    }
  }
  const selectAllToggle = async (selected) => {
    setAllSelected(selected)
    let response = await selectAllProduct({ selected });
    if (response?.message) {
      toast.error(response?.message)
    }
  }

  useEffect(() => {
    if (cart?.filter((item) => item.selected).length == cart.length) {
      setAllSelected(true)
    } else {
      setAllSelected(false)
    }
  }, [cart])

  const selectedItems = cart?.filter((item) => item.selected) || [];
  const selectedCount = selectedItems.length;

  const continueHandler = () => {
    if (selectedCount === 0) {
      toast.error("Select at least one item to continue");
      return;
    }
    onContinue();
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-10">
      {/* Left Section */}
      <div className="lg:col-span-2 w-full">
        <div className='flex items-center space-x-2 mb-3'>
          <label
            htmlFor="item-all"
            className="flex cursor-pointer flex-row items-center gap-2.5"
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
              className="h-5 w-5 flex items-center justify-center border border-gray-300 bg-white peer-checked:bg-black peer-checked:border-black transition"
            >
              <svg
                fill="none"
                viewBox="0 0 25 25"
                className="w-4 h-4 stroke-white"
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
          <span className='font-semibold text-lg text-gray-700'>{selectedCount}/{cart.length} items selected</span>
        </div>
        <div className="bg-white px-4 border border-gray-200 divide-y divide-gray-100">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-4 relative"
              >
                <div className="flex items-stretch gap-4 justify-center w-full sm:w-auto">
                  <div className='relative border border-gray-200 flex-shrink-0'>
                    <label
                      htmlFor={`item-${item._id}`}
                      className="flex flex-row cursor-pointer items-center gap-2.5 absolute top-2 left-2"
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
                        className="h-5 w-5 flex items-center justify-center border border-gray-300 bg-white peer-checked:bg-black peer-checked:border-black transition"
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 25 25"
                          className="w-4 h-4 stroke-white"
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
                    <LazyLoadImage src={item.productId.images[0].url} alt={item.productId.title} className="w-32 h-24 sm:w-45 sm:h-30 object-cover object-top"
                      wrapperClassName='w-32 h-24 sm:w-45 sm:h-30'
                    />
                  </div>
                  <div className='h-full space-y-1 min-w-0'>
                    <h4 className="font-semibold text-lg text-gray-800 max-w-xs truncate">{item.productId.title}</h4>
                    <p className="text-sm font-medium text-gray-500 capitalize">{item.productId.gender}</p>
                    <p className='font-semibold text-gray-600'>Size : <span className='font-bold text-gray-800'>{item.size}</span></p>
                    <p className="mt-4 text-lg font-bold text-gray-800"><span className='text-gray-400 text-xl mr-1'>₹</span>{[...item.productId.sizes].find((size) => size.size == item.size)?.price}</p>
                  </div>
                </div>
                <RxCross2 className='absolute font-bold top-0 right-0 sm:top-5 text-xl text-gray-500 hover:text-black cursor-pointer transition-colors' onClick={() => removeProduct(item._id)} />
                <div className="flex items-center gap-2 self-end sm:self-auto sm:absolute sm:right-0 sm:bottom-4">
                  <button
                    onClick={() => item.quantity > 1 && updateProductQuantity({ cartId: item._id, quantity: item.quantity - 1 })}
                    disabled={item.quantity <= 1}
                    className="p-2 border border-gray-200 text-gray-600 hover:border-black hover:text-black disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <TiMinus />
                  </button>
                  <span className='text-gray-800 font-bold w-6 text-center'>{item.quantity}</span>
                  <button
                    onClick={() => updateProductQuantity({ cartId: item._id, quantity: item.quantity + 1 })}
                    className="p-2 border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors cursor-pointer"
                  >
                    <TiPlus />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full">
        {selectedCount > 0 ? (
          <div className='space-y-4'>
            <h3 className="font-semibold text-gray-700 text-[1.2rem]">Price Details</h3>
            <div className="border border-gray-200 p-4">
              <div className="text-sm space-y-4 text-gray-500">
                <div className="flex justify-between text-[1rem] font-semibold text-gray-700">
                  <span>{selectedCount} {selectedCount > 1 ? "items" : "item"}</span>
                </div>
                <div className='space-y-3 font-medium'>
                  {selectedItems.map((item) => (
                    <div key={item._id} className="flex justify-between gap-4">
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
                    <span>₹{selectedItems.reduce((sum, item) => sum + [...item.productId.sizes].find((size) => size.size == item.size).price * item.quantity, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={continueHandler} className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
              Continue to Checkout →
            </button>
          </div>
        ) : (
          <div className="border border-gray-200 p-8 text-center text-gray-500 text-sm">
            Select at least one item to see the price breakdown.
          </div>
        )}
      </div>
    </div>
  );
}
