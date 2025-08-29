import { create } from 'zustand'
import { fetchProductApi, fetchProductByIdApi, fetchProductFiltersApi, fetchProductReviewApi, addProductReviewApi, addhelpfulInReviewApi } from '../api/productApi'

const useProductStore = create((set, get) => ({
    products: [],
    selectedProduct: null,
    isLoading: true,
    error: null,
    filters: null,
    filterdProduct: [],
    review: null,
    reviewLoading: true,
    clearSelectedProduct: () => set({ selectedProduct: null, reiview: null }),

    fetchFilterdProduct: async (filter) => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetchProductApi(filter)
            set({ isLoading: false, filterdProduct: res.data.result.results })
        } catch (error) {
            set({ error: error.message, isLoading: false })
        }
    },
}))

export default useProductStore