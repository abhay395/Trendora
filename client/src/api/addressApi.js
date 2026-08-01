import privateAxios from "./instance/privateAxios";


export const fetchAddressApi = async () => {
    const response = await privateAxios.get('/address/get');
    return response.result;
}
export const addAddressApi = async (data) => {
    const response = await privateAxios.post('/address/add', { ...data });
    return response.result;
}
export const updateAddressApi = async (id, data) => {
    
    const response = await privateAxios.put(`/address/update/${id}`, { ...data });
    return response.result;
}
export const selecteAddressApi = async (id) => {
    const response = await privateAxios.put(`/address/selecte/${id}`);
    return response.result;
}
export const deleteAddressApi = async (id) => {
    const response = await privateAxios.delete(`/address/delete/${id}`);
    return response.result;
}