import formAxios from "./instance/formAxios"
import privateAxios from "./instance/privateAxios"
import publicAxios from "./instance/publiAxios"

export const fetchProductApi = (filter = '') => publicAxios.get(`/product?${filter}`)
export const fetchProductFiltersApi = () => publicAxios.get('/product/filters')
export const fetchProductByIdApi = (id) => publicAxios.get(`/product/${id}`)
export const fetchProductReviewApi = (productId, option = '', page = 1) => publicAxios.get(`/product/${productId}/review?sortBy=${option}&limit=5&page=${page}`)
export const addProductReviewApi = (form) => formAxios.post(`/product/review/create`, form)
export const addhelpfulInReviewApi = (reviewId) => privateAxios.patch(`/product/review/addHelpful/${reviewId}`, {})