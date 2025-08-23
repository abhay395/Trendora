import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../store/adminStore";

function AdminProduct() {
  const navigate = useNavigate();
  const {
    fetchProductsInAdmin,
    productData,
    isProductLoading,
    softDeleteProduct,
    deleteProductPermanently,
  } = useAdminStore();

  useEffect(() => {
    fetchProductsInAdmin?.();
  }, []);

  if (isProductLoading) return <div className="text-center py-10">...Loading</div>;

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-black hover:bg-gray-800 text-white cursor-pointer px-5 py-2 rounded-lg text-base font-medium shadow-sm transition"
        >
          + Add Product
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {productData?.product?.map((p) => (
          <div
            key={p._id}
            className="flex flex-col bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition group"
          >
            {/* Image Section */}
            <div className="relative cursor-pointer">
              <img
                src={p.images[0]?.url}
                alt={p.title}
                className="w-full h-80 object-cover object-top rounded-t-lg"
              />
              {p.isOutOfStock && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  Out of Stock
                </span>
              )}
              {p.isDeleted && (
                <span className="absolute top-2 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                  Deleted
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
                <span className="text-gray-900 font-bold text-base">
                  ₹{p.sizes[0].price}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
                  {p.category?.name}
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
                <span className="text-yellow-500 font-bold">{p.rating.average} ★</span>
                <span className="text-xs text-gray-400">/ 5</span>
              </div>

              {/* Sizes */}
              <div className="flex flex-wrap gap-2 mb-3">
                {p.sizes.map((el) => (
                  <span
                    key={el.size}
                    className={`text-xs px-2 py-0.5 rounded border ${
                      el.quantity === 0
                        ? "bg-gray-100 text-gray-400 border-gray-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }`}
                  >
                    {el.size}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black text-white hover:bg-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => softDeleteProduct(p._id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  Archive
                </button>
                <button
                  onClick={() => deleteProductPermanently(p._id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No products case */}
      {productData?.product?.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No products found.
        </div>
      )}
    </div>
  );
}

export default AdminProduct;
