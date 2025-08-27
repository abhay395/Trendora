import authRouter from './Auth.routes.js';
import express from 'express'
import productRouter from './Product.routes.js';
import cartRoute from './Cart.routes.js';
import addressRouter from './Address.routes.js';
import orderRoute from './Order.routes.js';
import userRouter from './User.routes.js';
import adminRoute from './Admin.routes.js';
import categoryRoute from './Category.routes.js';

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
    },
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/admin',
        route: adminRoute
    },
    {
        path: '/category',
        route: categoryRoute
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router