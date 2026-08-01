import privateAxios from "./instance/privateAxios";

export const loginUserApi = async (data) => {
    const response = await privateAxios.post('/auth/login', { ...data });
    return response.result
}
export const signupUserApi = async (data) => {
    const response = await privateAxios.post('/auth/signup', { ...data });
    return response.result
}
export const logoutApi = async () => {
    await privateAxios.post('/auth/logout')
}