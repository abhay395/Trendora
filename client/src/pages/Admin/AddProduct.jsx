import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import useAdminStore from "../../store/adminStore";
import { Controller, useForm } from 'react-hook-form'
import SizeInput from "../../componente/SizeInput";

function AddProduct() {
  const [previews, setPreviews] = useState([null, null, null, null]);
  const { categories, AddProductInAdmin } = useAdminStore();
  const { register, handleSubmit, formState: { errors }, control } = useForm()
  const onSubmit = (data) => {
    console.log("Full form data:", data);

    const form = new FormData();
    data.images.forEach((fileList, idx) => {
      if (fileList?.[0]) {
        form.append("images", fileList[0]);
        console.log("Image " + idx, fileList[0]); // 👌 shows File object now
      }
    });
    for (let [key, value] of Object.entries(data)) {
      if (key != 'images' && key != 'sizes') {
        form.append(key, value)
      }
    }
    data?.sizes.forEach((s, idx) => {
      form.append(`sizes[${idx}][size]`, s.size);
      form.append(`sizes[${idx}][quantity]`, s.quantity);
    });
    AddProductInAdmin(form);
  };


  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[idx] = objectUrl;
        return newPreviews;
      });
      console.log(previews)
    }
  };

  // 🧹 Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white/90 shadow-xl rounded-3xl p-10 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center gap-2">
          <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-lg">
            +
          </span>
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                {...register("title", { required: true })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                {...register("category", { required: true })}
              >
                <option value="">Select category</option>
                {categories?.map((op) => <option key={op._id} value={op._id} className="outline-none">{op.name}</option>)}
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
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                {...register("price", { required: true })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Gender (₹) <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                {...register("gender", { required: true })}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
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
              {...register("description", { required: true })}
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
              {[0].map((idx) => (
                <Controller
                  key={idx}
                  control={control}
                  name={`images.${idx}`}
                  rules={{ required: idx === 0 }}
                  render={({ field }) => (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-gray-500 transition relative group">
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
                        accept="image/*"
                        className="hidden"
                        required={idx === 0}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // ✅ update previews
                            const objectUrl = URL.createObjectURL(file);
                            setPreviews((prev) => {
                              const newPreviews = [...prev];
                              newPreviews[idx] = objectUrl;
                              return newPreviews;
                            });

                            // ✅ update react-hook-form
                            field.onChange(e.target.files);
                          }
                        }}
                      />
                    </label>
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Upload up to 4 images (JPG, PNG, GIF) — Max 2MB each.
            </p>
          </div>
          <SizeInput register={register} control={control} />
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
