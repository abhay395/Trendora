import React, { useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductDetaile = () => {
    const [selectedSize, setSelectedSize] = useState("S");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelecteImage] = useState(0)
    const sizes = ["S", "M", "L"];
    const images = [
        "https://assets.ajio.com/medias/sys_master/root/20250616/Q6AN/684fe9be7a6cd4182fb36dff/-473Wx593H-443082538-olive-MODEL.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20250616/ejCM/684fe9777a6cd4182fb36bca/-473Wx593H-443082538-olive-MODEL7.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20250616/p3aj/684fe9ef7a6cd4182fb370ff/-473Wx593H-443082538-olive-MODEL2.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20250616/3Awk/684fe60f7a6cd4182fb35277/-473Wx593H-443082538-olive-MODEL6.jpg",
        "https://assets.ajio.com/medias/sys_master/root/20250616/O8Ca/684fe54c7a6cd4182fb34f43/-473Wx593H-443082538-olive-MODEL5.jpg",
    ];

    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-40">
            {/* Left: Images */}
            <div className="flex flex-col w-full md:w-1/2">
                <div className="w-full relative">
                    <button disabled={selectedImage == 0} className="absolute disabled:opacity-70 left-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer" onClick={() => {
                        setSelecteImage(selectedImage - 1)
                    }}><IoIosArrowBack /></button>
                    <button disabled={selectedImage == images.length - 1} className="absolute disabled:opacity-70 right-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer" onClick={() => {
                        setSelecteImage(selectedImage + 1)
                    }}><IoIosArrowForward /></button>
                    <img
                        src={images[selectedImage]}
                        alt="Blazer"
                        className=" w-full h-[470px] object-top object-cover rounded-md"
                    />
                </div>
                <div className="w-full h-[150px] mt-2 overflow-hidden grid grid-cols-4 gap-2">
                    {images.map((img, index) => {
                        if (index > 0) return <img
                            key={index}
                            src={img}
                            alt={`Preview ${index}`}
                            className="w-full object-cover object-top rounded-md cursor-pointer"
                            onClick={() => { setSelecteImage(index) }}
                        />
                    })}
                </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full md:w-1/2 space-y-4 h-[470px] ">
                <h1 className="text-4xl text-gray-700 font-bold">Blazer Jacket</h1>
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500 text-xl">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                </div>

                {/* Price */}
                <p className="text-3xl font-bold mt-4">₹2500</p>

                {/* Size Selection */}
                <div className="flex items-center mt-10 text-lg justify-between max-w-[450px] border-b-2 border-t-2 border-gray-100 py-5">
                    <div className="">
                        <h3 className="mb-2 font-bold  text-gray-700">Available Size</h3>
                        <div className="flex gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-5 py-3 border font-bold text-lg cursor-pointer border-gray-100 rounded-lg ${selectedSize === size
                                        ? "bg-black text-white"
                                        : "bg-white text-black"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <h3 className="pb-3 font-bold text-gray-700 ">Available Color</h3>
                        <div className="flex gap-2 items-center">
                            <span className="w-5 h-5 rounded-full  cursor-pointer bg-gray-400 border-2 border-gray-300 p-5" />
                            <span className="w-5 h-5 rounded-full cursor-pointer bg-gray-800 border-2 border-gray-300 p-5" />
                        </div>
                    </div>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="space-y-1 mt-16">
                    <p className="text-md text-gray-500 font-semibold mt-7">
                        <span className="text-gray-800 font-bold">Last 1 left</span> - make it yours!
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex border rounded-md h-[50px] border-gray-200">
                            <button
                                className="px-3 py-3 text-md cursor-pointer"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <FaPlus />
                            </button>
                            <span className="px-4 py-3 text-md font-bold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-3 text-md cursor-pointer"
                            >
                                <FaMinus />
                            </button>
                        </div>
                        <button className="bg-black h-[50px] text-white px-6 py-2 rounded-md">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetaile;
