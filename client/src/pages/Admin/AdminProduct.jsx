import React from "react";
import { useNavigate } from "react-router-dom";

function AdminProduct() {
  const navigate = useNavigate();

  const products = [
    {
      isOutOfStock: false,
      _id: "6888895dcc51b9dcd7292ad2",
      title: "Western Doodles Casual Shirt",
      description:
        "100% cotton slim-fit shirt featuring a modern doodle print—lightweight and breathable for all-day comfort.",
      price: 499,
      rating: 4,
      gender: "Men",
      category: "Shirt",
      sizes: { S: 0, M: 0, L: 0, XL: 0 },
      images: [
        {
          url: "https://www.mydesignation.com/cdn/shop/files/western-doodles-men-shirt-mydesignation-988716.jpg?v=1744923892&width=750",
        },
      ],
    },
    {
      isOutOfStock: false,
      _id: "6888895dcc51b9dcd7292acc",
      title: "Wolf Printed Shirt",
      description:
        "Statement men's overcoat with a bold wolf illustration—ideal for layering over smart-casual outfits.",
      price: 1899,
      rating: 3,
      gender: "Men",
      category: "Shirt",
      sizes: { S: 0, M: 0, L: 0, XL: 0 },
      images: [
        {
          url: "https://www.mydesignation.com/cdn/shop/files/wolf-men-shirt-mydesignation-7655183.jpg?v=1752736267&width=750",
        },
      ],
    },
    {
      isOutOfStock: true,
      _id: "6888895dcc51b9dcd7292ac6",
      title: "Gramophone Floral Print T-shirt",
      description:
        "Women’s relaxed-fit tee with a vintage gramophone floral print—soft, breezy, and stylish for summer days.",
      price: 1399,
      rating: 3,
      gender: "Women",
      category: "T-shirt",
      sizes: { S: 0, M: 0, L: 0, XL: 0 },
      images: [
        {
          url: "https://www.mydesignation.com/cdn/shop/files/gramophone-men-shirt-mydesignation-4965993.jpg?v=1752736266&width=750",
        },
      ],
    },
    {
      isOutOfStock: true,
      _id: "6888895dcc51b9dcd7292ac6",
      title: "Gramophone Floral Print T-shirt",
      description:
        "Women’s relaxed-fit tee with a vintage gramophone floral print—soft, breezy, and stylish for summer days.",
      price: 1399,
      rating: 3,
      gender: "Women",
      category: "T-shirt",
      sizes: { S: 0, M: 0, L: 0, XL: 0 },
      images: [
        {
          url: "https://www.mydesignation.com/cdn/shop/files/gramophone-men-shirt-mydesignation-4965993.jpg?v=1752736266&width=750",
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-base font-medium shadow-sm transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex flex-col bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all group"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={p.images[0]?.url}
                alt={p.title}
                className="w-full h-80 object-cover object-top  rounded-t-lg"
              />
              {p.isOutOfStock && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col p-4">
              <div className="flex items-center justify-between mb-2">
                <h3
                  className="text-lg font-semibold truncate"
                  title={p.title}
                >
                  {p.title}
                </h3>
                <span className="text-blue-700 font-bold text-base">
                  ₹{p.price}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
                  {p.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                  {p.gender}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-medium ${
                    p.isOutOfStock
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {p.isOutOfStock ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-gray-500 text-sm mb-3 line-clamp-2"
                title={p.description}
              >
                {p.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-500 font-bold">{p.rating} ★</span>
                <span className="text-xs text-gray-400">/ 5</span>
              </div>

              {/* Sizes */}
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(p.sizes).map(([size, qty]) => (
                  <span
                    key={size}
                    className={`text-xs px-2 py-0.5 rounded border ${
                      qty === 0
                        ? "bg-gray-100 text-gray-400 border-gray-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => console.log("Delete", p._id)}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No products case */}
      {products.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No products found.
        </div>
      )}
    </div>
  );
}

export default AdminProduct;
