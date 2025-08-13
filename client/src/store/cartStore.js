import { create } from "zustand";
import toast from "react-hot-toast";
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
                    let totalPrice = calculateTotalPrice(response.data.result)
                    set({ cart: response.data.result, totalPrice, totalProduct: response.data.result.length })
                    set({ isLoading: false })
                } catch (error) {
                    set({ isLoading: false, error: { message: error?.response?.data?.message || "Cart not Fetched" } })
                }
            },
            addProductCart: async ({ productId, quantity, size }) => {
                let check = get().cart.find((item) => item?.productId._id == productId && item.size == size)
                if (check) {
                    toast.error("This product is already added")
                    return;
                }
                try {
                    set({ isLoading: true, error: null });
                    let body = { productId, quantity, size }
                    toast.success("Product added to cart! ")
                    let response = await addProductCartApi(body)
                    let result = response.data.result;
                    let currentCart = get().cart;
                    let updatedCart = [...currentCart, result]
                    let totalPrice = calculateTotalPrice(updatedCart)
                    set({ isLoading: false, cart: updatedCart, totalPrice, totalProduct: get().totalProduct + 1 })
                } catch (error) {
                    set({ isLoading: false, error: { message: 'Product Not added On Cart' } })
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
                    console.log(error)
                }
            },
            selectProduct: async (cartId, selected) => {
                try {
                    let updateCart = get().cart.map((item) => item._id == cartId ? { ...item, selected } : item)
                    set({ cart: updateCart })
                    await selectProductApi(cartId, { selected })
                } catch (error) {
                    console.log(error)
                }
            },
            selectAllProduct: async (selected) => {
                try {
                    let updateCart = get().cart.map((item) => ({ ...item, selected }))
                    set({ cart: updateCart })
                    let response = await selectAllProductApi({ selected })
                    console.log(response)
                } catch (error) {
                    console.log(error)
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