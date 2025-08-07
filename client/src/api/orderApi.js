
import privateAxios from "./instance/privateAxios"


export const checkoutProductApi = (data) => privateAxios.post('/order/checkout',{...data})
export const addProductCart = (data) => privateAxios.post('/cart/create', {...data})
export const fetchOrderHistoryApi = () => privateAxios.get('/order/history');