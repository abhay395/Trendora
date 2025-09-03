import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { FiUploadCloud } from "react-icons/fi";
import SizeInput from "../../componente/SizeInput";
import { useAdminCategories, useAdminProductById, useUpdateProduct } from '../../hooks/useAdmin';
function EditProduct() {
  const { id } = useParams();
  const [previews, setPreviews] = useState([null, null, null, null]);
  const { data: categories } = useAdminCategories()
  const { mutate: updateProduct, status } = useUpdateProduct(id)
  const { data: product, isLoading } = useAdminProductById(id);
  const { register, handleSubmit, formState: { errors }, control, reset, trigger } = useForm({
    defaultValues: {
      title: "",
      category: "",
      gender: "",
      description: "",
      images: [null, null, null, null],
      sizes: [{ size: "", price: "", quantity: "" }]
    }
  })
  const { fields, append, remove } = useFieldArray({ control, name: "sizes" });

  const onSubmit = (data) => {
    // const updatedFields = {};
    const changed = {}
    Object.keys(data).forEach((key) => {
      if (JSON.stringify(data[key]) !== JSON.stringify(product[key])) {
        changed[key] = data[key];
      }
    });
    let updatedImage = []
    if (changed?.images) {
      changed.images?.forEach((item, idx) => {
        if (item[0] instanceof File && product.images[idx]?._id) {
          updatedImage.push({ file: item[0], _id: product.images[idx]?._id })
        }
      })
      changed.images = updatedImage
    }
    const form = new FormData()
    for (let [key, value] of Object.entries(changed)) {
      if (key != 'images' && key != 'sizes') {
        form.append(key, value)
      }
    }
    if (changed.images) {
      changed.images.forEach((img, idx) => {
        form.append(`images`, img.file)
        form.append(`recordOfId[${idx}][oldId]`, img._id)
        form.append(`recordOfId[${idx}][idx]`, idx)
      })
    }
    if (changed?.sizes) {
      changed?.sizes.forEach((s, idx) => {
        form.append(`sizes[${idx}][size]`, s.size);
        form.append(`sizes[${idx}][quantity]`, s.quantity);
        form.append(`sizes[${idx}][price]`, s.price);
      });
    }
    if (Object.entries(changed).length > 0) updateProduct(form)
  }
  useEffect(() => {
    if (product) {
      setPreviews(product.images.map(img => img.url))
      reset(product)
    }
  }, [product])
  if (!isLoading) return (
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
                className="w-full border-2 rounded-xl px-4 py-2 transition 
                    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                    border-gray-200 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                {...register("title", { required: true })}
                disabled={status == "pending"}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                className="w-full border-2 rounded-xl px-4 py-2 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-200 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                {...register("category", { required: true })}
                disabled={status == "pending"}
              >
                <option value="">Select category</option>
                {categories?.results?.map((op) => <option key={op._id} value={op._id} className="outline-none">{op.name}</option>)}
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
                className="w-full border-2 rounded-xl px-4 py-2 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-200 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                {...register("gender", { required: true })}
                disabled={status == "pending"}
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
              disabled={status == "pending"}
            />
          </div>

          {/* Image Upload with Icon */}
          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Product Images <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {product?.images?.map((_, idx) => (
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
                        disabled={status == "pending"}
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
          <SizeInput register={register} fields={fields} append={append} remove={remove} control={control} trigger={trigger} disabled={status == "pending"} />
          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-gray-900 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-700 transition"
          >
            {!(status == "pending") ? '🚀 Update Product' : "...Loading"}
          </button>
        </form>
      </div>
    </div>
  )
  return <div>...Loading</div>
}

export default EditProduct