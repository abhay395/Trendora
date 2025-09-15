import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { useSoftDeleteProduct, useUserHardDelete, useUsersAdmin } from "../../hooks/useAdmin";
import { FaSearch, FaSyncAlt, FaDownload, FaUserPlus } from "react-icons/fa";
import Pagination from "../../componente/Pagination";
import { queryGenerater } from "../../hooks/useQueryGenerater";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [options, setOptions] = useState({
    page: 1,
    sortBy: 'createdAt:desc',
    limit: 5,
  })
  const [filter, setfilter] = useState({
    search: "",
    startDate: "",
    endDate: "",
  })
  const [query, setQuery] = useState(queryGenerater(options, filter))
  const { data: usersData, error } = useUsersAdmin(query)
  const { mutate: softDeleteUser } = useSoftDeleteProduct()
  const { mutate: hardDeleteUser } = useUserHardDelete()
  useEffect(() => {
    setUsers(usersData?.results || [])
    setTotalPages(usersData?.totalPages || 1)
  }, [usersData])
  useEffect(() => {
    console.log(query)
    setQuery(queryGenerater(options, filter))
  }, [options, filter])
  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="mb-6 flex flex-wrap relative  items-center gap-x-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        {/* Search Input */}
        <div className="relative w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name or number"
            value={filter.search}
            onChange={(e) =>
              setfilter((prev) => ({ ...prev, search: e.target.value }))
            }
            className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-300 focus:outline-none"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) =>
              setfilter((prev) => ({ ...prev, startDate: e.target.value }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          />
          <span className="text-gray-500 text-sm">to</span>
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) =>
              setfilter((prev) => ({ ...prev, endDate: e.target.value }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setfilter({
                payment: "",
                search: "",
                city: "",
                endDate: "",
                startDate: "",
                status: "",
              })
            }
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-100 transition"
          >
            <FaSyncAlt className="text-gray-500" /> Reset
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
          >
            <FaDownload className="text-gray-500" /> Download
          </button>
        </div>

        {/* Create User */}
        <button className="flex absolute right-5 items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition">
          <FaUserPlus /> Create User
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md min-h-[400px] relative">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
                >
                  {/* User Avatar + Name */}
                  <td className="p-3 flex items-center gap-3">
                    {user.isImage && user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user._id.slice(0, 6)}</p>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-3 text-gray-700">{user.email}</td>

                  {/* Phone */}
                  <td className="p-3 text-gray-600">{user.phone || "—"}</td>

                  {/* Role */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <button
                      // onClick={() => handleToggleActive(user._id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  {/* Joined */}
                  <td className="p-3 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex gap-2">
                    <button
                      // onClick={() => navigate(`/admin/users/${user._id}`)}
                      className="p-2 rounded-md border hover:bg-gray-100"
                    >
                      <FaEye className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => console.log("Edit user", user._id)}
                      className="p-2 rounded-md border hover:bg-gray-100"
                    >
                      <FaEdit className="text-green-500" />
                    </button>
                    <button
                      // onClick={() => handleDelete(user._id)}
                      className="p-2 rounded-md border hover:bg-gray-100"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <div className="absolute bottom-4 left-1/3">
            {totalPages > 0 && <Pagination currentPage={options.page} setCurrentPage={(page) => setOptions((prev) => { return { ...prev, page: page } })} totalPages={totalPages} />}
          </div>
        </table>
      </div>
    </div>
  );
}

