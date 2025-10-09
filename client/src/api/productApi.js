import formAxios from "./instance/formAxios"
import privateAxios from "./instance/privateAxios"
import publicAxios from "./instance/publiAxios"

export const fetchProductApi = async (filter = '') => {
    const response = await publicAxios.get(`/product?${filter}`)
    return response.data.result
}
export const fetchProductFiltersApi = async () => {
    const response = await publicAxios.get('/product/filters')
    return response.data.result
}
export const fetchProductByIdApi = async (id) => {
    const response = await publicAxios.get(`/product/${id}`)
    return response.data.result
}
export const fetchProductReviewApi = async (productId, option = '', page = 1) => {
    const response = await publicAxios.get(`/product/${productId}/review?sortBy=${option}&limit=5&page=${page}`)
    return response.data.result
}
export const addProductReviewApi = async (form) => {
    const response = await formAxios.post(`/product/review/create`, form)
    return response.data.result
}
export const addhelpfulInReviewApi = async (reviewId) => {
    const response = await privateAxios.patch(`/product/review/addHelpful/${reviewId}`, {})
    return response.data.result
}