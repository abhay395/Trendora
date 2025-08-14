import privateAxios from "./instance/privateAxios";

export const dashBoardStaticsAdminApi = () => privateAxios.get('/admin/dashboard');
export const ordersAdminApi = () => privateAxios.get('/admin/orders');