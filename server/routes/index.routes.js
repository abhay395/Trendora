import authRouter from './Auth.routes.js';
import express from 'express'
const router = express.Router();
const routes = [
    {
        path: '/auth',
        route: authRouter
    }
]

routes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router