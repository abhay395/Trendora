import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddressStore from '../store/addressStore';
import useCartStore from '../store/cartStore';
import useOrderStore from '../store/orderStore';
import useUserStore from '../store/userStore';

import AddressSection from '../componente/AddressSection';
import CardForCheckout from '../componente/CardForCheckout';
import ProductNotFound from '../componente/ProductNotFound';
import OrderHistorySection from '../componente/OrderHistorySection';
import UserProfileSection from '../componente/UserProfileSection';

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
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">👤 Your Profile</h1>

      {/* 1. Basic Profile Info */}
      <UserProfileSection user={user} onEdit={() => alert('Edit profile coming soon!')} />

      {/* 2. Order Information */}
      <OrderHistorySection orders={order} />

      {/* 3. 🛒 Cart Overview */}
      <section className="mb-8 bg-white rounded-xl shadow-lg p-6">
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

      {/* 4. 🚚 Address Book */}
      <AddressSection />
    </div>
  );
};

export default Profile;
