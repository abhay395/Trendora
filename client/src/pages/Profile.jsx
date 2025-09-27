import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useOrderStore from '../store/orderStore';
import useUserStore from '../store/userStore';

import AddressSection from '../componente/AddressSection';
import CardForCheckout from '../componente/CardForCheckout';
import ProductNotFound from '../componente/ProductNotFound';
import OrderHistorySection from '../componente/OrderHistorySection';
import UserProfileSection from '../componente/UserProfileSection';
import { motion } from 'framer-motion';

// Skeleton Loader Component
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

const Profile = () => {
  const { userDetails, fetchUserAllDetails, updateUserProfile, isLoading } = useUserStore();
  // const isLoading = true
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAllDetails();
  }, []);

  useEffect(() => {
    if (userDetails) {
      setUser({
        name: userDetails.name,
        email: userDetails.email,
        isImage: userDetails.isImage,
        image: userDetails.image,
        bio: userDetails.bio,
        phone: userDetails.phone,
      });
      setOrders(userDetails.orders || []);
      setCart(userDetails.carts || []);
      setSelectedAdress(userDetails.addresses?.find((item) => item.selected)?._id || null);
    }
  }, [userDetails,isLoading]);

  const onEdit = (data) => {
    console.log(data)
    const form = new FormData();
    for (let [key, value] of Object.entries(data)) {
      if (key != 'image') {
        form.append(key, value)
      }
    }
    updateUserProfile(form);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
      }}
      className="max-w-5xl mx-auto px-4 py-6"
    >
      <motion.h1
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="text-3xl font-bold text-gray-900 mb-6"
      >
        👤 Your Profile
      </motion.h1>

      {/* 1. Basic Profile Info */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
        <UserProfileSection user={user} onEdit={onEdit} isLoading={isLoading} />
      </motion.div>

      {/* 2. Order Information */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
        <OrderHistorySection orders={orders} isLoading={isLoading} />
      </motion.div>

      {/* 3. 🚚 Address Book */}
      <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
        {isLoading ? (
          <div className="w-full px-5 py-6 rounded-xl border border-gray-200 space-y-1">
            <p className="font-semibold text-xl text-gray-900 mb-5">Delivery Address</p>
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <AddressSection select={selectedAddress} setSelect={setSelectedAdress} title={"Delivery Address"} />
        )}
      </motion.div>

      {/* 4. 🛒 Cart Overview */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
      >
        <section className="my-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            🛒 Your Cart
          </h2>

          <div>
            {isLoading ? (
              <ul className="space-y-3">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-start py-4 pl-4 gap-4 w-full relative"
                  >
                    {/* Skeleton for image */}
                    <Skeleton className="h-28 w-[15rem] rounded-lg" />

                    {/* Skeleton for content */}
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between items-center pt-6">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {cart.slice(0, 3).map((item, idx) => (
                  <CardForCheckout
                    key={item._id}
                    item={item}
                    index={idx}
                    length={cart.length}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>
      </motion.div>

    </motion.div>
  );
};

export default Profile;
