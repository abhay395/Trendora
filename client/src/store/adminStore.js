import { create } from "zustand";
import toast from "react-hot-toast";
import { dashBoardStaticsAdminApi, ordersAdminApi } from "../api/adminApi";

const useAdminStore = create((set) => ({
    isStaticsLoading: true,
    isOrdersLoading: true,
    error: null,
    statics: null,
    recentOrder: [],

    fetchStaticsInDashboard: async () => {
        set({ isStaticsLoading: true, error: null });
        try {
            const [staticsRes, recentOrderRes] = await Promise.all([
                dashBoardStaticsAdminApi(),
                ordersAdminApi(),
            ]);
            set({
                statics: staticsRes?.data?.result,
                recentOrder: recentOrderRes?.data?.result?.results || [],
                isStaticsLoading: false,
            });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isStaticsLoading: false });
        }
    },

    fetchOrdersInAdmin: async () => {
        set({ isOrdersLoading: true, error: null });
        try {
            const response = await ordersAdminApi();
            set({ orders: response.data.result, isOrdersLoading: false });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isOrdersLoading: false });
        }
    },
}));

export default useAdminStore;
