import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './componente/AdminNavbar'
// import AdminSidebar from './componente/AdminSideBar'
import useAdminStore from '../../store/adminStore'
import { Toaster } from 'react-hot-toast'
function AdminLayout() {
  const fetchStaticsInDashboard = useAdminStore((state) => state.fetchStaticsInDashboard);
  const fetchCategoriesInAdmin = useAdminStore((state) => state.fetchCategoriesInAdmin)

  useEffect(() => {
    fetchCategoriesInAdmin()
    fetchStaticsInDashboard(); // optional chaining prevents crash if undefined
  }, [fetchStaticsInDashboard, fetchCategoriesInAdmin]);
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <AdminSidebar /> */}
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