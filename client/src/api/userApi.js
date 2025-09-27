import formAxios from "./instance/formAxios";
import privateAxios from "./instance/privateAxios";

export const fetchUserProfileApi = () => privateAxios.get('/user/profile');
export const fetchUserProfileAllDetailsApi = () => privateAxios.get('/user/profile-all-details');
export const updateProfileApi = (form) => formAxios.patch('/user/profile/update',form);