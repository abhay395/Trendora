import publicAxios from "./instance/publiAxios"

export const fetchProductApi = () => publicAxios.get('/product')
export const fetchProductFiltersApi = () => publicAxios.get('/product/filters')
export const fetchProductByIdApi = (id) => publicAxios.get(`/product/${id}`)