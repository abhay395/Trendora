import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
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
    totalProduct: 0,
    fetchCart: async () => {
        try {
            set({ isLoading: true, error: null })
            let response = await axios.get(`${CARTURL}/get-all`, {
                headers: authHeader()
            })
            let totalPrice = calculateTotalPrice(response.data.result)
            set({ isLoading: false, cart: response.data.result, totalPrice, totalProduct: response.data.result.length })
        } catch (error) {
            set({ isLoading: false, error: { message: error?.response?.data?.message || "Cart not Fetched" } })
        }
    },
    addProductCart: async ({ productId, quantity, size }) => {
        let check = get().cart.find((item) => item?.productId._id == productId && item.size == size)
        if (check) {
            return
        }
        try {
            set({ isLoading: true, error: null });
            let body = { productId, quantity, size }
            toast.success("Product added to cart! ")
            let response = await axios.post(`${CARTURL}/create`, body, {
                headers: authHeader()
            })
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
            await axios.put(`${CARTURL}/update/${cartId}`, { quantity }, {
                headers: authHeader()
            })
        } catch (error) {
            console.log(error)
        }
    },
    selectProduct: async (cartId, selected) => {
        try {
            let updateCart = get().cart.map((item) => item._id == cartId ? { ...item, selected } : item)
            set({ cart: updateCart })
            await axios.put(`${CARTURL}/update/${cartId}`, { selected }, {
                headers: authHeader()
            })
        } catch (error) {
            console.log(error)
        }
    },
    selectAllProduct: async (selected) => {
        try {
            let updateCart = get().cart.map((item) => ({ ...item, selected }))
            set({ cart: updateCart })
            let response = await axios.put(`${CARTURL}/update-many`, { selected }, {
                headers: authHeader()
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    },
    removeProductFromCart: async (cartId) => {
        try {
            // set({ isLoading: true, error: null })
            let updatedCart = get().cart.filter(item => item._id != cartId)
            let totalPrice = calculateTotalPrice(updatedCart);
            set({ isLoading: false, cart: updatedCart, totalPrice, totalProduct: get().totalProduct - 1 })
            await axios.delete(`${CARTURL}/remove-product/${cartId}`, {
                headers: authHeader()
            })
        } catch (error) {
            set({
                error: { message: error?.response?.data?.message || "Failed to remove product" },
            });
        }
    }
}))

export default useCartStore