import CartService from "../services/Cart.service.js"
import { sendSuccessMessage } from "../utils/helper.js"

export default {
    createCart: async (req, res) => {
        const { _id } = req.user;
        const { productId, quantity, size } = req.body
        const result = await CartService.createCart(_id, productId, quantity, size);
        sendSuccessMessage(res, 201, "Product Added In Cart Successfully", result)
    },
    getCartProduct: async (req, res) => {
        const { _id } = req.user
        const result = await CartService.getCartProduct(_id);
        sendSuccessMessage(res, 200, "Cart product fetched successfully", result)
    },
    updateCart: async (req, res) => {
        const { cartId } = req.params
        const result = await CartService.updateCart(cartId, req.body);
        sendSuccessMessage(res, 200, "Cart Updated successfully", result)
    },
    updateManyCartProduct: async (req, res) => {
        const { _id } = req.user
        const result = await CartService.updateManyCartProduct(_id, req.body)
        sendSuccessMessage(res, 200, "Cart Products Updated successfully", result)
    },
    RemoveProductFromCart: async (req, res) => {
        const { cartId } = req.params
        await CartService.RemoveProductFromCart(cartId);
        sendSuccessMessage(res, 200, "Cart Product deleted successfully", null)
    }
}