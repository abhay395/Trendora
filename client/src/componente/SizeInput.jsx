import React from "react";
import { useFieldArray } from "react-hook-form";
import { FiTrash2, FiPlus } from "react-icons/fi";

function SizeInput({ control, register, trigger, disabled }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  return (
    <div className="w-full">
      <label className="block text-gray-800 font-bold mb-4 text-xl tracking-tight">
        Sizes, Price & Quantity
      </label>

      <div className="space-y-4">
        {fields.length === 0 && (
          <div className="text-gray-400 italic text-sm mb-2">
            No sizes added yet. Click{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-black">
              <FiPlus className="inline" /> Add Size
            </span>{" "}
            to begin.
          </div>
        )}

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center p-4 border border-gray-100 rounded-2xl bg-gray-50 shadow-sm relative group transition hover:shadow-md"
          >
            <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-4">
              {/* Size */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1">Size</label>
                <input
                  type="text"
                  placeholder="e.g. M, L, XL"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none bg-white transition"
                  {...register(`sizes.${index}.size`, { required: true })}
                  disabled={disabled}
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1">Price (₹)</label>
                <input
                  type="number"
                  placeholder="Price"
                  min="0"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none bg-white transition w-28"
                  {...register(`sizes.${index}.price`, { required: true })}
                  disabled={disabled}
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1">Quantity</label>
                <input
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none bg-white transition w-28"
                  {...register(`sizes.${index}.quantity`, { required: true })}
                  disabled={disabled}
                />
              </div>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => {
                remove(index);
                trigger("sizes"); // ✅ refresh dirtyFields after removing
              }}
              disabled={disabled}
              className="absolute top-2 right-2 md:static md:ml-2 text-red-500 hover:bg-red-100 hover:text-red-700 p-2 rounded-lg transition flex items-center justify-center"
              title="Remove size"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {/* Add button */}
        <button
          type="button"
          onClick={() => append({ size: "", price: "", quantity: "" })}
          className="w-full cursor-pointer md:w-auto mt-2 px-5 py-2 bg-black text-white font-semibold rounded-xl border border-black flex items-center justify-center gap-2 transition hover:bg-gray-900 hover:scale-[1.03] shadow"
        >
          <FiPlus className="w-5 h-5" /> Add Size
        </button>
      </div>
    </div>
  );
}

export default SizeInput;
