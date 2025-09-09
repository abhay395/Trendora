import React, { useEffect, useState } from "react";
import { updateAdminOrder, useAdminOrders } from "../../hooks/useAdmin";
import Pagination from "../../componente/Pagination";
import { queryGenerater } from "../../hooks/useQueryGenerater";
import { FaChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
    sortBy: 'createdAt:desc',
    limit: 5,
  })
  const [filter, setfilter] = useState({
    search: "",
    city: "",
    startDate: "",
    endDate: "",
    status: "",
    paymentStatus: ""
  })
  const [query, setQuery] = useState(queryGenerater(options, filter))
  const { data: ordersData, isLoading } = useAdminOrders(query)
  const { mutate, status } = updateAdminOrder()
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData.results || []);
      setTotalPages(ordersData.totalPages || 1); // ✅ update only when backend gives new value
    }
  }, [ordersData]);
  useEffect(() => {
    console.log(query)
    setQuery(queryGenerater(options, filter))
  }, [options, filter])
  const handleStatusChange = (id, newStatus) => {
    mutate({ id: id, updateBody: { status: newStatus } })
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      {/* Search */}

      <div className="mb-4 flex flex-wrap gap-3 items-center">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by ID or Customer..."
          value={filter.search}
          onChange={(e) => setfilter((prev) => { return { ...prev, search: e.target.value } })}
          className="px-3 py-2 border rounded-lg w-72 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Sort By */}
        <div className="relative">
          <select
            id="sort-select"
            value={options.sortBy}
            onChange={(e) => setOptions((prev) => { return { ...prev, sortBy: e.target.value, page: 1 } })}
            className="bg-white text-gray-800 border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
          text-sm font-medium transition-all duration-200 appearance-none cursor-pointer
          hover:border-gray-400 hover:shadow-lg"
          >
            <option value="createdAt:desc">Date: New → Old</option>
            <option value="createdAt:asc">Date: Old → New</option>
            <option value="totalPrice:asc">Price: Low → High</option>
            <option value="totalPrice:desc">Price: High → Low</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <FaChevronDown />
          </span>
        </div>

        {/* Order Status Filter */}
        <div className="relative">
          <select
            value={filter.status}
            onChange={(e) => setfilter((prev) => { return { ...prev, status: e.target.value } })}
            className="bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 shadow-md 
                focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 
                text-sm font-medium transition-all duration-200 appearance-none cursor-pointer 
                hover:border-gray-400 hover:shadow-lg"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <FaChevronDown />
          </span>
        </div>

        {/* Payment Status Filter */}
        <div className="relative">
          <select
            value={filter.paymentStatus}
            onChange={(e) => setfilter((prev) => { return { ...prev, paymentStatus: e.target.value } })}
            className="bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 shadow-md 
                focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 
                text-sm font-medium transition-all duration-200 appearance-none cursor-pointer 
                hover:border-gray-400 hover:shadow-lg"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <FaChevronDown />
          </span>
        </div>

        {/* Date Range */}
        <input
          type="date"
          value={filter.startDate}
          onChange={(e) => setfilter((prev) => { return { ...prev, startDate: e.target.value } })}
          className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="date"
          value={filter.endDate}
          onChange={(e) => setfilter((prev) => { return { ...prev, endDate: e.target.value } })}
          className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Reset Button */}
        <button
          onClick={() => { setfilter({ payment: "", search: "", city: "", endDate: "", startDate: "", status: "" }) }}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
        >
          Reset
        </button>
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
              <th className="p-3">Phone</th>
              <th className="p-3">Payment</th>
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
                  <td className="p-3 font-semibold"> {order?.address?.phone}</td>
                  <td className={`p-3`}  > <span className={`px-3 py-1 font-semibold text-xs rounded-2xl ${order.paymentStatus == 'unpaid' ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800 "}`}>{String(order?.paymentStatus).toUpperCase()}
                  </span>
                  </td>
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
                        handleStatusChange(order._id, e.target.value)
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
                    <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-100" onClick={() => navigate(`/admin/order/${order._id}`)}>
                      View
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
          {totalPages > 0 && <Pagination currentPage={options.page} setCurrentPage={(page) => setOptions((prev) => { return { ...prev, page: page } })} totalPages={totalPages} />}
        </div>
      </div>
    </div >
  );
}
