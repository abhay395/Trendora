import formAxios from "./instance/formAxios";
import privateAxios from "./instance/privateAxios";

export const getdashBoardStaticsAdminApi = async () => {
    const response = await privateAxios.get('/admin/dashboard-statics');
    return response.data.result;
}
export const getordersAdminApi = async () => {
    const response = await privateAxios.get('/admin/orders');
    return response.data.result;
}
export const getproductAdminApi = async () => {
    const response = await privateAxios.get('/admin/product?limit=100');
    return response.data.result;
}
export const getproductByIdAdminApi = async (id) => {
    const response = await privateAxios.get(`/admin/product/${id}`);
    return response.data.result;
}
export const createproductAdminApi = async (data) => {
    const response = await formAxios.post('/admin/product/create', data);
    return response.data.result;
}
export const updateProductAdminApi = async (id, data) => {
    const response = await formAxios.patch(`/admin/product/update/${id}`, data);
    return response.data.result;
}
export const uploadBulkProductApi = async (data) => {
    const response = await formAxios.post('/admin/product/bulk-upload', data);
    return response.data.result;
}
export const softDeleteAdminProductApi = async (id) => {
    const response = await privateAxios.delete(`/admin/product/soft-delete/${id}`);
    return response.data.result;
}
export const deleteAdminProductPermanently = async (id) => {
    const response = await privateAxios.delete(`/admin/product/${id}`);
    return response.data.result;
}
export const getcategoryAdminApi = async () => {
    const response = await privateAxios.get('/category');
    return response.data.result;
}