import OrderService from "../services/Order.service.js"
import { sendSuccessMessage } from "../utils/helper.js"
export default {
    checkoutProduct: async (req, res) => {
        const { _id } = req.user
        const { paymentMethod } = req.body;
        const result = await OrderService.checkoutProduct(_id, paymentMethod);
        sendSuccessMessage(res, 201, "Order placed successfully", result)
    },
    getOrders: async (req, res) => {
        const { _id } = req.user
        const result = await OrderService.getOrders(_id);
        sendSuccessMessage(res, 200, "Order history fetched successfully", result)
    },
    getOrderById: async (req, res) => {
        const { orderId } = req.params;
        console.log(req.params,orderId)
        const result = await OrderService.getOrderById(orderId)
        sendSuccessMessage(res, 200, "Order history fetched successfully", result);
    },
    createOrder:async(req,res)=>{
        
    }
}