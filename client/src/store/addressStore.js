import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
const BASEURL = import.meta.env.VITE_API_URL;
const ADRESSAPIURL = `${BASEURL}/address`
const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

const useAddressStore = create((set, get) => ({
    addresses: [],
    isLoading: false,
    error: null,
    fetchAddress: async () => {
        try {
            set({ isLoading: true, error: null })
            let response = await axios.get(`${ADRESSAPIURL}/get`, {
                headers: authHeader()
            })
            set({ addresses: response.data.result, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false })
            console.log(error)
        }
    },
    addAddress: async ({ name, phone, pincode, city, state, fullAddress }) => {
        try {
            set({ isLoading: true, error: null })
            let currentAddress = get().addresses;
            let response = await axios.post(`${ADRESSAPIURL}/add`, { name, phone, pincode, city, state, fullAddress }, {
                headers: authHeader()
            })
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
            let response = await axios.put(`${ADRESSAPIURL}/update/${addressId}`, updateBody, {
                headers: authHeader()
            })
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
            await axios.put(`${ADRESSAPIURL}/selecte/${addressId}`, {}, {
                headers: authHeader()
            })
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false })
        }
    },
    deleteAddress: async (addressId) => {
        try {
            let currentAddress = get().addresses;
            let updatedAddress = currentAddress.filter(item => item._id != addressId)
            set({ addresses: updatedAddress })
            await axios.delete(`${ADRESSAPIURL}/delete/${addressId}`, {
                headers: authHeader()
            })
        } catch (error) {
            console.log(error)
            set({ error: error?.response?.data?.message, isLoading: false })
        }
    }
}))

export default useAddressStore