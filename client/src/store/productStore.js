import { create } from 'zustand'
import axios from 'axios'
import { fetchProductApi, fetchProductByIdApi, fetchProductFiltersApi, fetchProductReviewApi, addProductReviewApi } from '../api/productApi'

const useProductStore = create((set) => ({
    products: [],
    selectedProduct: null,
    isLoading: true,
    error: null,
    filters: null,
    filterdProduct: [],
    review: null,
    reviewLoading: true,
    clearSelectedProduct: () => set({ selectedProduct: null, reiview: null }),

    fetchProducts: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetchProductApi()
            const products = res.data.result.results
            set({ products, isLoading: false })
        } catch (error) {
            set({ error: error.message, isLoading: false })
        }
    },

    fetchFilterdProduct: async (filter) => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetchProductApi(filter)
            set({ isLoading: false, filterdProduct: res.data.result.results })
        } catch (error) {
            set({ error: error.message, isLoading: false })
        }
    },

    fetchProductById: async (id) => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetchProductByIdApi(id)
            const selectedProduct = res.data.result
            set({ selectedProduct, isLoading: false })
        } catch (error) {
            set({ error: error.message, isLoading: false })
        }
    },
    fetchProductReview: async (productId, options = '') => {
        set({ reviewLoading: true, error: null })
        try {
            const res = await fetchProductReviewApi(productId, options);
            // console.log(res.data.result)
            set({ review: res?.data?.result, reviewLoading: false })
        } catch (error) {
            set({ error: error.message, reviewLoading: false })
        }
    },
    addProductReview: async (form) => {
        try {
            
            const res = await addProductReviewApi(form);
            console.log(res.data.result)
            // set((state) => ({
            //     review: {
            //         ...state.reiview,
            //         results: [res.data.result,...state?.review?.results]
            //     }
            // }))
        } catch (error) {
            set({ error: error.message })
        }
    },
    fetchProductFilters: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetchProductFiltersApi()
            const filters = res.data.result
            set({ filters, isLoading: false })
        } catch (error) {
            set({ error: error.message, isLoading: false })
        }
    }
}))

export default useProductStore