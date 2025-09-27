import { create } from "zustand";
import { fetchUserProfileAllDetailsApi, fetchUserProfileApi, updateProfileApi } from "../api/userApi";
// import { fetchUserProfileApi } from "../api/authApi";

const useUserStore = create((set) => ({
    user: null,
    isLoading: true,
    error: null,
    userDetails: null,
    fetchUserProfile: async () => {
        try {
            set({ isLoading: true, error: null });
            let response = await fetchUserProfileApi();
            set({ user: response.data.result, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
    fetchUserAllDetails: async () => {
        try {
            set({ isLoading: true, error: null });
            let response = await fetchUserProfileAllDetailsApi();
            console.log(response.data.result)
            set({ userDetails: response.data.result, isLoading: false });

        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    },
    updateUserProfile: async (updatedData) => {
        set({ isLoading: true, error: null })
        try {
            let response = await updateProfileApi(updatedData)
            let userDetails = get().userDetails
            userDetails = { ...userDetails, ...response.data.result }
            set({ user: response.data.result, userDetailes: userDetails, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message, isLoading: false });
        }
    }
}));

export default useUserStore;