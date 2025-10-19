import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useUser } from '../../../hooks/useUser';

function AdminNavbar() {
  const { data: user } = useUser()
  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200">
      {/* Left side */}
      <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      {/* Right side */}
      <div className="flex items-center space-x-6">
        {/* Notification button */}
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User info */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          {user && user.image ? <img
            src={
              import.meta.env.VITE_API_URL
                ? `${import.meta.env.VITE_API_URL}/user/avatar?url=${encodeURIComponent(user.image)}`
                : user.image
            }
            alt="profile"
            className="rounded-full w-10 h-10 border border-gray-300 shadow-sm"
          /> : <img
            src="https://ui-avatars.com/api/?name=Admin&background=f3f4f6&color=111827&size=128"
            alt="profile"
            className="rounded-full w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
          />}
        </div>

        {/* Logout button */}
        <button className="text-gray-500 hover:text-red-500 transition">
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
