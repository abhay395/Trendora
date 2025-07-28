import publicAxios from "./instance/publiAxios"

export const fetchProductApi = () => publicAxios.get('/product')
export const fetchProductByIdApi = (id) => publicAxios.get(`/product/${id}`)