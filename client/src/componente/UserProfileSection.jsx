import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

const UserProfileSection = ({ user, onEdit, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(formData);
    setIsModalOpen(false);
  };
  console.log(isLoading)
  useEffect(() => {
    if (user)
      setFormData({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      });
  }, [user]);

  return (
    <>
      {/* Profile Section */}
      <section className="mb-8 bg-white rounded-2xl border border-gray-100 p-6 shadow transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            👤 Profile Information
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <FiEdit className="w-4 h-4" />
            Edit
          </button>
        </div>

        {/* Profile Details */}
        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
          <div>
            <span className="block text-gray-500 font-medium">Name</span>
            {isLoading ? (
              <Skeleton className="h-5 w-32 mt-1" />
            ) : (
              <span className="text-gray-900">{user?.name || '—'}</span>
            )}
          </div>
          <div>
            <span className="block text-gray-500 font-medium">Email</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40 mt-1" />
            ) : (
              <span className="text-gray-900">{user?.email || '—'}</span>
            )}
          </div>
          <div>
            <span className="block text-gray-500 font-medium">Phone</span>
            {isLoading ? (
              <Skeleton className="h-5 w-28 mt-1" />
            ) : (
              <span className="text-gray-900">{user?.phone || '—'}</span>
            )}
          </div>
        </div>
      </section>

      {/* Modal with animation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-900 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfileSection;
