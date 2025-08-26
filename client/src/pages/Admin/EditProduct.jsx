import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAdminStore from '../../store/adminStore';
import { useForm, Controller } from 'react-hook-form';
import { FiUploadCloud } from "react-icons/fi";
import SizeInput from "../../componente/SizeInput";
function EditProduct() {
  const { id } = useParams();
  const [previews, setPreviews] = useState([null, null, null, null]);
  const fetchProductsInAdminById = useAdminStore(s => s.fetchProductsInAdminById)
  const { selecetedProduct, isProductLoading } = useAdminStore()
  const categories = useAdminStore(s => s?.categories);
  const { register, handleSubmit, formState: { dirtyFields }, control, reset } = useForm({
    defaultValues: {
      title: "",
      category: "",
      gender: "",
      description: "",
      images: [null, null, null, null],
      sizes: {}
    }
  })
  const onSubmit = (data) => {
    const updatedFields = {};

    // only take values from dirty fields
    console.log(dirtyFields)
    Object.keys(dirtyFields).forEach((key) => {
      updatedFields[key] = data[key];
    });

    console.log("Changed Data:", updatedFields);
  }
  useEffect(() => {
    if (selecetedProduct) {
      setPreviews(selecetedProduct.images.map(img => img.url))
      reset(selecetedProduct)
    }
  }, [selecetedProduct])
  useEffect(() => {
    fetchProductsInAdminById(id)
  }, [id])
  if (!isProductLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white/90 shadow-xl rounded-3xl p-10 border border-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8">
          {/* Product Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <textarea
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
                className="w-full border-2 cursor-pointer border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
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
                Gender (₹) <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                className="w-full border-2 cursor-pointer border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                {...register("gender", { required: true })}
              >
                <option value="">Select gender</option>
                <option value="Men">Men</option>
                <option value="Woman">Woman</option>
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
                <option value="Unisex">Unisex</option>
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
              {selecetedProduct.images.map((_, idx) => (
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
                          className="w-34 h-34 object-cover object-top rounded-lg shadow"
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
            className="w-full cursor-pointer bg-gray-900 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-700 transition"
          >
            🚀 Update Product
          </button>
        </form>
      </div>
    </div>
  )
  return <div>...Loading</div>
}

export default EditProduct