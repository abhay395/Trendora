import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [null, null, null, null],
  });

  const [previews, setPreviews] = useState([null, null, null, null]);

  const handleChange = (e) => {
    const { name, value, files, dataset } = e.target;

    if (name.startsWith("image")) {
      const idx = parseInt(dataset.idx, 10);
      if (files && files[0]) {
        setFormData((prev) => {
          const newImages = [...prev.images];
          newImages[idx] = files[0];
          return { ...prev, images: newImages };
        });
        setPreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[idx] = URL.createObjectURL(files[0]);
          return newPreviews;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white/90 shadow-xl rounded-3xl p-10 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center gap-2">
          <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-lg">
            +
          </span>
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Classic White Shirt"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                required
              >
                <option value="">Select category</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                min="0"
                placeholder="e.g. 999"
                value={formData.price}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                placeholder="e.g. 50"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe the product..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Image Upload with Icon */}
          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Product Images <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((idx) => (
                <label
                  key={idx}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-gray-500 transition relative group"
                >
                  {previews[idx] ? (
                    <img
                      src={previews[idx]}
                      alt={`Preview ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <FiUploadCloud className="text-3xl mb-2" />
                      <span className="text-xs">
                        {idx === 0 ? "Main Image" : `Image ${idx + 1}`}
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    name={`image${idx}`}
                    data-idx={idx}
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    required={idx === 0}
                  />
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Upload up to 4 images (JPG, PNG, GIF) — Max 2MB each.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-700 transition"
          >
            🚀 Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
