import { create } from "zustand";
import toast from "react-hot-toast";
import { persist } from 'zustand/middleware'
import { addAddressApi, deleteAddressApi, fetchAddressApi, selecteAddressApi } from "../api/addressApi";

const useAddressStore = create(
    persist(
        (set, get) => ({
            addresses: [],
            isLoading: false,
            error: null,
            fetchAddress: async () => {
                try {
                    set({ isLoading: true, error: null })
                    let response = await fetchAddressApi()
                    set({ addresses: response.data.result, isLoading: false })
                } catch (error) {
                    set({ error: error.response.data.message, isLoading: false })
                    console.log(error)
                }
            },
            addAddresApis: async ({ name, phone, pincode, city, state, fullAddress }) => {
                try {
                    set({ isLoading: true, error: null })
                    let currentAddress = get().addresses;
                    let response = await addAddressApi({ name, phone, pincode, city, state, fullAddress })
                    set({ addresses: [...currentAddress, response.data.result], isLoading: false })
                    toast.success("Address Added!")
                } catch (error) {
                    set({ error: error.response.data.message, isLoading: false })
                    toast.error(`${get().error}`)
                }
            },
            updateAddress: async (addressId, updateBody) => {
                try {
                    set({ isLoading: true, error: null })
                    let currentAddress = get().addresses;
                    let response = await updateAddress(addressId, updateBody)
                    let updateAddress = currentAddress.map((item) => item._id == addressId ? { ...response.data.result } : item)
                    set({ addresses: updateAddress })
                } catch (error) {
                    set({ error: error.response.data.message, isLoading: false })
                }
            },
            selecteAddress: async (addressId) => {
                try {
                    set({ isLoading: true, error: null })
                    let currentAddress = get().addresses;
                    let updateAddress = currentAddress.map((item) => item._id == addressId ? { ...item, selected: true } : item)
                    set({ addresses: updateAddress })
                    await selecteAddressApi(addressId)
                } catch (error) {
                    set({ error: error.response.data.message, isLoading: false })
                }
            },
            deleteAddress: async (addressId) => {
                try {
                    let currentAddress = get().addresses;
                    let updatedAddress = currentAddress.filter(item => item._id != addressId)
                    set({ addresses: updatedAddress })
                    await deleteAddressApi(addressId)
                } catch (error) {
                    console.log(error)
                    set({ error: error?.response?.data?.message, isLoading: false })
                }
            }
        }), {
        name: "address-storage",
        partialize: (state) => ({
            addresses: state.addresses,
        }),
    }
    )
)

export default useAddressStore