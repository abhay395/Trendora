

import { create } from "zustand";
import toast from "react-hot-toast";
import { dashBoardStaticsApi } from "../api/adminApi";

const useAdminStore = create((set) => ({
    isLoading: true,
    error: null,
    data: null,
    fetchStaticsInDashboard: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await dashBoardStaticsApi();
            set({ data: response.data.result, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    }
}));

export default useAdminStore;