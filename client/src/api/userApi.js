import formAxios from "./instance/formAxios";
import privateAxios from "./instance/privateAxios";

export const fetchUserProfileApi = async () => {
    const response = await privateAxios.get('/user/profile')
    return response.data.result
}
export const fetchUserProfileAllDetailsApi = async () => {
    const response = await privateAxios.get('/user/profile-all-details');
    return response.data.result
}
export const updateProfileApi = async (form) => {
    const response = await formAxios.patch('/user/profile/update', form)
    return response.data.result
}