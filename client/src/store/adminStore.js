import { create } from "zustand";
import toast from "react-hot-toast";
import { getordersAdminApi, createproductAdminApi, getdashBoardStaticsAdminApi, getproductAdminApi, getcategoryAdminApi, uploadBulkProductApi, softDeleteAdminProductApi, deleteAdminProductPermanently, getproductByIdAdminApi } from "../api/adminApi";

const useAdminStore = create((set, get) => ({
    isStaticsLoading: true,
    isOrdersLoading: true,
    isProductLoading: true,
    isCategoriesLoading: true,
    categories: null,
    statics: null,
    recentOrder: [],
    productData: {
        product: null,
        page: 1,
        limit: 10,
        totalPages: 1,
    },
    selecetedProduct: null,
    error: null,
    fetchStaticsInDashboard: async () => {
        set({ isStaticsLoading: true, error: null });
        try {
            const [staticsRes, recentOrderRes] = await Promise.all([
                getdashBoardStaticsAdminApi(),
                getordersAdminApi(),
            ]);
            set({
                statics: staticsRes?.data?.result,
                recentOrder: recentOrderRes?.data?.result?.results || [],
                isStaticsLoading: false,
            });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isStaticsLoading: false });
        }
    },
    fetchOrdersInAdmin: async () => {
        set({ isOrdersLoading: true, error: null });
        try {
            const response = await getordersAdminApi();
            set({ orders: response.data.result, isOrdersLoading: false });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isOrdersLoading: false });
        }
    },
    fetchProductsInAdmin: async () => {
        set({ isProductLoading: true, error: null });
        try {
            const response = await getproductAdminApi();
            console.log(response)
            // set((state) => ({ //? reasone of is not a function bug 
            //     productData: {
            //         ...state.productData,
            //         product: response.data.result.results,
            //         totalPages: response.data.result.totalPages,
            //     }
            // }), { isProductLoading: false });
            set((state) => ({
                productData: {
                    ...state.productData,
                    product: response.data.result.results,
                    totalPages: response.data.result.totalPages,
                },
                isProductLoading: false
            }));
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isProductLoading: false });
        }
    },
    fetchProductsInAdminById: async (id) => {
        set({ isProductLoading: true, error: null, selecetedProduct: null });
        try {

            const response = await getproductByIdAdminApi(id);
            set({
                selecetedProduct: response.data.result,
                isProductLoading: false
            });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isProductLoading: false });
        }
    },
    fetchCategoriesInAdmin: async () => {
        set({ isCategoriesLoading: true, error: null });
        try {
            const response = await getcategoryAdminApi();
            set({ categories: response.data.result.results, isCategoriesLoading: false });
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
            set({ error: message, isCategoriesLoading: false });
        }
    },
    AddProductInAdmin: async (data) => {
        set({ isProductLoading: true, error: null })
        try {
            const response = await createproductAdminApi(data);
            set((state) => ({
                productData: {
                    ...state.productData,
                    product: response.data.result
                },
                isProductLoading: false
            }))
            // set({ isProductLoading: true, error: null })
            console.log(response)
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong"
            set({ error: message, isProductLoading: false })
        }
    },
    bulkProductUpload: async (data) => {
        set({ isProductLoading: true, error: null })
        try {
            const response = await uploadBulkProductApi(data);
            console.log(response)
            toast.success("Product added Successfully")
            set((state) => ({
                productData: {
                    ...state.productData,
                    product: {
                        ...state.productData.product,
                        ...response.data.result
                    }
                }
            }))
            // set({ isProductLoading: false, error: null })
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong"
            set({ error: message, isProductLoading: false })
            return false
        }
    },
    softDeleteProduct: async (id) => {
        try {
            await softDeleteAdminProductApi(id)
            let product = get()?.productData?.product
            product = product.map(item => (item._id == id ? { ...item, isDeleted: true } : item))
            set((state) => ({
                productData: {
                    ...state.productData,
                    product: product
                }
            }))
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong"
            set({ error: message })
            toast.error(message)
        }
    },
    deleteProductPermanently: async (id) => {
        try {
            let product = get()?.productData?.product;
            product = product.filter(item => item._id != id);
            set((state) => ({
                productData: {
                    ...state.productData,
                    product: product
                }
            }))
            await deleteAdminProductPermanently(id);
        } catch (error) {
            const message = error?.data?.message || error?.message || "Something went wrong"
            set({ error: message })
            toast.error(message)
        }
    }
}));

export default useAdminStore;
