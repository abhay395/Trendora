import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

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
import useCartStore from './store/cartStore'
import { useEffect } from 'react'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetaile from './pages/OrderDetaile'

function App() {
  const location = useLocation()
  const {fetchCart} = useCartStore()
    useEffect(() => {
      fetchCart()
    }, [])
  return (
    // <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<ProductList />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="logout" element={<Logout />} />
          <Route path="product/:id" element={<ProductDetaile />} />
          <Route path="payment-done/:id" element={<PaymentSuccess />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<OrderDetaile />} />
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
