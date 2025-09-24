
import privateAxios from "./instance/privateAxios"


export const checkoutProductApi = (data) => privateAxios.post('/order/checkout', { ...data })
export const verifyPaymentApi = (data) => privateAxios.post('/order/verify-payment', { ...data })
export const addProductCart = (data) => privateAxios.post('/cart/create', { ...data })
export const fetchOrderHistoryApi = () => privateAxios.get('/order/history');
export const fetchOrderById = (id) => privateAxios.get(`/order/${id}`);