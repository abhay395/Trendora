import privateAxios from "./instance/privateAxios"


export const fetchCartApi = async () => {
    const response = await privateAxios.get('/cart/get-all')
    return response.result;
}
export const addProductCartApi = async (data) => {
    const response = await privateAxios.post('/cart/create', { ...data })
    return response.result;
}
export const updateProductQuantityApi = async (id, data) => {
    const response = await privateAxios.put(`/cart/update/${id}`, { ...data })
    return response.result;
}
export const selectProductApi = async (id, data) => {
    
    const response = await privateAxios.put(`/cart/update/${id}`, { ...data })
    return response.result;
}
export const selectAllProductApi = async (data) => {
    const response = await privateAxios.put(`/cart/update-many`, { ...data })
    return response.result;
}
export const removeProductFromCartApi = async (id) => {
    const response = await privateAxios.delete(`/cart/remove-product/${id}`)
    return response.result;
}