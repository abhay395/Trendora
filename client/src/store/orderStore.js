import { create } from "zustand";
import axios from "axios";
// import toast from "react-hot-toast";
const BASEURL = import.meta.env.VITE_API_URL;
const ORDERURL = `${BASEURL}/order`
const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

const useOrderStore = create((set, get) => ({
    order: [],
    recentOrder: null,
    isLoading: false,
    error: null,
    checkoutProduct: async (paymentMethod) => {
        try {
            set({ isLoading: true, error: null })
            let response = await axios.post(`${ORDERURL}/checkout`, { paymentMethod }, {
                headers: authHeader()
            })
            set({ isLoading: false, recentOrder: response?.data?.result })
            // toast.success("Order Placed Successfully")
            return response.data.result._id;
        } catch (error) {
            console.log(error)
            set({
                error: error.response?.data?.message, isLoading: false
            })
            return false;
        }
    },
    fetchOrderList: async () => {

    },
}))
export default useOrderStore