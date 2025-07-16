import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
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
function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter(
    createRoutesFromElements(
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
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App
