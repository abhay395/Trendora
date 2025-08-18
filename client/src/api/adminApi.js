import formAxios from "./instance/formAxios";
import privateAxios from "./instance/privateAxios";

export const getdashBoardStaticsAdminApi = () => privateAxios.get('/admin/dashboard');
export const getordersAdminApi = () => privateAxios.get('/admin/orders');
export const getproductAdminApi = () => privateAxios.get('/admin/product');
export const createproductAdminApi = (data) => formAxios.post('/admin/product/create', data);
export const getcategoryAdminApi = () => privateAxios.get('/category');