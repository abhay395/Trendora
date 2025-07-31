import publicAxios from "./instance/publiAxios"

export const fetchProductApi = (filter='') => publicAxios.get(`/product?${filter}`)
export const fetchProductFiltersApi = () => publicAxios.get('/product/filters')
export const fetchProductByIdApi = (id) => publicAxios.get(`/product/${id}`)