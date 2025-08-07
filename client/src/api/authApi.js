import privateAxios from "./instance/privateAxios";

export const fetchUserProfileApi = () => privateAxios.get('/auth/profile');