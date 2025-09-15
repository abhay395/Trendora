import React, { useEffect, useState } from "react";
import { updateAdminOrder, useAdminOrders } from "../../hooks/useAdmin";
import Pagination from "../../componente/Pagination";
import { queryGenerater } from "../../hooks/useQueryGenerater";
import { FaChevronDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { downloadOrderRecordApi } from "../../api/adminApi";
import DownloadModal from "./componente/DownloadModal";
import { FaDownload, FaSearch, FaSyncAlt } from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
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
  const [isOpen, setIsOpen] = useState(false);
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
  const downloadHandler = async ({ startDate, endDate }) => {

    const data = await downloadOrderRecordApi(queryGenerater({}, { startDate, endDate }))
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv"); // file name
    document.body.appendChild(link);
    link.click();
  }
  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Search */}

      <div className="mb-6 flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">

        {/* Search */}
        <div className="relative w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by ID or Customer..."
            value={filter.search}
            onChange={(e) => setfilter((prev) => ({ ...prev, search: e.target.value }))}
            className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg text-sm text-gray-700
                 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Sort By */}
        <div className="relative">
          <select
            value={options.sortBy}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, sortBy: e.target.value, page: 1 }))
            }
            className="bg-white text-gray-800 border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 
                 focus:border-blue-500 text-sm font-medium transition-all duration-200 
                 appearance-none cursor-pointer hover:border-gray-400"
          >
            <option value="createdAt:desc">Date: New → Old</option>
            <option value="createdAt:asc">Date: Old → New</option>
            <option value="totalPrice:asc">Price: Low → High</option>
            <option value="totalPrice:desc">Price: High → Low</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <FaChevronDown size={14} />
          </span>
        </div>

        {/* Order Status */}
        <div className="relative">
          <select
            value={filter.status}
            onChange={(e) => setfilter((prev) => ({ ...prev, status: e.target.value }))}
            className="bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 
                 focus:border-blue-500 text-sm font-medium transition-all duration-200 
                 appearance-none cursor-pointer hover:border-gray-400"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <FaChevronDown size={14} />
          </span>
        </div>

        {/* Payment Status */}
        <div className="relative">
          <select
            value={filter.paymentStatus}
            onChange={(e) => setfilter((prev) => ({ ...prev, paymentStatus: e.target.value }))}
            className="bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 
                 focus:border-blue-500 text-sm font-medium transition-all duration-200 
                 appearance-none cursor-pointer hover:border-gray-400"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <FaChevronDown size={14} />
          </span>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) => setfilter((prev) => ({ ...prev, startDate: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm
                 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
          />
          <span className="text-gray-500 text-sm">to</span>
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => setfilter((prev) => ({ ...prev, endDate: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm
                 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Reset + Download */}
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
            className="flex items-center gap-2 px-3 cursor-pointer py-2 text-sm rounded-lg border border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-100 transition"
          >
            <FaSyncAlt className="text-gray-500" /> Reset
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm rounded-lg border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
          >
            <FaDownload className="text-gray-500" /> Download
          </button>
        </div>
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
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
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
                {[...Array(8)].map((_, idx) => <td key={idx} className="p-3"> <div className="w-30 h-[25px]  bg-gray-200 shadow animate-pulse"></div></td>)}
              </tr>)}
          </tbody>
        </table>
        <div className="absolute bottom-4 left-1/3">
          {totalPages > 0 && <Pagination currentPage={options.page} setCurrentPage={(page) => setOptions((prev) => { return { ...prev, page: page } })} totalPages={totalPages} />}
        </div>
      </div>
      <DownloadModal openModal={() => setIsOpen(true)} closeModal={() => setIsOpen(false)} isOpen={isOpen} downloadHandler={downloadHandler} setisOpen={setIsOpen} />
    </div >
  );
}
