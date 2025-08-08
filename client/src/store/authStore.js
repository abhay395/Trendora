

import { create } from "zustand";
import { loginUserApi, logoutApi, signupUserApi } from "../api/authApi";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    isLoading: false,
    error: null,
    loginUser: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await loginUserApi(data);
            const token = response.data.result.token
            localStorage.setItem('token', token)
            set({ isLoading: false });
            return true
        } catch (error) {
            toast.error(error.response.data.message)
            set({ error: error.response?.data?.message, isLoading: false });
            return false
        }
    },
    signupUser: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await signupUserApi(data);
            const token = response.data.result.token
            localStorage.setItem('token', token)
            set({ isLoading: false });
            return true
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log(error)
            set({ error: error.response?.data?.message, isLoading: false });
            return false
        }
    },
    logoutUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await logoutApi();
            localStorage.removeItem('token');
            set({ isLoading: false });
            return true
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log(error)
            set({ error: error.response?.data?.message, isLoading: false });
            return false
        }
    },
}));

export default useAuthStore;