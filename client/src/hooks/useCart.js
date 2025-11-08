import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductCartApi, fetchCartApi, removeProductFromCartApi, selectAllProductApi, selectProductApi, updateProductQuantityApi } from "../api/cartApi";

export const useCart = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: fetchCartApi,
    });
}
export const useAddProductCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => addProductCartApi(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["cart"]);
            return { message: data?.message || "Product added to cart" };
        },
        onError: (error) => {
            return { message: error?.response?.data?.message || "Failed to add product to cart" };
        },
    });
}
export const useUpdateProductQuantity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ cartId, quantity }) => updateProductQuantityApi(cartId, { quantity }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["cart"]);
            return { message: data?.message || "Product quantity updated" };
        },
        onError: (error) => {
            return { message: error?.response?.data?.message || "Failed to update product quantity" };
        },
    });
}
export const useRemoveProductFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cartId) => removeProductFromCartApi(cartId),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["cart"]);
            return { message: data?.message || "Product removed from cart" };
        },
        onError: (error) => {
            return { message: error?.response?.data?.message || "Failed to remove product from cart" };
        },
    });
}
export const useSelectProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({cartId, selected}) => selectProductApi(cartId, { selected }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["cart"]);
            return { message: data?.message || "Product selected" };
        },
        onError: (error) => {
            return { message: "Failed to select product" };
        },
    });
}
export const useSelectAllProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ selected }) => selectAllProductApi({ selected }),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["cart"]);
            return { message: data?.message || "All products selected" };
        },
        onError: (error) => {
            return { message: error?.response?.data?.message || "Failed to select all products" };
        },
    });
}   
