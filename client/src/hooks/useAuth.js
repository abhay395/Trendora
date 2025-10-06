import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { loginUserApi, logoutApi, signupUserApi } from "../api/authApi";

export const useLogin = () => {
    return useMutation({
        mutationFn: (data) => loginUserApi(data),
        onSuccess: (data) => localStorage.setItem('token', data.token)
    })
}
export const useSingup = () => {
    return useMutation({
        mutationFn: (data) => signupUserApi(data),
        onSuccess: (data) => localStorage.setItem('token', data.token)
    })
}
export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => logoutApi(),
        onSuccess: (data) => {
            queryClient.removeQueries({ queryKey: ['user', 'userDetail'] });
            localStorage.removeItem('token')
        }
    })
}