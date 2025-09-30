import axios from "axios";

const BASEURL = import.meta.env.VITE_API_URL;
const publicAxios = axios.create({
    baseURL: BASEURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials:true
})

export default publicAxios