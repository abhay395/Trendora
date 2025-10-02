import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCamera } from "react-icons/io5";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

const UserProfileSection = ({ user, onEdit, isLoading, status }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // console.log(formData)
    onEdit(formData);
    setIsModalOpen(false);
  };
  const [previewUrl, setPreviewUrl] = useState(null)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        image: user.image ? `${import.meta.env.VITE_API_URL}/user/avatar?url=${encodeURIComponent(user.image)}` : `https://ui-avatars.com/api/?name=${user.name}&background=f3f4f6&color=111827&size=128`,
        file: null
      });
    }
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

        {/* Profile Image + Details */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-4">
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            {isLoading ? (
              <Skeleton className="h-24 w-24 rounded-full" />
            ) : user?.image ? (
              <img
                src={
                  `${import.meta.env.VITE_API_URL}/user/avatar?url=${encodeURIComponent(user.image)}`
                }
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 shadow"
                loading="lazy"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
                <span>{user?.name ? user.name[0].toUpperCase() : "?"}</span>
              </div>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700 w-full">
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
                <div className="w-full flex items-center justify-center">
                  <div className="relative group">
                    {/* Profile Image */}
                    <img
                      src={
                        formData.image
                      }
                      className="w-28 h-28 rounded-full object-cover border-2 border-gray-200 shadow-lg transition-all duration-300 group-hover:brightness-90"
                      alt="Profile"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <label className="cursor-pointer flex flex-col items-center">
                        <IoCamera className="text-white text-3xl mb-1" />
                        <span className="text-xs text-white font-medium">Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              // preview logic
                              const previewUrl = URL.createObjectURL(file);
                              // console.log("Preview image:", previewUrl);

                              setFormData({
                                ...formData,
                                image: previewUrl,
                                file: file
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

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
