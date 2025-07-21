import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set) => ({
    cart: [],
    price: 0,
    isLoading: false,
    error: null,
    fetchCart: async () => {
        set({ isLoading: true, error: null })
        let response = await axios.get("http://localhost:3000/api/v1/cart/get-cart", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        set({ isLoading: false, cart: response.data.result })
    }
}))

export default useCartStore