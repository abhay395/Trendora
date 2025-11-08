import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { addProductCartApi, fetchCartApi, removeProductFromCartApi, selectAllProductApi, selectProductApi, updateProductQuantityApi } from "../api/cartApi";
const calculateTotalPrice = (cart) => (cart.reduce((sum, item) => sum + item.totalPrice, 0))

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            price: 0,
            totalPrice: 0,
            isLoading: true,
            error: null,
            totalProduct: 0,
            resetCart: () => {
                set({
                    cart: [],
                    price: 0,
                    totalPrice: 0,
                    isLoading: false,
                    error: null,
                    totalProduct: 0,
                })
            },
            fetchCart: async () => {
                try {
                    set({ isLoading: true, error: null })
                    let response = await fetchCartApi()
                    let totalPrice = calculateTotalPrice(response)
                    set({ cart: response, totalPrice, totalProduct: response.length })
                    set({ isLoading: false })
                } catch (error) {
                    set({ isLoading: false, error: { message: error?.response?.data?.message || "Cart not Fetched" } })
                }
            },
            addProductCart: async ({ productId, quantity, size }) => {
                let check = get().cart.find((item) => item?.productId._id == productId && item.size == size)
                if (check) {
                    return { message: "This product is already added" };
                }
                try {
                    set({ isLoading: true, error: null });
                    let body = { productId, quantity, size }
                    let response = await addProductCartApi(body);
                    if (!response) {
                        set({ isLoading: false, error: { message: "Failed to add product to cart" } })
                        return { message: "Failed to add product to cart" };
                    }
                    let currentCart = get().cart;
                    let updatedCart = [...currentCart, response]
                    let totalPrice = calculateTotalPrice(updatedCart)
                    set({ isLoading: false, cart: updatedCart, totalPrice, totalProduct: get().totalProduct + 1 })
                    return { message: "Product added to cart! " };
                } catch (error) {
                    set({ isLoading: false, error: { message: error?.response?.data?.message || "Failed to add product to cart" } })
                    return { message: error?.response?.data?.message || "Failed to add product to cart" };
                }
            },
            updateProductQuantity: async ({ cartId, quantity }) => {
                try {
                    let updatedCart = get().cart.map(item => {
                        if (item._id === cartId) {
                            item.quantity = quantity;
                            item.totalPrice = item.productId.price * quantity;
                        }
                        return item;
                    });
                    set({ cart: updatedCart });
                    await updateProductQuantityApi(cartId, { quantity })
                } catch (error) {
                    set({ isLoading: false, error: { message: error?.response?.data?.message || "Product Quantity Not updated" } })
                }
            },
            selectProduct: async (cartId, selected) => {
                try {
                    let updateCart = get().cart.map((item) => item._id == cartId ? { ...item, selected } : item)
                    set({ cart: updateCart })
                    await selectProductApi(cartId, { selected })
                } catch (error) {
                    set({ isLoading: false, error: { message: error?.response?.data?.message || "Product Not selected" } })
                }
            },
            selectAllProduct: async (selected) => {
                try {
                    let updateCart = get().cart.map((item) => ({ ...item, selected }))
                    set({ cart: updateCart })
                    let response = await selectAllProductApi({ selected })
                    return response;
                } catch (error) {
                    set({ isLoading: false, error: { message: error?.response?.data?.message || "Product Not selected" } })
                    return false;
                }
            },
            removeProductFromCart: async (cartId) => {
                try {
                    let updatedCart = get().cart.filter(item => item._id != cartId)
                    let totalPrice = calculateTotalPrice(updatedCart);
                    set({ isLoading: false, cart: updatedCart, totalPrice, totalProduct: get().totalProduct - 1 })
                    await removeProductFromCartApi(cartId)
                } catch (error) {
                    set({
                        error: { message: error?.response?.data?.message || "Failed to remove product" },
                        isLoading: false,
                    });
                }
            },
        }),
        {
            name: "cart-storage", // ✅ key in localStorage
            partialize: (state) => ({
                cart: state.cart,
                totalPrice: state.totalPrice,
                totalProduct: state.totalProduct,
            }),
        }
    )

)

export default useCartStore