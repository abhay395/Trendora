import React, { useEffect, useState } from "react";
import { useAdminOrders } from "../../hooks/useAdmin";
import Pagination from "../../componente/Pagination";
import { queryGenerater } from "../../hooks/useQueryGenerater";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState({
    page: 1,
    sortBy: 'createdAt',
    limit: 5,
  })
  const [filter, setfilter] = useState({
    search: ""
  })
  const [query, setQuery] = useState(queryGenerater(options, filter))
  const { data: ordersData, isLoading } = useAdminOrders(query)
  const [orders, setOrders] = useState(ordersData?.results)
  useEffect(() => {
    setOrders(ordersData?.results)
  }, [ordersData])
  useEffect(() => {
    console.log(query)
    setQuery(queryGenerater(options, filter))
  }, [options])
  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };
  // if (isLoading) return <div>....Loading</div>

  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-lg w-72 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md min-h-[400px] relative">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ?
              orders?.map((order) => (
                <tr
                  key={order?._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{order?._id.slice(0, 9)}</td>
                  <td className="p-3">{order?.address.name}</td>
                  <td className="p-3">{new Date(order?.createdAt).toLocaleString()}</td>
                  <td className="p-3 font-semibold">₹ {order?.totalPrice}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order?.status]}`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {/* Status Select */}
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"
                    >
                      {Object.keys(statusColors).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    {/* View Button */}
                    <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-100">
                      View
                    </button>

                    {/* Delete Button */}
                    <button className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              )) : [...Array(5)].map((_, idx) => <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition "
              >
                <td className="p-3 font-medium"> <div className="w-30 h-[25px]  bg-gray-200 shadow animate-pulse"></div></td>
                <td className="p-3"> <div className="w-30 h-[25px]  bg-gray-200 shadow animate-pulse"></div></td>
                <td className="p-3"> <div className="w-30 h-[25px]  bg-gray-200 shadow animate-pulse"></div></td>
                <td className="p-3 font-semibold"> <div className="w-30 h-[25px]  bg-gray-200 shadow animate-pulse"></div></td>
                <td className="p-3">
                  <div className="w-30 h-[25px]  bg-gray-200 shadow animate-pulse"></div>
                </td>
                <td className="p-3 flex gap-2">
                  {/* Status Select */}
                  <div className="w-30 h-[25px]  bg-gray-200 shadow animate-pulse"></div>
                </td>
              </tr>)}
          </tbody>
        </table>
        <div className="absolute bottom-4 left-1/3">
          <Pagination currentPage={options.page} setCurrentPage={(page) => setOptions((prev) => { return { ...prev, page: page } })} totalPages={ordersData?.totalPages} />
        </div>
      </div>
    </div>
  );
}
