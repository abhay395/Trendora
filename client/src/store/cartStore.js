import { create } from "zustand";
import axios from "axios";
const BASEURL = import.meta.env.VITE_API_URL;
const CARTURL = `${BASEURL}/cart`
const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});
const calculateTotalPrice = (cart) => (cart.reduce((sum, item) => sum + item.totalPrice, 0))

const useCartStore = create((set, get) => ({
    cart: [],
    price: 0,
    totalPrice: 0,
    isLoading: false,
    error: null,
    fetchCart: async () => {
        try {
            set({ isLoading: true, error: null })
            let response = await axios.get(`${CARTURL}/get-all`, {
                headers: authHeader()
            })
            let totalPrice = calculateTotalPrice(response.data.result)
            // console.log(totalPrice)
            set({ isLoading: false, cart: response.data.result, totalPrice })
        } catch (error) {
            set({ isLoading: false, error: { message: error?.response?.data?.message || "Cart not Fetched" } })
        }
    },
    addProductCart: async ({ productId, quantity, size }) => {
        try {
            set({ isLoading: true, error: null });
            let body = { productId, quantity, size }
            let response = await axios.post(`${CARTURL}/create`, body, {
                headers: authHeader()
            })
            let result = response.data.result;
            let currentCart = get().cart;
            let updatedCart = [...currentCart, result]
            let totalPrice = calculateTotalPrice(updatedCart)
            set({ isLoading: false, cart: updatedCart, totalPrice })
        } catch (error) {
            set({ isLoading: false, error: { message: 'Product Not added On Cart' } })
        }
    },
    updateProductQuantity: async ({ cartId, increase }) => {
        try {
            set({ isLoading: true, error: null });
            console.log(get().cart[0]._id)
            let selectedCart = get().cart.find(item => item._id === cartId);
            // if (selectedCart) {
            const size = selectedCart.size;
            const sizes = selectedCart.productId.sizes;
            let quantity = selectedCart.quantity
            const availableQty = sizes?.[String(size).toUpperCase()]; // Optional chaining to avoid crash
            if (increase) {
                if (quantity <= availableQty) {
                    quantity++
                }
            } else {
                if (quantity > 1) quantity--
            }
            // console.log("Selected Size:", size);
            // console.log("Sizes:", sizes);
            // console.log("Available Qty:", availableQty);
            // }
            let body = { quantity };
            let response = await axios.post(`${CARTURL}/update-quantity/${cartId}`, body, {
                headers: authHeader()
            })
            let updatedCart = get().cart.map(item => {
                if (item._id === cartId) {
                    item.quantity = response.data.result.quantity;
                    item.totalPrice = item.productId.price * item.quantity;
                }
                return item;
            });

            set({ isLoading: false, cart: updatedCart });
            // }
            // else {
            //     quantity--
            // }
            // let currentCart = get().cart;
            // console.log(updatedCart)
        } catch (error) {
            console.log(error)
            set({ isLoading: false });
        }
    },
    removeProductFromCart: async (cartId) => {
        try {
            set({ isLoading: true, error: null })
            await axios.delete(`${CARTURL}/remove-product/${cartId}`, {
                headers: authHeader()
            })
            let updatedCart = get().cart.filter(item => item._id != cartId)
            let totalPrice = calculateTotalPrice(updatedCart);
            set({ isLoading: false, cart: updatedCart, totalPrice })
        } catch (error) {
            set({
                isLoading: false,
                error: { message: error?.response?.data?.message || "Failed to remove product" },
            });
        }
    }
}))

export default useCartStore