import adminService from "../service/admin.service.js"
import { sendSuccessMessage } from "../utils/helper.js"
import { pick } from "../utils/pick.js"

export default {
    getUser: async (req, res) => {
        const filter = pick(req.query, ['search'])
        const option = pick(req.query, ["sortBy", "limit", "page"])
        const result = await adminService.getUser(filter, option)
        sendSuccessMessage(res, 200, "User fetched successfully", result)
    },
    getUserById: async (req,res) => {
      const {id} = req.params;
      let result = await adminService.getUserById(id);
      sendSuccessMessage(res, 200, "User fetched successfully", result);
    },
    createUser: async (req, res) => {
        const { body } = req;
        result = await adminService.createUser(body);
        sendSuccessMessage(res, 200, "User Created successfully", result)
    },
    updateUser: async (req, res) => {
        const { body } = req;
        const { id } = req.params
        result = await adminService.updateUser(id, body);
        sendSuccessMessage(res, 200, "User Created successfully", result)

    },
    softeDeleteUser: async (req, res) => {

    },
    hardDeleteUser: async (req, res) => {
        const { id } = req.params;
        await adminService.hardDeleteUser(id);
        sendSuccessMessage(res, 200, "User deleted successfully", result)
    },
    getOrder: async (req, res) => {

    },
    getOrderById: async (req, res) => {

    },
    updateOrder: async (req, res) => {

    },
    createProduct: async (req, res) => {

    },
    getProducts: async (req, res) => {

    },
    getProductById: async (req, res) => {

    },
    updatePorductId: async (req, res) => {

    },
    deleteProduct: async (req, res) => {

    }

}