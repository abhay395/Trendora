import CartService from "../service/Cart.service.js"
import { sendSuccessMessage } from "../utils/helper.js"

export default {
    createCart: async (req, res) => {
        const { _id } = req.user;
        // console.log(req.user)
        const {productId,quantity} = req.body
        const result = await CartService.createCart(_id, productId, quantity);
        sendSuccessMessage(res, 201, "Product Added In Cart Successfully", result)
    },
    getCartProduct: async (req, res) => {
        const { _id } = req.user
        const result = await CartService.getCartProduct(_id);
        sendSuccessMessage(res, 200, "Cart product fetched successfully", result)
    },
    updateCartQuantity: async (req, res) => {
        const { cartId } = req.params
        const { quantity } = req.body;
        const result = await CartService.updateCartQuantity(cartId, quantity);
        sendSuccessMessage(res, 200, "Cart Updated successfully", result)
    },
    RemoveProductFromCart: async (req, res) => {
        const { cartId } = req.params
        await CartService.RemoveProductFromCart(cartId);
        sendSuccessMessage(res, 200, "Cart Product deleted successfully", null)
    }
}