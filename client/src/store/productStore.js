import { create } from 'zustand'
import axios from 'axios'
import { fetchProductApi, fetchProductByIdApi, fetchProductFiltersApi } from '../api/productApi'
const useProductStore = create((set) => ({
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    filters: null,
    fetchProducts: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetchProductApi()
            let products = res.data.result.results
            set({ products: products, isLoading: false })
            console.log()
        } catch (error) {
            set({ error: error.message })
        }
    },
    fetchProductById: async (id) => {
        try {
            const res = await fetchProductByIdApi(id)
            const selectedProduct = res.data.result;
            set({ selectedProduct })
        } catch (error) {
            set({ error: error.message })
        }
    },
    fetchProductFilters: async () => {
        try {
            set({ isLoading: true, error: null })
            const res = await fetchProductFiltersApi()
            let filters = res.data.result
            // const selectedProduct = res.data.result;
            set({ filters ,isLoading:false})
            // console.log(filters)
        } catch (error) {
            set({ error: error.message })
        }
    }
}))

export default useProductStore