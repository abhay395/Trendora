import formAxios from "./instance/formAxios"
import publicAxios from "./instance/publiAxios"

export const fetchProductApi = (filter = '') => publicAxios.get(`/product?${filter}`)
export const fetchProductFiltersApi = () => publicAxios.get('/product/filters')
export const fetchProductByIdApi = (id) => publicAxios.get(`/product/${id}`)
export const fetchProductReviewApi = (productId, option = '') => publicAxios.get(`/product/${productId}/review`)
export const addProductReviewApi = (form) => formAxios.post(`/product/review/create`, form)