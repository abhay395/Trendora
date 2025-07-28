import { create } from 'zustand'
import axios from 'axios'
import { fetchProductApi, fetchProductByIdApi } from '../api/productApi'
const useProductStore = create((set) => ({
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
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
    }
}))

export default useProductStore