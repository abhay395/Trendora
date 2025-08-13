import adminService from "../service/Admin.service.js"
import { sendSuccessMessage } from "../utils/helper.js"
import { pick } from "../utils/pick.js"

export default {
    getDashBoard: async (req, res) => {
        const result = await adminService.getDashBoard();
        sendSuccessMessage(res, 200, "Dashboard Data Fetched", result)
    },
    getUser: async (req, res) => {
        const filter = pick(req.query, ['search'])
        const option = pick(req.query, ["sortBy", "limit", "page"])
        const result = await adminService.getUser(filter, option)
        sendSuccessMessage(res, 200, "User fetched successfully", result)
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        let result = await adminService.getUserById(id);
        sendSuccessMessage(res, 200, "User fetched successfully", result);
    },
    createUser: async (req, res) => {
        const { body } = req;
        const result = await adminService.createUser(body);
        sendSuccessMessage(res, 200, "User Created successfully", result)
    },
    updateUser: async (req, res) => {
        const { body } = req;
        const { id } = req.params;
        const result = await adminService.updateUser(id, body);
        sendSuccessMessage(res, 200, "User Created successfully", result)

    },
    softeDeleteUser: async (req, res) => {
        const { id } = req.params;
        await adminService.softeDeleteUser(id);
        sendSuccessMessage(res, 200, "User soft deleted successfully")
    },
    hardDeleteUser: async (req, res) => {
        const { id } = req.params;
        await adminService.hardDeleteUser(id);
        sendSuccessMessage(res, 200, "User deleted successfully")
    },
    getOrder: async (req, res) => {
        const filter = pick(req.query, ['search', 'status', 'city'])// pending for city state 
        const option = pick(req.query, ["sortBy", "limit", "page"])
        const result = await adminService.getOrder(filter, option);
        sendSuccessMessage(res, 200, "Orders fetched successfully", result)
    },
    getOrderById: async (req, res) => {
        const { id } = req.params;
        const result = await adminService.getOrderById(id);
        sendSuccessMessage(res, 200, "Order fetched successfully", result)
    },
    updateOrder: async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const result = await adminService.updateOrder(id, body);
        sendSuccessMessage(res, 200, "Order updated successfully", result)
    },
    createProduct: async (req, res) => {
        const { body } = req;
        const result = await adminService.createProduct(body);
        sendSuccessMessage(res, 200, "Product created successfully", result)
    },
    getProducts: async (req, res) => {
        const filter = pick(req.query, ['search', 'category', 'gender', 'size', 'isDeleted']);
        const option = pick(req.query, ["sortBy", "limit", "page"]);
        const result = await adminService.getProducts(filter, option);
        sendSuccessMessage(res, 200, "Products fetched successfully", result)
    },
    getProductById: async (req, res) => {
        const { id } = req.params;
        const result = await adminService.getProductById(id);
        sendSuccessMessage(res, 200, "Product fetched successfully", result)
    },
    updateProductId: async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const result = await adminService.updateProductId(id, body);
        sendSuccessMessage(res, 200, "Product updated successfully", result);
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        await adminService.deleteProduct(id);
        sendSuccessMessage(res, 200, "Product deleted successfully");
    }

}