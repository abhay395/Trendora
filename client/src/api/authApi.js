import privateAxios from "./instance/privateAxios";

export const loginUserApi = (data) => privateAxios.post('/auth/login', { ...data });
export const signupUserApi = (data) => privateAxios.post('/auth/signup', { ...data });
export const logoutApi = () => privateAxios.post('/auth/logout');