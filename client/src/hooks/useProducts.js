import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchProductApi,
  fetchProductByIdApi,
  fetchProductFiltersApi,
  fetchProductReviewApi,
  addProductReviewApi,
  addhelpfulInReviewApi,
} from "../api/productApi";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductApi().then((res) => res.results),
    staleTime: 1000 * 60 * 10,
  });
export const useProductsFilterd = (filter) =>
  useQuery({
    queryKey: ["filteredProduct", filter],
    queryFn: () =>
      fetchProductApi(filter).then((res) => res.results),
  });
export const useProductById = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductByIdApi(id).then((res) => res),
    enabled: !!id, // only run if id exists
    staleTime: 1000 * 60 * 10,
  });

export const useProductReviews = (id, options = "", page) =>
  useQuery({
    queryKey: ["productReviews", id, options, page],
    queryFn: () =>
      fetchProductReviewApi(id, options, page).then((res) => res),
    enabled: !!id,
  });
export const useFetchProductFilters = () =>
  useQuery({
    queryKey: ["filters"],
    staleTime: 1000 * 60 * 10,
    queryFn: () => fetchProductFiltersApi().then((res) => res),
  });
export const useAddReview = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (form) => addProductReviewApi(form),
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['product', id])
      queryClient.invalidateQueries(['productReviews', id])
    }
  });
};

export const useAddHelpfullInReview = (productId, sortBy, currentPage) => {
  const queryClient = useQueryClient(); // ✅ Correct

  return useMutation({
    mutationFn: (reviewId) =>
      addhelpfulInReviewApi(reviewId).then((res) => res),

    onSuccess: (data) => {
      queryClient.setQueryData(["productReviews", productId, sortBy, currentPage], (old) => {
        console.log(old, data)
        if (!old) return old;

        return {
          ...old,
          results: old.results.map((review) =>
            review._id === data._id
              ? { ...data } // <- Replace with API response
              : review
          ),
        };
      });
    },
  });
};
