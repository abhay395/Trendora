import React, { useState } from "react";
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
import { ShoppingCart, Users, Package, DollarSign, AlertTriangle, IndianRupee } from "lucide-react";
import useAdminStore from "../../store/adminStore";

const stats = [
  { title: "Total Sales", value: "$12,450", icon: <DollarSign className="text-green-500" /> },
  { title: "Orders", value: "320", icon: <ShoppingCart className="text-blue-500" /> },
  { title: "Products", value: "85", icon: <Package className="text-purple-500" /> },
  { title: "Users", value: "1,240", icon: <Users className="text-orange-500" /> },
];

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 4890 },
  { name: "Jun", sales: 6390 },
];

const categoryData = [
  { name: "Clothing", value: 45 },
  { name: "Footwear", value: 25 },
  { name: "Electronics", value: 20 },
  { name: "Accessories", value: 10 },
];
const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

const recentOrders = [
  { id: 101, user: "John Doe", total: "$120", status: "Shipped" },
  { id: 102, user: "Jane Smith", total: "$80", status: "Pending" },
  { id: 103, user: "Alex Brown", total: "$200", status: "Delivered" },
  { id: 104, user: "Emily Johnson", total: "$50", status: "Pending" },
];

const lowStockProducts = [
  { id: 1, name: "Sneakers", stock: 5 },
  { id: 2, name: "Laptop", stock: 3 },
];

export default function Dashboard() {
  const { data, isLoading } = useAdminStore();
  // const stats = Array.from(data?.stats).entries();
  if (isLoading) return <div>...Loading</div>
  // let de = {}
  // let stats = Object.entries(stats)
  let stats = data.stats
  let salesData = data.saleGraph
  let categoryData = data.topCategory.map((item) => { return { name: item._id, value: item.totalRevenue } })
  // let lowStockProducts
  // let lowStockProducts = data.lowStock.map((item)=>{
  //   let sizes = Object.entries(item.sizes)
  //   let 
  // })
  console.log(categoryData)
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 p-6 overflow-y-auto flex-col gap-6 mt-4">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 flex items-center gap-4 transition"
        >
          <div className="p-3 rounded-lg bg-gray-100"><IndianRupee /></div>
          <div>
            <h3 className="text-sm text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalSales}</p>
          </div>
        </div>
        <div
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 flex items-center gap-4 transition"
        >
          <div className="p-3 rounded-lg bg-gray-100"><ShoppingCart /></div>
          <div>
            <h3 className="text-sm text-gray-500">Orders</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalOrders}</p>
          </div>
        </div>
        <div
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 flex items-center gap-4 transition"
        >
          <div className="p-3 rounded-lg bg-gray-100"><Package /></div>
          <div>
            <h3 className="text-sm text-gray-500">Products</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalProduct}</p>
          </div>
        </div>
        <div
          className="p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 flex items-center gap-4 transition"
        >
          <div className="p-3 rounded-lg bg-gray-100"><Users /></div>
          <div>
            <h3 className="text-sm text-gray-500">Users</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalUser}</p>
          </div>
        </div>
        {/* ))} */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalSales" name="sales" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-5 rounded-xl shadow  border border-gray-100">
          <h3 className="text-lg font-semibold">Top Categories</h3>
          <ResponsiveContainer width="100%" height={222}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                // name="_id"
                label
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
              <li key={product._id} className="flex justify-between text-sm">
                <span>{product.name}</span>
                <span className="text-red-500 font-semibold">{product.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <h3 className="text-lg font-semibold p-5">Recent Orders</h3>
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {["Order ID", "User", "Total", "Status"].map((head) => (
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
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.user}</td>
                <td className="px-6 py-4">{order.total}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
