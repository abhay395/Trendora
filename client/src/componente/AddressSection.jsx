import React, { useEffect, useState } from 'react';
import useAddressStore from '../store/addressStore';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { MdEditNote } from "react-icons/md";
import 'react-loading-skeleton/dist/skeleton.css';
import { AnimatePresence, motion } from 'framer-motion';

const emptyForm = { name: "", phone: "", pincode: "", state: "", city: "", fullAddress: "" };

export default function AddressSection({ select, setSelect }) {
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const { fetchAddress, addAddress, updateAddress, addresses, error, deleteAddress, selecteAddress } = useAddressStore();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const selectedAddressId = addresses.find((item) => item.selected)?._id;
  // const [select, setSelect] = useState(selectedAddressId);
  useEffect(() => {
    setSelect(selectedAddressId)
  }, [])
  const onSubmit = async (data) => {
    if (editMode) {
      await updateAddress(editId, data);
    } else {
      await addAddress(data);
    }
  };

  const deleteHandler = (addressId) => {
    deleteAddress(addressId);
  };

  const selectedAddresses = (addressId) => {
    selecteAddress(addressId);
  };

  const handleEdit = (addr) => {
    setShowForm(true);
    setEditMode(true);
    setEditId(addr._id);
    reset(addr);
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  useEffect(() => {
    if (!error) {
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      reset(emptyForm);
    }
  }, [addresses]);

  return (
    <div className="w-full px-5 py-6 rounded-xl border border-gray-200 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg text-gray-900">Select A Delivery Address</span>
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-semibold cursor-pointer text-[1rem] text-gray-600"
          onClick={() => {
            reset(emptyForm);
            setShowForm(prev => !prev);
            setEditMode(false);
            setEditId(null);
          }}
        >
          {showForm ? 'Cancel' : 'Add Address'}
        </motion.span>
      </div>

      {/* Address list */}
      <AnimatePresence>
        {addresses.map((addr, index) => (
          <motion.div
            key={addr._id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-start space-x-3 relative bg-gray-50 p-3 rounded-lg"
          >
            <motion.input
              type="radio"
              name="address"
              id={addr._id}
              className="w-5 h-5 mt-1 accent-black cursor-pointer"
              checked={addr?._id === select}
              onChange={() => {
                setSelect(addr._id);
                selectedAddresses(addr._id);
              }}
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <label htmlFor={addr._id} className="space-y-1">
              <p className="font-semibold text-[1.02rem] text-gray-800">{addr.name}</p>
              <p className="text-[0.9rem] font-medium text-gray-500">
                {addr.fullAddress} {addr.city} {addr.pincode} {addr.state}
              </p>
            </label>
            <div className='absolute right-4 flex space-x-4 items-center justify-center'>
              <motion.span
                whileHover={{ scale: 1.2, color: "#000" }}
                className='text-gray-600 cursor-pointer text-2xl'
                onClick={() => handleEdit(addr)}
              >
                <MdEditNote />
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.2, color: "#d11" }}
                className='text-gray-600 cursor-pointer text-lg'
                onClick={() => deleteHandler(addr._id)}
              >
                <RxCross2 />
              </motion.span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="addressForm"
            initial={{ height: 0, scaleY: 0.95 }}
            animate={{
              height: "auto",
              scaleY: 1,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            exit={{
              height: 0,
              scaleY: 0.95,
              transition: { duration: 0.25, ease: "easeInOut" }
            }}
            style={{ overflow: "hidden" }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4 border-t border-gray-300">
              {/* Fields */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Ex. John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                {errors?.name && <p className="font-semibold text-sm text-red-600 mt-2">{errors?.name.message}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone Number is required" })}
                  placeholder="Ex. 9549123546"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                {errors?.phone && <p className="font-semibold text-sm text-red-600 mt-2">{errors?.phone.message}</p>}
                {error && <p className="font-semibold text-sm text-red-600 mt-2">{error}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  {...register("pincode", { required: "Pincode is required" })}
                  placeholder="Ex. 36001"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                {errors?.pincode && <p className="font-semibold text-sm text-red-600 mt-2">{errors?.pincode.message}</p>}
              </div>

              <div className='grid grid-cols-2 gap-x-4'>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    {...register("state", { required: "State is required" })}
                    placeholder="Ex. Rajasthan"
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                  {errors?.state && <p className="font-semibold text-sm text-red-600 mt-2">{errors?.state.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    {...register("city", { required: "City is required" })}
                    placeholder="Ex. Jaipur"
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  />
                  {errors?.city && <p className="font-semibold text-sm text-red-600 mt-2">{errors?.city.message}</p>}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Full Address</label>
                <textarea
                  {...register("fullAddress", { required: "Full Address is required" })}
                  placeholder="Ex. 1234 Main St"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                {errors?.fullAddress && <p className="font-semibold text-sm text-red-600 mt-2">{errors?.fullAddress.message}</p>}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                {editMode ? "Update Address" : "Save Address"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
