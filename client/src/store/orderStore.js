import { create } from "zustand";
import { checkoutProductApi, fetchOrderById, verifyPaymentApi } from "../api/orderApi";
import { fetchOrderHistoryApi } from "../api/orderApi";
// import { window } from 'razorpay'

const useOrderStore = create((set, get) => ({
    order: [],
    isLoading: true,
    error: null,
    selectedOrde: null,
    checkoutProduct: async (paymentMethod) => {
        try {
            set({ isLoading: true, error: null })
            let response = await checkoutProductApi({ paymentMethod })
            return response.data.result;
        } catch (error) {
            console.log(error)
            set({
                error: error.response?.data?.message, isLoading: false
            })
            return false;
        }
    },
    verifyPayment: async (data) => {
        try {
            set({ isLoading: true, error: null })
            let response = await verifyPaymentApi({ ...data })
        } catch (error) {

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