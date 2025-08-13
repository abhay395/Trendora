import privateAxios from "./instance/privateAxios";

export const dashBoardStaticsApi = () => privateAxios.get('/admin/dashboard');