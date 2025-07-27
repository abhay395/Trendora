import React, { useEffect, useState } from 'react';
import useAddressStore from '../store/addressStore';
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx';
import { MdEditNote } from "react-icons/md";
import 'react-loading-skeleton/dist/skeleton.css';
import { AnimatePresence, motion } from 'framer-motion';
export default function AddressSection() {
  const [showForm, setShowForm] = useState(false);
  const { fetchAddress, addAddress, addresses, error, deleteAddress, selecteAddress } = useAddressStore()
  const { register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();
  const selectedAddressId = addresses.find((item) => item.selected)?._id
  const [select, setSelect] = useState(selectedAddressId)
  const onSubmit = (async (data) => {
    addAddress(data)
  })
  const deleteHandler = (addressId) => {
    deleteAddress(addressId)
  }
  const selectedAddresses = (addressId) => {
    selecteAddress(addressId)
  }
  useEffect(() => {
    fetchAddress()
  }, [])
  useEffect(() => {
    if (!error) {
      setShowForm(false)
      reset()
    }
  }, [addresses])

  return (
    <div className="w-full px-5 py-6 rounded-xl border border-gray-200 space-y-6">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg text-gray-900">Select A Delivery Address</span>
        <span
          className="font-semibold cursor-pointer text-[1rem] text-gray-600 "
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? 'Cancel' : 'Add Address'}
        </span>
      </div>

      <AnimatePresence>
        {addresses.map(addr => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            exit={{ opacity: 0, x: 100 }}

            key={addr._id} className="flex items-start space-x-3 relative">
            <input
              type="radio"
              name="address"
              id={addr._id}
              className="w-5 h-5 mt-1 accent-black cursor-pointer"
              checked={addr._id == select || addr.selected}
              onChange={() => {
                setSelect(addr._id)
                selectedAddresses(addr._id)
              }}
            />
            <label htmlFor={addr._id} className="space-y-1">
              <p className="font-semibold text-[1.02rem] text-gray-800">{addr.name}</p>
              <p className="text-[0.9rem] font-medium text-gray-500">{addr.fullAddress} {addr.city} {addr.pincode} {addr.state}</p>
            </label>
            <div className='absolute right-4 flex space-x-4 items-center justify-center '>
              <span className=' text-gray-600 cursor-pointer text-2xl' onClick={() => deleteHandler(addr._id)}><MdEditNote /></span>
              <span className=' text-gray-600 cursor-pointer text-lg' onClick={() => deleteHandler(addr._id)}><RxCross2 /></span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div layout transition={{ duration: 0.4, ease: "easeOut" }} exit={{ opacity: 0, y: 50 }}>
        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4 border-t border-gray-300">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                // value={newName}
                // onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex. John Doe"
                {...register("name", {
                  required: "Name is requierd",
                })}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
              {errors?.name ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.name.message}</p> : null}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                // value={newName}
                // onChange={(e) => setNewName(e.target.value)}
                {...register("phone", {
                  required: "Phone Number  is requierd",
                })}
                required
                placeholder="Ex. 9549123546"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
              {errors?.phone ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.phone.message}</p> : null}
              {error ? <p className="font-semibold text-sm text-red-600 mt-2">{error}</p> : null}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                // value={newName}
                // onChange={(e) => setNewName(e.target.value)}
                {...register("pincode", {
                  required: "Pincode is requierd",
                })}
                required
                placeholder="Ex. 36001"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
              {errors?.pincode ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.pincode.message}</p> : null}
            </div>
            <div className='grid grid-cols-2 gap-x-4'>
              <div className="flex flex-col ">
                <label className="text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  // value={newName}
                  // onChange={(e) => setNewName(e.target.value)}
                  {...register("state", {
                    required: "State is requierd",
                  })}
                  required
                  placeholder="Ex. Rajasthan"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                {errors?.state ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.state.message}</p> : null}
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  {...register("city", {
                    required: "City is requierd",
                  })}
                  // value={newName}
                  // onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex. Jaipur"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                {errors?.city ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.city.message}</p> : null}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <textarea
                // value={newAddress}
                // onChange={(e) => setNewAddress(e.target.value)}
                {...register("fullAddress", {
                  required: "Full Address is requierd",
                })}
                placeholder="Ex.  1234 Main St"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
              {errors?.fullAddress ? <p className="font-semibold text-sm text-red-600 mt-2">{errors?.fullAddress.message}</p> : null}
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Save Address
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
