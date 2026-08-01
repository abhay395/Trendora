import formAxios from "./instance/formAxios";
import privateAxios from "./instance/privateAxios";

export const getdashBoardStaticsAdminApi = async () => {
    const response = await privateAxios.get('/admin/dashboard-statics');
    return response.result;
}
//* --------------------------------------- Order Api---------------------------------------------------------//
export const getordersAdminApi = async (query = '') => {
    const response = await privateAxios.get(`/admin/orders${query}`);
    return response.result;
}
export const downloadOrderRecordApi = async (query = '') => {
    const response = await privateAxios.get(`/admin/orders/export${query}`, { responseType: 'blob' });
    return response

}
export const updateOrderAdminApi = async (id, updateBody) => {
    const respons = await privateAxios.patch(`/admin/order/update/${id}`, updateBody)
    return respons.result
}
//* --------------------------------------- Product Api---------------------------------------------------------//
export const getproductAdminApi = async () => {
    const response = await privateAxios.get('/admin/products?limit=100');
    return response.result;
}
export const getproductByIdAdminApi = async (id) => {
    const response = await privateAxios.get(`/admin/product/${id}`);
    return response.result;
}
export const createproductAdminApi = async (data) => {
    const response = await formAxios.post('/admin/product/create', data);
    return response.result;
}
export const updateProductAdminApi = async (id, data) => {
    const response = await formAxios.patch(`/admin/product/update/${id}`, data);
    return response.result;
}
export const uploadBulkProductApi = async (data) => {
    const response = await formAxios.post('/admin/product/bulk-upload', data);
    return response.result;
}
export const softDeleteAdminProductApi = async (id) => {
    const response = await privateAxios.delete(`/admin/product/soft-delete/${id}`);
    return response.result;
}
export const deleteAdminProductPermanently = async (id) => {
    const response = await privateAxios.delete(`/admin/product/${id}`);
    return response.result;
}
export const getcategoryAdminApi = async () => {
    const response = await privateAxios.get('/category');
    return response.result;
}

//* --------------------------------------- User  Api---------------------------------------------------------//

export const getUsersAdminApi = async (query = '') => {
    const response = await privateAxios.get(`/admin/users${query}`);
    return response.result;
}
export const getUserByIdAdminApi = async (id) => {
    const response = await privateAxios.get(`/admin/user/${id}`);
    return response.result;
}
export const createUserAdminApi = async (data) => {
    const response = await privateAxios.post('/admin/user/create', data);
    return response.result;
}
export const softDeleteUserAdminApi = async (id) => {
    const response = await privateAxios.delete(`/admin/user/soft-delete/${id}`);
    return response.result;
}
export const hardDeleteUserAdminApi = async (id) => {
    const response = await privateAxios.delete(`/admin/user/hard-delete/${id}`);
    return response.result;
}
export const updateUserAdminApi = async (id, data) => {
    const response = await privateAxios.patch(`/admin/user/update/${id}`, data);
    return response.result;
}