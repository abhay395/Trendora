import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProductApi, fetchProductByIdApi, fetchProductFiltersApi, fetchProductReviewApi, addProductReviewApi, addhelpfulInReviewApi } from '../api/productApi'


export const useProducts = (filter) =>
    useQuery({
        queryKey: ["products", filter],
        queryFn: () => fetchProductApi(filter).then(res => res.data.result.results),
    });

export const useProductById = (id) =>
    useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductByIdApi(id).then((res) => res.data.result),
        enabled: !!id, // only run if id exists
    });

export const useProductReviews = (id, options = "") =>
    useQuery({
        queryKey: ["productReviews", id, options],
        queryFn: () => fetchProductReviewApi(id, options).then((res) => res.data.result.results),
        enabled: !!id,
    });
export const useFetchProductFilters = () =>
    useQuery({
        queryKey: ['filters'],
        queryFn: () => fetchProductFiltersApi().then(res => res.data.result)
    })
export const useAddReview = () => {
    return useMutation({
        mutationFn: (form) => addProductReviewApi(form),
    });

}

export const useAddHelpfullInReview = () => {
    const queryClient = useQueryClient(); // ✅ Correct

    return useMutation({
        mutationFn: (reviewId) => addhelpfulInReviewApi(reviewId).then(res => res.data.result),

        onSuccess: (data) => {
            queryClient.setQueryData(["productReviews"], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map((review) =>
                        review._id === data._id
                            ? { ...data }   // <- Replace with API response
                            : review
                    ),
                };
            });
        }

    });
};