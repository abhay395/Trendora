import formAxios from "./instance/formAxios";
import privateAxios from "./instance/privateAxios";

export const getdashBoardStaticsAdminApi = async () => {
    const response = await privateAxios.get('/admin/dashboard-statics');
    return response.data.result;
}
//* --------------------------------------- Order Api---------------------------------------------------------//
export const getordersAdminApi = async (query = '') => {
    const response = await privateAxios.get(`/admin/orders${query}`);
    return response.data.result;
}
export const downloadOrderRecordApi = async (query = '') => {
    const response = await privateAxios.get(`/admin/orders/export${query}`, { responseType: 'blob' });
    return response.data

}
export const updateOrderAdminApi = async (id, updateBody) => {
    const respons = await privateAxios.patch(`/admin/order/update/${id}`, updateBody)
    return respons.data.result
}
//* --------------------------------------- Product Api---------------------------------------------------------//
export const getproductAdminApi = async () => {
    const response = await privateAxios.get('/admin/products?limit=100');
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

//* --------------------------------------- User  Api---------------------------------------------------------//

export const getUsersAdminApi = async (query = '') => {
    const response = await privateAxios.get(`/admin/users${query}`);
    return response.data.result;
}
export const getUserByIdAdminApi = async (id) => {
    const response = await privateAxios.get(`/admin/user/${id}`);
    return response.data.result;
}
export const createUserAdminApi = async (data) => {
    const response = await privateAxios.post('/admin/user/create', data);
    return response.data.result;
}
export const updateUserAdminApi = async (id, data) => {
    const response = await privateAxios.patch(`/admin/user/update/${id}`, data);
    return response.data.result;
}