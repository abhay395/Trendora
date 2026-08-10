
import React, { useEffect, useState } from 'react';
import AddressSection from '../components/AddressSection';
import CardForCheckout from '../components/CardForCheckout';
import OrderHistorySection from '../components/OrderHistorySection';
import UserProfileSection from '../components/UserProfileSection';
import { motion } from 'framer-motion';
import { useUser, useUserUpdate } from '../hooks/useUser';
import toast from 'react-hot-toast';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-100 ${className}`} />
);

const SectionWrapper = ({ title, children }) => (
  <div className="border border-gray-200 bg-white mb-6">
    {title && (
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">{title}</h2>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

const Profile = () => {
  const { data: userDetails, isLoading } = useUser();
  const { mutateAsync: updateUserProfile, status } = useUserUpdate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState(null);

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
  }, [userDetails, isLoading]);

  const onEdit = (data) => {
    const form = new FormData();
    for (let [key, value] of Object.entries(data)) {
      if (key != 'image') form.append(key, value);
    }
    toast.promise(updateUserProfile(form), {
      loading: 'Updating profile...',
      success: 'Profile updated successfully!',
      error: 'Error updating profile',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-10 mt-16 font-outfit"
    >
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-black text-black tracking-tighter uppercase">Your Profile</h1>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">
          Manage your account, orders & addresses
        </p>
      </div>

      <SectionWrapper title="Account Info">
        <UserProfileSection user={user} onEdit={onEdit} isLoading={isLoading} status={status} />
      </SectionWrapper>

      <SectionWrapper title="Order History">
        <OrderHistorySection orders={orders} isLoading={isLoading} />
      </SectionWrapper>

      <SectionWrapper title="Delivery Address">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <AddressSection select={selectedAddress} setSelect={setSelectedAdress} title={""} />
        )}
      </SectionWrapper>

      <SectionWrapper title="Cart Overview">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <Skeleton className="h-24 w-40" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : cart.length === 0 ? (
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.slice(0, 3).map((item, idx) => (
              <CardForCheckout key={item._id} item={item} index={idx} length={cart.length} />
            ))}
          </ul>
        )}
      </SectionWrapper>
    </motion.div>
  );
};

export default Profile;
