import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Edit2, Mail, Phone, User, X } from 'lucide-react';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

const UserProfileSection = ({ user, onEdit, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    file: null
  });

  // Initialize Form Data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        image: user.image 
          ? `${import.meta.env.VITE_API_URL}/user/avatar?url=${encodeURIComponent(user.image)}` 
          : `https://ui-avatars.com/api/?name=${user.name}&background=f3f4f6&color=111827&size=128`,
        file: null
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: previewUrl, file: file });
    }
  };

  const handleSave = () => {
    onEdit(formData);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* --- Main Profile Card --- */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        {/* Decorative Header Background */}
        <div className="h-24 bg-gradient-to-r from-gray-900 to-gray-800"></div>

        <div className="px-6 pb-6 relative">
            {/* Avatar - Floating halfway up */}
            <div className="absolute -top-12 left-6">
                {isLoading ? (
                    <Skeleton className="h-24 w-24 rounded-full border-4 border-white" />
                ) : (
                    <img
                        src={user?.image 
                            ? `${import.meta.env.VITE_API_URL}/user/avatar?url=${encodeURIComponent(user.image)}` 
                            : `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f3f4f6&color=111827`
                        }
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                    />
                )}
            </div>

            {/* Edit Button */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wide border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all"
                >
                    <Edit2 size={14} />
                    Edit Profile
                </button>
            </div>

            {/* User Info Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        <User size={14} /> Full Name
                    </label>
                    {isLoading ? <Skeleton className="h-6 w-32" /> : <p className="font-semibold text-gray-900">{user?.name || '—'}</p>}
                </div>
                <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        <Mail size={14} /> Email Address
                    </label>
                    {isLoading ? <Skeleton className="h-6 w-48" /> : <p className="font-semibold text-gray-900">{user?.email || '—'}</p>}
                </div>
                <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        <Phone size={14} /> Phone Number
                    </label>
                    {isLoading ? <Skeleton className="h-6 w-32" /> : <p className="font-semibold text-gray-900">{user?.phone || '—'}</p>}
                </div>
            </div>
        </div>
      </div>

      {/* --- Edit Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900">Edit Profile</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                    <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Image Upload */}
                <div className="flex justify-center">
                  <div className="relative group cursor-pointer">
                    <img
                      src={formData.image}
                      className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer flex flex-col items-center text-white">
                            <Camera size={24} />
                            <span className="text-[10px] uppercase font-bold mt-1">Change</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                >
                  Save Changes
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