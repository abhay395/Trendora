import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './componente/AdminNavbar'
import AdminSidebar from './componente/AdminSideBar'
import { Toaster } from 'react-hot-toast'
import { useAdminCategories } from '../../hooks/useAdmin'
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