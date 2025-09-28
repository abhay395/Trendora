import axios from "axios";

const BASEURL = import.meta.env.VITE_API_URL;
const privateAxios = axios.create({
    baseURL: BASEURL,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
})

privateAxios.interceptors.request.use((config) => {
    let token = localStorage.getItem("token")
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default privateAxios