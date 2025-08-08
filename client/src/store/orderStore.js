import { create } from "zustand";
import { checkoutProductApi, fetchOrderById } from "../api/orderApi";
import { fetchOrderHistoryApi } from "../api/orderApi";


const useOrderStore = create((set, get) => ({
    order: [],
    recentOrder: null,
    isLoading: false,
    error: null,
    selectedOrde: null,
    checkoutProduct: async (paymentMethod) => {
        try {
            set({ isLoading: true, error: null })
            let response = await checkoutProductApi({ paymentMethod })
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
        try {
            set({ isLoading: true, error: null });
            let response = await fetchOrderHistoryApi();
            set({ order: response.data.result, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
    fetchOrderById: async (orderId) => {
        set({ isLoading: true, error: null });
        try {
            let response = await fetchOrderById(orderId);
            set({ selectedOrder: response.data.result, isLoading: false });
            return response.data.result
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    }
}))
export default useOrderStore