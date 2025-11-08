import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductList from './pages/ProductList'
import RootLayout from './RootLayout'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import ProductDetaile from './pages/ProductDetaile'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetaile from './pages/OrderDetaile'
import Dashbord from './pages/Admin/Dashboard'
import useCartStore from './store/cartStore'
import Dashboard from './pages/Admin/Dashboard'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './componente/ProtectedRoute'
import Unauthorized from './pages/AccessDenied'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminProduct from './pages/Admin/AdminProduct'
import AddProduct from './pages/Admin/AddProduct'
import EditProduct from './pages/Admin/EditProduct'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminUser from './pages/Admin/AdminUser'
import AdminSetting from './pages/Admin/AdminSetting'
import CreateUser from './pages/Admin/CreateUser'
import UserDetails from './pages/Admin/UserDetails'
import { useCart } from './hooks/useCart'

function App() {
  const location = useLocation()
  const { data: cart } = useCart();

  console.log(cart)

  return (
    // <AnimatePresence mode="sync">
    <Routes location={location} key={location.pathname}>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<ProductList />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<ProtectedRoute allowedRole={['user', 'admin', 'superadmin']} ><Cart /></ProtectedRoute>} />
        {/* <Route path="logout" element={<Logout />} /> */}
        <Route path="product/:id" element={<ProductDetaile />} />
        <Route path="payment-done/:id" element={<ProtectedRoute allowedRole={['user', 'admin', 'superadmin']} ><PaymentSuccess /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute allowedRole={['user', 'admin', 'superadmin']} ><Profile /></ProtectedRoute>} />
        <Route path="orders" element={<ProtectedRoute allowedRole={['user', 'admin', 'superadmin']} ><Orders /></ProtectedRoute>} />
        <Route path="order/:id" element={<ProtectedRoute allowedRole={['user', 'admin', 'superadmin']} ><OrderDetaile /></ProtectedRoute>} />
      </Route>
      <Route path="checkout" element={<ProtectedRoute allowedRole={['user', 'admin', 'superadmin']} ><Checkout /></ProtectedRoute>} />
      <Route path="*" element={<PageNotFound />} />
      {/* Admin Routes - Separate from main layout */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="admin" element={
        <ProtectedRoute allowedRole={['admin', 'superadmin']}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="" element={<Dashboard />} />
        <Route path="products" element={<AdminProduct />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUser />} />
        <Route path="users/add-user" element={<CreateUser />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="settings" element={<AdminSetting />} />
        <Route path="order/:id" element={<OrderDetaile />} />
        <Route path="product/edit/:id" element={<EditProduct />} />
      </Route>

    </Routes>
    // </AnimatePresence>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}
