
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Edit2, Mail, Phone, User, X } from 'lucide-react';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-100 ${className}`} />
);

const UserProfileSection = ({ user, onEdit, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', image: '', file: null });

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-5">
          {isLoading ? (
            <Skeleton className="h-16 w-16 rounded-full" />
          ) : (
            <img
              src={
                user?.image
                  ? `${import.meta.env.VITE_API_URL}/user/avatar?url=${encodeURIComponent(user.image)}`
                  : `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f3f4f6&color=111827`
              }
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover border border-gray-200"
            />
          )}
          <div>
            {isLoading ? (
              <><Skeleton className="h-5 w-32 mb-2" /><Skeleton className="h-3 w-48" /></>
            ) : (
              <>
                <p className="font-black text-black text-base tracking-tight">{user?.name || '—'}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{user?.email || '—'}</p>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-[9px] font-black uppercase tracking-widest border border-gray-200 hover:border-black hover:text-black transition-all self-start sm:self-auto"
        >
          <Edit2 size={12} />
          Edit Profile
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5"><User size={12} /> Full Name</label>
          {isLoading ? <Skeleton className="h-5 w-32" /> : <p className="text-sm font-bold text-gray-900">{user?.name || '—'}</p>}
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5"><Mail size={12} /> Email Address</label>
          {isLoading ? <Skeleton className="h-5 w-48" /> : <p className="text-sm font-bold text-gray-900">{user?.email || '—'}</p>}
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5"><Phone size={12} /> Phone Number</label>
          {isLoading ? <Skeleton className="h-5 w-32" /> : <p className="text-sm font-bold text-gray-900">{user?.phone || '—'}</p>}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md overflow-hidden border border-gray-200"
              initial={{ scale: 0.97, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Edit Profile</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors"><X size={18} /></button>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex justify-center">
                  <div className="relative group cursor-pointer">
                    <img src={formData.image} className="w-24 h-24 rounded-full object-cover border border-gray-200" alt="Preview" />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="cursor-pointer flex flex-col items-center text-white">
                        <Camera size={20} />
                        <span className="text-[9px] uppercase font-black mt-1">Change</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-bold focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} disabled className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-xs font-bold text-gray-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-2">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 text-xs font-bold focus:outline-none focus:border-black transition-colors" />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors border border-gray-200 hover:border-gray-400">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2.5 text-[9px] font-black uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-colors">Save Changes</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfileSection;