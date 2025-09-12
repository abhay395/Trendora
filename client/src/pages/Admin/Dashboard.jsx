import React, { useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminOrders, useAdminStatics } from "../../hooks/useAdmin";
import { motion } from 'framer-motion'

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }, // delay between child animations
  },
};


export default function Dashboard() {
  const { data: statics, isLoading: isStaticsLoading } = useAdminStatics()
  const { data: orders, isLoading: isOrderLoading } = useAdminOrders()
  const recentOrderToShow = orders?.results?.slice(0, 5);
  const navigate = useNavigate()
  // if (isStaticsLoading) return <div>...Loading</div>;

  // Dashboard stats
  const stats = statics?.stats || {};
  const salesData = statics?.saleGraph || [];
  const stockAlert = statics?.stockAlert || [];
  const categoryData =
    statics?.topCategory?.map((item) => ({
      name: item.name,
      value: item.totalRevenue,
    })) || [];
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 p-6 overflow-y-auto flex-col gap-6 mt-4">
      {/* Stats Cards */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: "Total Sales", value: stats.totalSales, icon: <IndianRupee /> },
          { label: "Orders", value: stats.totalOrders, icon: <ShoppingCart /> },
          { label: "Products", value: stats.totalProduct, icon: <Package /> },
          { label: "Users", value: stats.totalUser, icon: <Users /> },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 flex items-center gap-4 transition"
          >
            <div className="p-3 rounded-lg bg-gray-100">{card.icon}</div>
            <div>
              <h3 className="text-sm text-gray-500">{card.label}</h3>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {!isStaticsLoading ? card.value : (
                  <p className="w-44 h-[18px] bg-gray-200 shadow animate-pulse"></p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[300px] h-[300px]">
        {/* Sales Overview */}
        {!isStaticsLoading ? (<motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="bg-white p-5 rounded-xl  shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" aspect={2}>
            <LineChart data={salesData}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalSales"
                name="Sales"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>) : <div className="w-full h-full  bg-gray-100 shadow animate-pulse"></div>}

        {/* Top Categories */}
        {!isStaticsLoading ? <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold">Top Categories</h3>
          <ResponsiveContainer width="100%" height={222}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div> : <div className="w-full h-full  bg-gray-100 shadow animate-pulse"></div>}

        {/* Low Stock Alerts */}
        {!isStaticsLoading ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="bg-white p-5 rounded-xl shadow border border-gray-100 overflow-y-scroll">
            <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> Low Stock Alerts
            </h3>
            <ul className="space-y-3">
              {stockAlert.map((product,i) => (
                <motion.li
                  key={product._id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.4, delay: i * 0.1 }} // stagger manually
                  className="group flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition relative"
                >
                  {/* Product Title and Size */}
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1 md:mb-0">
                    <span>
                      {String(product.title).length > 35
                        ? String(product.title).slice(0, 30) + "..."
                        : product.title}
                    </span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-200 text-indigo-800 text-xs font-semibold">
                      {product.size}
                    </span>
                  </div>

                  {/* Quantity Badge */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-xs px-1 py-1 rounded-full font-semibold ${product.quantity === 0
                        ? "bg-red-100 text-red-700"
                        : product.quantity <= 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {product.quantity === 0 ? "Out of Stock" : `${product.quantity} left`}
                    </span>
                  </div>

                  {/* Hover Button with slide-in + scale animation */}
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transform transition-all duration-300 ease-out hover:scale-105"
                    onClick={() => {
                      // Navigate to restock page
                      navigate(`/admin/product/edit/${product._id}`)
                    }}
                  >
                    Restock
                  </button>
                </motion.li>
              ))}
            </ul>

          </motion.div>
        ) : (
          <div className="w-full h-full bg-gray-100 shadow animate-pulse rounded-xl"></div>
        )}

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow border relative border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-sm px-3 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-50 hover:text-black cursor-pointer border border-gray-400 transition"
          >
            View More
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {[
                  "Order ID",
                  "User",
                  "Phone",
                  "City",
                  "Total",
                  "Status",
                  "Order Time",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                !isStaticsLoading ? recentOrderToShow?.map((order,i) => (
                  <motion.tr
                    key={order._id}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{String(order._id).slice(0, 7)}</td>
                    <td className="px-6 py-4">{order.address.name}</td>
                    <td className="px-6 py-4">{order.address.phone}</td>
                    <td className="px-6 py-4">{order.address.city}</td>
                    <td className="px-6 py-4">₹{order.totalPrice}</td>
                    <td
                      className={`px-6 py-4 font-medium ${order.status === "Delivered"
                        ? "text-green-500"
                        : order.status === "Shipped"
                          ? "text-blue-500"
                          : "text-yellow-500"
                        }`}
                    >
                      {order.status}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.estimateDeliveryDate).toLocaleDateString()}
                    </td>
                  </motion.tr>
                )) : [...new Array(5)].map((_, idx) => {
                  return <tr
                    key={idx}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-2 py-2">
                      <div className="w-30 h-[18px]  bg-gray-200 shadow animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="w-30 h-[18px]  bg-gray-200 shadow animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="w-30 h-[18px]  bg-gray-200 shadow animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="w-30 h-[18px]  bg-gray-200 shadow animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="w-30 h-[18px]  bg-gray-200 shadow animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="w-30 h-[18px]  bg-gray-200 shadow animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="w-30 h-[18px]  bg-gray-200 shadow animate-pulse"></div>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
