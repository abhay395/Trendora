import privateAxios from "./instance/privateAxios";

export const fetchUserProfileApi = () => privateAxios.get('/user/profile');
export const fetchUserProfileAllDetailsApi = () => privateAxios.get('/user/profile-all-details');
export const updateProfileApi = (data) => privateAxios.patch('/user/profile/update',{...data});