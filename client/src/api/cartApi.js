import privateAxios from "./instance/privateAxios"


export const fetchCartApi = () => privateAxios.get('/cart/get-all')
export const addProductCartApi = (data) => privateAxios.post('/cart/create', {...data})
export const updateProductQuantityApi = (id, data) => privateAxios.put(`/cart/update/${id}`, { ...data })
export const selectProductApi = (id, data) => privateAxios.put(`/cart/update/${id}`, { ...data })
export const selectAllProductApi = (data) => privateAxios.put(`/cart/update-many`, { ...data })
export const removeProductFromCartApi = (id) => privateAxios.delete(`/cart/remove-product/${id}`)