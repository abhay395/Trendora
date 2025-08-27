import { sendSuccessMessage } from "../utils/helper.js"
import AddressService from "../services/Address.service.js"
export default {
    getAllAddress: async (req, res) => {
        const { _id } = req.user
        let result = await AddressService.getAllAddress(_id)
        sendSuccessMessage(res, 200, "Address is fetched successfully", result)
    },
    selectAddress: async (req, res) => {
        const { addressId } = req.params
        const { _id } = req.user
        const result = await AddressService.selectAddress(addressId, _id)
        sendSuccessMessage(res, 200, "Address is Selected successfully", result)
    },
    addAddress: async (req, res) => {
        const { body } = req;
        const { _id } = req.user
        let result = await AddressService.addAddress({ ...body, userId: _id });
        sendSuccessMessage(res, 201, "Address is Added successfully", result)
    },
    updateAddresssById: async (req, res) => {
        const { addressId } = req.params;
        const result = await AddressService.updateAddresssById(addressId, req.body);
        sendSuccessMessage(res, 200, "Address is Updated successfully", result)
    },
    deleteAddressById: async (req, res) => {
        const { addressId } = req.params;
        await AddressService.deleteAddressById(addressId);
        sendSuccessMessage(res, 200, "Address is Deleted successfully")
    }
}