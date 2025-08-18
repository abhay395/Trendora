import { create } from "zustand";
import toast from "react-hot-toast";
import { getordersAdminApi, createproductAdminApi, getdashBoardStaticsAdminApi, getproductAdminApi, getcategoryAdminApi } from "../api/adminApi";

const useAdminStore = create((set) => ({
    isStaticsLoading: true,
    isOrdersLoading: true,
    isProductLoading: true,
    isCategoriesLoading: true,
    categories: null,
    statics: null,
    recentOrder: [],
    productData: {
        product: null,
        page: 1,
        limit: 10,
        totalPages: 1,
    },
    error: null,
    fetchStaticsInDashboard: async () => {
        set({ isStaticsLoading: true, error: null });
        try {
            const [staticsRes, recentOrderRes] = await Promise.all([
                getdashBoardStaticsAdminApi(),
                getordersAdminApi(),
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
            const response = await getordersAdminApi();
            set({ orders: response.data.result, isOrdersLoading: false });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isOrdersLoading: false });
        }
    },
    fetchProductsInAdmin: async () => {
        set({ isProductLoading: true, error: null });
        try {
            const response = await getproductAdminApi();
            console.log(response)
            set((state) => ({
                productData: {
                    ...state.productData,
                    product: response.data.result.results,
                    totalPages: response.data.result.totalPages,
                }
            }), { isProductLoading: false });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isProductLoading: false });
        }
    },
    fetchCategoriesInAdmin: async () => {
        set({ isCategoriesLoading: true, error: null });
        try {
            const response = await getcategoryAdminApi();
            set({ categories: response.data.result.results, isCategoriesLoading: false });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isCategoriesLoading: false });
        }
    },
    AddProductInAdmin: async (data) => {
        set({ isProductLoading: true, error: null })
        try {
            const response = await createproductAdminApi(data);
            console.log(response)
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong"
            set({ error: message, isProductLoading: false })
        }
    }
}));

export default useAdminStore;
