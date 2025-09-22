import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getordersAdminApi,
  createproductAdminApi,
  getdashBoardStaticsAdminApi,
  getproductAdminApi,
  getcategoryAdminApi,
  uploadBulkProductApi,
  softDeleteAdminProductApi,
  deleteAdminProductPermanently,
  getproductByIdAdminApi,
  updateProductAdminApi,
  updateOrderAdminApi,
  getUsersAdminApi,
  createUserAdminApi,
  softDeleteUserAdminApi,
  hardDeleteUserAdminApi,
  getUserByIdAdminApi,
} from "../api/adminApi";
import toast from "react-hot-toast";

export const useAdminStatics = () =>
  useQuery({
    queryKey: ["admin", "dashboard-statics"],
    queryFn: getdashBoardStaticsAdminApi,
  });

export const useAdminOrders = (query) => {
  return useQuery({
    queryKey: ["admin", "orders", query],
    queryFn: () => getordersAdminApi(query),
  });
};
export const updateAdminOrder = () => {
  return useMutation({
    mutationFn: ({ id, updateBody }) => updateOrderAdminApi(id, updateBody),
  });
}
export const useAdminProducts = () => {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: getproductAdminApi,
  });
};
export const useAdminProductById = (id) => {
  return useQuery({
    queryKey: ["admin", "product", id],
    queryFn: () => getproductByIdAdminApi(id),
  });
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
      queryClient.invalidateQueries(["admin", "products"]);
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

    onMutate: async (productId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["admin", "products"] });

      // Snapshot the previous data
      const previousProducts = queryClient.getQueryData(["admin", "products"]);

      // Optimistically update
      queryClient.setQueryData(["admin", "products"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          results: oldData.results.map((p) =>
            p._id === productId ? { ...p, isDeleted: true } : p
          ),
        };
      });

      return { previousProducts };
    },

    // Rollback if API fails
    onError: (err, productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ["admin", "products"],
          context.previousProducts
        );
      }
    },

    // Always refetch after mutation
    onSettled: () => {
      queryClient.invalidateQueries(["admin", "products"]);
    },
  });
};

export const useDeleteProductPermanently = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminProductPermanently,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "products"] });
      const previousProduct = queryClient.getQueryData(["admin", "products"]);
      queryClient.setQueryData(["admin", "products"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          results: oldData.results.filter((item) => item._id != productId),
        };
      });
      return { previousProduct };
    },
    onError: (err, id, context) => {
      queryClient.setQueriesData(
        ["admin", "products"],
        context.previousProduct
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["admin", "products"]);
    },
  });
};

export const useAdminCategories = (product) => {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: getcategoryAdminApi,
    staleTime: 5 * 60 * 1000, // 5 min fresh
    cacheTime: 30 * 60 * 1000, // 30 min memory cache
    initialData: () => {
      // If we are editing a product and it has category
      if (product?.category) {
        return [
          {
            _id: product.category._id,
            name: product.category.name,
          },
        ];
      }
      return undefined;
    },
  });
};
export const useUsersAdmin = (query) => useQuery({
  queryKey: ["admin", "users", query],
  queryFn: () => getUsersAdminApi(query),
});
export const useUserById = (id) => useQuery({
  queryKey: ["admin", "user", id],
  queryFn: () => getUserByIdAdminApi(id),
});
export const useUserCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserAdminApi,
    onSuccess: () => {
      toast.success("User Created successfully");
      queryClient.invalidateQueries(["admin", "users"]);
    },
  })
}
export const useUserSoftDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => softDeleteUserAdminApi(id),
    onSuccess: () => {
      toast.success("User soft deleted successfully");
      queryClient.invalidateQueries(["admin", "users"]);
    },
  })
}
export const useUserHardDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => hardDeleteUserAdminApi(id),
    onSuccess: () => {
      toast.success("User hard delete successfully");
      queryClient.invalidateQueries(["admin", "users"]);
    },
  })
}