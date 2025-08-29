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
}))

export default useProductStore