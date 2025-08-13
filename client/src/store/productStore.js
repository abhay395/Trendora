import { create } from 'zustand'
import axios from 'axios'
import { fetchProductApi, fetchProductByIdApi, fetchProductFiltersApi } from '../api/productApi'

const useProductStore = create((set) => ({
    products: [],
    selectedProduct: null,
    isLoading: true,
    error: null,
    filters: null,
    filterdProduct: [],
    
    clearSelectedProduct: () => set({ selectedProduct: null }),
    
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