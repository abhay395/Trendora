import React from 'react';
import { FiEdit } from 'react-icons/fi';

const UserProfileSection = ({ user, onEdit }) => {
  return (
    <section className="mb-8 bg-white rounded-xl shadow border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-black mb-5 flex items-center gap-2">
        👤 Profile Info
      </h2>

      <div className="space-y-3 text-gray-800 text-[15px]">
        <div>
          <span className="font-semibold text-gray-600">Name:</span>{' '}
          <span className="text-black">{user?.name || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-600">Email:</span>{' '}
          <span className="text-black">{user?.email || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-600">Phone:</span>{' '}
          <span className="text-black">{user?.phone || '-'}</span>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-900 transition"
      >
        <FiEdit className="w-5 h-5" />
        Edit Profile
      </button>
    </section>
  );
};

export default UserProfileSection;
