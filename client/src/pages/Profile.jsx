import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useOrderStore from '../store/orderStore';
import useUserStore from '../store/userStore';

import AddressSection from '../componente/AddressSection';
import CardForCheckout from '../componente/CardForCheckout';
import ProductNotFound from '../componente/ProductNotFound';
import OrderHistorySection from '../componente/OrderHistorySection';
import UserProfileSection from '../componente/UserProfileSection';
import { motion } from 'framer-motion'

const Profile = () => {
  const { cart, totalPrice, totalProduct, fetchCart, isLoading: cartLoading } = useCartStore();
  const { order, fetchOrderList, isLoading: orderLoading } = useOrderStore();
  const { user, fetchUserProfile, isLoading: userLoading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchOrderList();
    fetchUserProfile();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
      }}

      className="max-w-5xl mx-auto px-4 py-6">
      <motion.h1 variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-3xl font-bold text-gray-900 mb-6">👤 Your Profile</motion.h1>

      {/* 1. Basic Profile Info */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
        <UserProfileSection user={user} onEdit={() => alert('Edit profile coming soon!')} />
      </motion.div>
      {/* 2. Order Information */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
        <OrderHistorySection orders={order} />
      </motion.div>
      {/* 3. 🚚 Address Book */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
        <AddressSection />
      </motion.div>
      {/* 4. 🛒 Cart Overview */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
        <section className="my-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">🛒 Your Cart</h2>

          {cartLoading ? (
            <div className="text-gray-600">Loading your cart...</div>
          ) : cart.length === 0 ? (
            <ProductNotFound message={"Cart is empty"} />
          ) : (
            <div>
              <div className="text-gray-800 mb-1">Total Items: <span className="font-medium">{totalProduct}</span></div>
              <div className="text-gray-800 mb-3">Total Price: <span className="font-medium">₹{totalPrice}</span></div>

              <ul className="space-y-3">
                {cart.slice(0, 3).map((item, idx) => (
                  <CardForCheckout key={item._id} item={item} index={idx} length={cart.length} />
                ))}
              </ul>

              <button
                onClick={() => navigate('/cart')}
                className="mt-4 inline-block bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
              >
                Go to Cart
              </button>
            </div>
          )}
        </section>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
