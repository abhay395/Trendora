import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { fetchUserProfileAllDetailsApi, updateProfileApi } from "../api/userApi";

export const useUser = () => {
    return useQuery({
        queryKey: ["user", "userDetail"],
        queryFn: fetchUserProfileAllDetailsApi,
        staleTime: 1000 * 60 * 10, 
    });
}
export const useUserUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedData) => updateProfileApi(updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries(["user", "userDetail"]);
        },
    })
}