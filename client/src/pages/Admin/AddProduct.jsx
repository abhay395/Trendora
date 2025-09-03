import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import SizeInput from "../../componente/SizeInput";
import { useAdminCategories, useCreateProduct, useUploadBulkProduct } from "../../hooks/useAdmin";

function AddProduct() {
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [mode, setMode] = useState("manual"); // 👈 form or csv
  const { data: categories } = useAdminCategories()

  const { mutate: bulkProductUpload, status: statusForBulkUpload } = useUploadBulkProduct()
  const { mutate: AddProductInAdmin, status: statusForSinglUpload, isSuccess } = useCreateProduct()
  const { register, handleSubmit, formState: { errors }, control, reset, setError
  } = useForm({
    defaultValues: {
      title: "",
      sizes: [{ size: "", price: "", quantity: "" }],
      category: "",
      gender: "",
      description: ""
    }
  })

  const { fields, append, remove } = useFieldArray({ control, name: "sizes" });


  const onSubmit = async (data) => {
    const form = new FormData();
    data.images.forEach((fileList, idx) => {
      if (fileList?.[0]) {
        form.append("images", fileList[0]);
        console.log("Image " + idx, fileList[0]); // 👌 shows File object now
      }
    });
    for (let [key, value] of Object.entries(data)) {
      if (key != 'images' && key != 'sizes' && key != 'csv') {
        form.append(key, value)
      }
    }
    data?.sizes.forEach((s, idx) => {
      form.append(`sizes[${idx}][size]`, s.size);
      form.append(`sizes[${idx}][quantity]`, s.quantity);
      form.append(`sizes[${idx}][price]`, s.price);
    });
    AddProductInAdmin(form);
  };
  const onSubmitForCsv = async (data) => {
    const form = new FormData();
    console.log(data)
    form.append('file', data.csv[0])
    bulkProductUpload(form)
  }

  // 🧹 Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previews]);
  const [formKey, setFormKey] = useState(0);


  useEffect(() => {
    if (isSuccess) {
      reset();
      setPreviews([null, null, null, null]);
      // setFormKey((prev) => prev + 1); // force rerender to clear file inputs
    }
  }, [isSuccess, reset]);
  useEffect(() => {
    console.log(errors)
  }, [errors])


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white/90 shadow-xl rounded-3xl p-10 border border-gray-100">
        {/* Mode Switch */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode("manual")}
            className={`px-4 py-2 rounded-xl cursor-pointer font-semibold ${mode === "manual" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Manual Form
          </button>
          <button
            onClick={() => setMode("csv")}
            className={`px-4 py-2 rounded-xl cursor-pointer font-semibold ${mode === "csv" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Upload CSV
          </button>
        </div>
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center gap-2">
          <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-lg">
            +
          </span>
          Add New Product
        </h2>
        {
          mode == 'manual' ? (<form onSubmit={handleSubmit(onSubmit)} key={formKey} className="space-y-8">
            {/* Product Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Classic White Shirt"
                  className='w-full border-2 rounded-xl px-4 py-2 transition 
                    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                    border-gray-200   '
                  {...register("title", { required: "title is required" })}
                  disabled={statusForSinglUpload == 'pending'}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  className='w-full border-2 rounded-xl px-4 py-2 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-200  '
                  {...register("category", { required: "category is required" })}
                  disabled={statusForSinglUpload == 'pending'}
                >
                  <option value="">Select category</option>
                  {categories?.results?.map((op) => <option key={op._id} value={op._id} className="outline-none">{op.name}</option>)}
                </select>
                {errors?.category && (
                  <span className="text-red-500 text-sm">
                    {errors?.category.message}
                  </span>
                )}
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
                  className='w-full border-2 rounded-xl px-4 py-2 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-200  '
                  {...register("gender", { required: "gender is required" })}
                  disabled={statusForSinglUpload == 'pending'}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
                {errors?.gender && (
                  <span className="text-red-500 text-sm">
                    {errors?.gender.message}
                  </span>
                )}
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
                {...register("description", { required: "description is required" })}
                rows="4"
                className="w-full border-2 rounded-xl px-4 py-2 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-200 focus:outline-none"
                // className={`w-full border-2 rounded-xl px-4 py-2 transition 
                //         ${statusForSinglUpload === "pending"
                //     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                //     : "border-gray-200  "}`}
                disabled={statusForSinglUpload == 'pending'}
              />
              {errors?.description && (
                <span className="text-red-500 text-sm">
                  {errors?.description.message}
                </span>
              )}
            </div>

            {/* Image Upload with Icon */}
            <div>
              <label className="block text-gray-700 font-semibold mb-4">
                Product Images <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[...new Array(2)].map((_, idx) => (
                  <Controller
                    key={idx}
                    control={control}
                    name={`images.${idx}`}
                    rules={{ required: idx === 0 }}
                    render={({ field, fieldState: { error } }) => (
                      <label
                        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 border-gray-400 cursor-pointer transition relative group
                        ${statusForSinglUpload === "pending" && "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"} hover:border-gray-600`}>
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
                          disabled={statusForSinglUpload == 'pending'}
                        />
                        {error && (
                          <span className="text-red-500 text-xs absolute bottom-0">
                            {error.type === "required" ? "This image is required" : "Invalid file"}
                          </span>
                        )}
                      </label>
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Upload up to 4 images (JPG, PNG, GIF) — Max 2MB each.
              </p>
            </div>
            <SizeInput register={register} fields={fields} append={append} remove={remove} control={control} disabled={statusForSinglUpload == 'pending'} />
            {/* Submit */}
            <button
              type="submit"
              disabled={statusForSinglUpload === "pending"} // disable while loading
              className="w-full cursor-pointer py-3 rounded-xl font-bold text-lg shadow-lg transition
              disabled:bg-gray-500 disabled:text-gray-900 disabled:cursor-not-allowed disabled:hover:scale-100
              bg-gray-900 text-white hover:bg-gray-700"
            >
              {statusForSinglUpload === "pending" ? "⏳ Loading..." : "🚀 Add Product"}
            </button>

          </form>) : (
            // ✅ CSV Upload Mode
            <form
              onSubmit={handleSubmit(onSubmitForCsv)}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 max-w-xl mx-auto text-center"
            >
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="bg-gray-100 p-5 rounded-full mb-4">
                  <FiUploadCloud className="text-5xl text-black" />
                </div>

                {/* Heading */}
                <h3 className="text-xl font-bold text-black mb-2">
                  Import Products via CSV
                </h3>
                <p className="text-sm text-gray-700 mb-6">
                  Upload your product list in{" "}
                  <span className="font-semibold">CSV format</span>. Make sure it
                  follows the required structure.
                </p>

                {/* File Input */}
                <Controller
                  control={control}
                  name="csv"
                  rules={{ required: "Csv file is required" }}
                  render={({ field, fieldState: { error } }) => {
                    console.log(error)
                    const fileName = field.value?.[0]?.name || "No file selected";
                    return (
                      <div className="flex flex-col items-center mb-4">
                        <label className={`cursor-pointer ${statusForBulkUpload === 'pending' && 'opacity-50 pointer-events-none'} bg-white border border-black hover:bg-gray-100 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200`}>
                          Choose CSV File
                          <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) field.onChange(e.target.files);
                            }}
                            disabled={statusForBulkUpload == 'pending'}
                          />
                        </label>
                        {error && (
                          <span className="text-red-500 text-sm">
                            {error.message}
                          </span>
                        )}
                        <span className="mt-2 text-sm text-gray-700">{fileName}</span>
                      </div>
                    );
                  }}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={statusForBulkUpload == 'pending'}
                  className="mt-2 cursor-pointer w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
                >
                  {statusForBulkUpload === "pending" ? "⏳ Loading..." : "🚀 Upload CSV"}
                </button>

                {/* CSV Instructions */}
                <div className="mt-8 bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-left w-full">
                  <h4 className="text-sm font-bold text-black mb-3">CSV Guidelines:</h4>
                  <ul className="text-xs text-gray-700 list-disc pl-5 space-y-1">
                    <li>
                      Headers must be:{" "}
                      <code>title, category, price, gender, description, sizes</code>
                    </li>
                    <li>
                      <code>sizes</code> column should be in JSON format. Example:{" "}
                      <code>
                        [{`{"size":"M","quantity":10},{"size":"L","quantity":5}`}]
                      </code>
                    </li>
                    <li>Prices should be numbers only (no currency symbols).</li>
                    <li>
                      Gender should be one of: <code>Men, Women, Unisex</code>.
                    </li>
                  </ul>

                  {/* Example Row */}
                  <div className="mt-4 bg-gray-50 p-3 rounded-md border border-dashed border-gray-300">
                    <p className="text-xs font-mono text-gray-700">
                      T-Shirt, Clothing, 599, Men, "Cotton T-shirt", [
                      {`{"size":"M","quantity":10},{"size":"L","quantity":5}`}]
                    </p>
                  </div>
                </div>
              </div>
            </form>

          )
        }
      </div>
    </div>
  );
}

export default AddProduct;
