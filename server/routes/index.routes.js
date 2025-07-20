import authRouter from './Auth.routes.js';
import express from 'express'
import productRouter from './Product.routes.js';
import cartRoute from './Cart.routes.js';
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
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router