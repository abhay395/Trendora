import authRouter from './Auth.routes.js';
import express from 'express'
import productRouter from './Product.routes.js';
import cartRoute from './Cart.routes.js';
import addressRouter from './Address.routes.js';
import orderRoute from './Order.routes.js';
const router = express.Router();
const routes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/product',
        route: productRouter
    },
    {
        path: '/cart',
        route: cartRoute
    },
    {
        path: '/address',
        route: addressRouter
    },
    {
        path: '/order',
        route: orderRoute
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router