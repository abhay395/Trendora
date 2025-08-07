import { create } from "zustand";
import { fetchUserProfileApi } from "../api/authApi";

const useUserStore = create((set) => ({
    user: null,
    isLoading: false,
    error: null,
    fetchUserProfile: async () => {
        try {
            set({ isLoading: true, error: null });
            let response = await fetchUserProfileApi();
            set({ user: response.data.result, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
}));

export default useUserStore;