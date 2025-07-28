import privateAxios from "./instance/privateAxios";


export const fetchAddressApi = () => privateAxios.get('/address/get');
export const addAddressApi = (data) => privateAxios.post('/address/add', { ...data });
export const updateAddressApi = (id, data) => privateAxios.put(`/address/update/${id}`, { ...data });
export const selecteAddressApi = (id) => privateAxios.put(`/address/selecte/${id}`);
export const deleteAddressApi = (id) => privateAxios.delete(`/address/delete/${id}`);