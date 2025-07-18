import React from 'react'

function Card({ product }) {
  console.log(product.images)
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md sm:h-[400px] md:h-[400px] lg:h-[400px] cursor-pointer bg-white overflow-hidden">
      <div className="relative flex items-center justify-center w-full bg-white overflow-hidden">
        <img
          className="h-[250px] sm:h-[300px] md:h-[350px] hover:scale-110 w-full object-cover object-top transition-transform duration-300"
          src={product?.images[0].url}
          alt={product?.title}
        />
      </div>
      <div className="leading-7 ">
        <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-700 truncate">{product.title}</h2>
        <span className="text-xs sm:text-sm md:text-md font-semibold text-gray-500">₹{product.price}</span>
      </div>
    </div>
  )
}

export default Card