import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { addAddressApi, deleteAddressApi, fetchAddressApi, selecteAddressApi, updateAddressApi } from "../api/addressApi";

export const useAddress = () => {
    return useQuery({
        queryKey: ["address"],
        queryFn: fetchAddressApi,
    });
}
export const useAddAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => addAddressApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["address"]);
        },
    });
}
export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updateData }) => {
            return updateAddressApi(id, updateData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["address"]);
        },
    });
}
export const useSelectAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: selecteAddressApi,
        onSuccess: () => {
            queryClient.invalidateQueries(["address"]);
        },
    });
}
export const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAddressApi,
        onSuccess: () => {
            queryClient.invalidateQueries(["address"]);
        },
    });
}