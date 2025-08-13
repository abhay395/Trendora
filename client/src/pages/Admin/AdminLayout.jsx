import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './componente/AdminNavbar'
import AdminSidebar from './componente/AdminSideBar'
import useAdminStore from '../../store/adminStore'
function AdminLayout() {
  const { fetchStaticsInDashboard } = useAdminStore()
  useEffect(() => {
    fetchStaticsInDashboard();
  }, [])
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
    </div>
  )
}

export default AdminLayout