import privateAxios from "./instance/privateAxios";

export const fetchUserProfileApi = () => privateAxios.get('/user/profile');
export const updateProfileApi = (data) => privateAxios.patch('/user/profile/update',{...data});