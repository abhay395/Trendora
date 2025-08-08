import React from 'react';
import { FiEdit } from 'react-icons/fi';

const UserProfileSection = ({ user, onEdit }) => {
  return (
    <section className="mb-8 bg-white rounded-2xl  border border-gray-100 p-6 shadow transition-shadow duration-300">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          👤 Profile Information
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
        >
          <FiEdit className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Profile Details */}
      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
        <div>
          <span className="block text-gray-500 font-medium">Name</span>
          <span className="text-gray-900">{user?.name || '—'}</span>
        </div>
        <div>
          <span className="block text-gray-500 font-medium">Email</span>
          <span className="text-gray-900">{user?.email || '—'}</span>
        </div>
        <div>
          <span className="block text-gray-500 font-medium">Phone</span>
          <span className="text-gray-900">{user?.phone || '—'}</span>
        </div>
      </div>
    </section>
  );
};

export default UserProfileSection;
