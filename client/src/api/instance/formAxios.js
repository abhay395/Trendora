import axios from "axios";

const BASEURL = import.meta.env.VITE_API_URL;
const formAxios = axios.create({
    baseURL: BASEURL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

formAxios.interceptors.request.use((config) => {
    let token = localStorage.getItem("token")
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default formAxios