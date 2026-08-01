import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './components/AdminNavbar'
import AdminSidebar from './components/AdminSideBar'
import { Toaster } from 'react-hot-toast'
function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet /> {/* All admin pages render here */}
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default AdminLayout