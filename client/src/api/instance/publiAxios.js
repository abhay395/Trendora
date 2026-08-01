import axios from "axios";

const BASEURL = import.meta.env.VITE_API_URL;
const publicAxios = axios.create({
    baseURL: BASEURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

publicAxios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Return normalized error object
        return Promise.reject(error.response?.data || error.message);
    }
);

export default publicAxios