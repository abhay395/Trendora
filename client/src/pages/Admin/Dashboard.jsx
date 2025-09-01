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

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

const lowStockProducts = [
  { id: 1, name: "Sneakers", stock: 5 },
  { id: 2, name: "Laptop", stock: 3 },
];

export default function Dashboard() {
  const { data: statics, isLoading: isStaticsLoading } = useAdminStatics()
  const { data: orders, isLoading: isOrderLoading } = useAdminOrders()
  const recentOrderToShow = orders?.results?.slice(0, 5);
  const navigate = useNavigate()
  // if (isStaticsLoading) return <div>...Loading</div>;

  // Dashboard stats
  const stats = statics?.stats || {};
  const salesData = statics?.saleGraph || [];
  const categoryData =
    statics?.topCategory?.map((item) => ({
      name: item.name,
      value: item.totalRevenue,
    })) || [];
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 p-6 overflow-y-auto flex-col gap-6 mt-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Sales", value: stats.totalSales, icon: <IndianRupee /> },
          { label: "Orders", value: stats.totalOrders, icon: <ShoppingCart /> },
          { label: "Products", value: stats.totalProduct, icon: <Package /> },
          { label: "Users", value: stats.totalUser, icon: <Users /> },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 flex items-center gap-4 transition"
          >
            <div className="p-3 rounded-lg bg-gray-100">{card.icon}</div>
            <div>
              <h3 className="text-sm text-gray-500">{card.label}</h3>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {!isStaticsLoading ? card.value : <p className="w-44 h-[18px] md:max-w-md bg-gray-200 shadow animate-pulse"></p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
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
        </div>

        {/* Top Categories */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold">Top Categories</h3>
          <ResponsiveContainer width="100%" height={222}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
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
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" /> Low Stock Alerts
          </h3>
          <ul className="space-y-2">
            {lowStockProducts.map((product) => (
              <li
                key={product.id}
                className="flex justify-between text-sm"
              >
                <span>{product.name}</span>
                <span className="text-red-500 font-semibold">
                  {product.stock} left
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow border relative border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button
            onClick={() => navigate("/dashboard/orders")}
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
                !isStaticsLoading ? recentOrderToShow?.map((order) => (
                  <tr
                    key={order.id}
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
                  </tr>
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
