import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getordersAdminApi, createproductAdminApi, getdashBoardStaticsAdminApi, getproductAdminApi, getcategoryAdminApi, uploadBulkProductApi, softDeleteAdminProductApi, deleteAdminProductPermanently, getproductByIdAdminApi, updateProductAdminApi } from "../api/adminApi";
import toast from "react-hot-toast";


export const useAdminStatics = () =>
    useQuery({ queryKey: ["admin", "dashboard-statics"], queryFn: getdashBoardStaticsAdminApi });

export const useAdminOrders = () => {
    return useQuery({ queryKey: ["admin", "orders"], queryFn: getordersAdminApi });
}
export const useAdminProducts = () => {
    return useQuery({ queryKey: ["admin", "products"], queryFn: getproductAdminApi });
}
export const useAdminProductById = (id) => {
    return useQuery({ queryKey: ["admin", "product", id], queryFn: () => getproductByIdAdminApi(id) });
};
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createproductAdminApi,
        onSuccess: () => {
            toast.success("Product created successfully");
            queryClient.invalidateQueries(["admin", "products"]);
        },
    });
};
export const useUpdateProduct = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => updateProductAdminApi(id, data),
        onSuccess: () => {
            toast.success("Product updated successfully");
            queryClient.invalidateQueries(["admin", "product", id]);
        },
    });
};
export const useUploadBulkProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadBulkProductApi,
        onSuccess: () => {
            toast.success("Products Uploaded successfully");
            queryClient.invalidateQueries(["admin", "products"]);
        },
    });
};
export const useSoftDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: softDeleteAdminProductApi,
        onSuccess: () => {
            toast.success("Product Soft deleted")
            queryClient.invalidateQueries(["admin", "products"]);
        },
    });
};

export const useDeleteProductPermanently = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAdminProductPermanently,
        onSuccess: () => {
            toast.success("Product deleted")
            queryClient.invalidateQueries(["admin", "products"]);
        },
    });
};

export const useAdminCategories = () => {
    return useQuery({ queryKey: ["admin", "categories"], queryFn: getcategoryAdminApi });
};