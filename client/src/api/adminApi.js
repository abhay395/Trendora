import privateAxios from "./instance/privateAxios";

export const getdashBoardStaticsAdminApi = () => privateAxios.get('/admin/dashboard');
export const getordersAdminApi = () => privateAxios.get('/admin/orders');
export const getproductAdminApi = () => privateAxios.get('/admin/product');
export const createproductAdminApi = (data) => privateAxios.post('/admin/product/create', { ...data });
export const getcategoryAdminApi = () => privateAxios.get('/category');