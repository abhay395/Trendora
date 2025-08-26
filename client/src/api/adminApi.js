import formAxios from "./instance/formAxios";
import privateAxios from "./instance/privateAxios";

export const getdashBoardStaticsAdminApi = () => privateAxios.get('/admin/dashboard');
export const getordersAdminApi = () => privateAxios.get('/admin/orders');
export const getproductAdminApi = () => privateAxios.get('/admin/product?limit=100');
export const getproductByIdAdminApi = (id) => privateAxios.get(`/admin/product/${id}`);
export const createproductAdminApi = (data) => formAxios.post('/admin/product/create', data);
export const updateProductAdminApi = (id, data) => formAxios.patch(`/admin/product/${id}`, data);
export const uploadBulkProductApi = (data) => formAxios.post('/admin/product/bulk-upload', data);
export const softDeleteAdminProductApi = (id) => privateAxios.delete(`/admin/product/soft-delete/${id}`);
export const deleteAdminProductPermanently = (id) => privateAxios.delete(`/admin/product/${id}`);
export const getcategoryAdminApi = () => privateAxios.get('/category');