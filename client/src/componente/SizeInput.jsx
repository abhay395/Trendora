import React from "react";
import { useFieldArray } from "react-hook-form";

function SizeInput({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes"
  });

  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        Sizes & Quantity
      </label>
      <div className="space-y-4">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-4 items-center  p-3 rounded-lg"
          >
            <input
              type="text"
              placeholder="Size (e.g. M, L, XL)"
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              {...register(`sizes.${index}.size`, { required: true })}
            />
            <input
              type="number"
              placeholder="Quantity"
              min="0"
              className="w-32 border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              {...register(`sizes.${index}.quantity`, { required: true })}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 font-bold px-2"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ size: "", quantity: 0 })}
          className="px-4 py-2 bg-gray-100 rounded-xl border border-gray-300 hover:bg-gray-200 transition"
        >
          + Add Size
        </button>
      </div>
    </div>
  );
}

export default SizeInput;
