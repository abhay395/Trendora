import React from "react";

const dummyStats = [
  { title: "Total Sales", value: "$12,450" },
  { title: "Orders", value: "320" },
  { title: "Products", value: "85" },
  { title: "Users", value: "1,240" },
];

const dummyProducts = [
  { id: 1, name: "T-shirt", category: "Clothing", price: "$20", stock: 150 },
  { id: 2, name: "Sneakers", category: "Footwear", price: "$60", stock: 80 },
  { id: 3, name: "Laptop", category: "Electronics", price: "$850", stock: 25 },
  { id: 4, name: "Wrist Watch", category: "Accessories", price: "$120", stock: 40 },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 tracking-wide">Admin</h2>
          <nav className="space-y-3">
            {["Dashboard", "Products", "Orders", "Users", "Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-black hover:text-white transition"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="text-sm text-gray-500 mt-6">© 2025 Admin Panel</div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin User</span>
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="rounded-full border border-gray-300"
            />
          </div>
        </header>

        {/* Stats */}
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dummyStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl shadow hover:shadow-lg border border-gray-100 transition"
              >
                <h3 className="text-sm text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  {["ID", "Name", "Category", "Price", "Stock"].map((head) => (
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
                {dummyProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{product.id}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
