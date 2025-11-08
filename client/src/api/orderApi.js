
import privateAxios from "./instance/privateAxios"


export const checkoutProductApi = async (data) => {
    const response = await privateAxios.post('/order/checkout', { ...data })
    return response.data.result;
}
export const verifyPaymentApi = async (data) => {
    const response = await privateAxios.post('/order/verify-payment', { ...data })
    return response.data.result;
}
export const addProductCart = async (data) => {
    const response = await privateAxios.post('/cart/create', { ...data })
    return response.data.result;
}
export const fetchOrderHistoryApi = async () => {
    const response = await privateAxios.get('/order/history')
    return response.data.result;
}
export const fetchOrderById = async (id) => {
    const response = await privateAxios.get(`/order/${id}`)
    return response.data.result;
}