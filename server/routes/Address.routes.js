import express from 'express'
import AddressController from '../controller/Address.controller.js';
import asyncWrapper from '../middleware/async.js';
import authenticationMiddleware from '../middleware/auth.js'
const addressRouter = express.Router();

addressRouter.get('/get', authenticationMiddleware, asyncWrapper(AddressController.getAllAddress))
addressRouter.post('/add', authenticationMiddleware, asyncWrapper(AddressController.addAddress))
addressRouter.put('/selecte/:addressId', authenticationMiddleware, asyncWrapper(AddressController.selectAddress))
addressRouter.put('/update/:addressId', authenticationMiddleware, asyncWrapper(AddressController.updateAddresssById))
addressRouter.delete('/delete/:addressId', authenticationMiddleware, asyncWrapper(AddressController.deleteAddressById))

export default addressRouter