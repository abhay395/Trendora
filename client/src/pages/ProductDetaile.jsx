import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import useProductStore from "../store/productStore";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import useCartStore from "../store/cartStore";
const ProductDetaile = () => {
    const { id } = useParams()
    // console.log(id)
    const { selectedProduct, isLoading, error, fetchProductById } = useProductStore()
    const { addProductCart } = useCartStore();
    const [selectedSize, setSelectedSize] = useState("S");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelecteImage] = useState(0)
    // const notify = () => toast('Here is your toast.');
    useEffect(() => {
        fetchProductById(id);
    }, [id])
    const addToCart = () => {
        addProductCart({ productId: id, quantity: quantity, size: selectedSize })
    }
    if (isLoading || !selectedProduct) return <div className='h-screen flex items-center justify-center'><MoonLoader color='#000' /></div>
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-20">
            {/* Left: Images */}
            <div className="flex flex-col w-full md:w-1/2">
                <div className="w-full relative">
                    <button disabled={selectedImage == 0} className="absolute disabled:opacity-70 left-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer" onClick={() => {
                        setSelecteImage(selectedImage - 1)
                    }}><IoIosArrowBack /></button>
                    <button disabled={selectedImage == selectedProduct?.images.length - 1} className="absolute disabled:opacity-70 right-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer" onClick={() => {
                        setSelecteImage(selectedImage + 1)
                    }}><IoIosArrowForward /></button>
                    <img
                        src={selectedProduct?.images[selectedImage]?.url}
                        alt="Blazer"
                        className=" w-full h-[470px] object-top object-cover rounded-md"
                    />
                </div>
                <div className="w-full h-[150px] mt-2 overflow-hidden grid grid-cols-4 gap-2">
                    {selectedProduct?.images.map((item, index) => {
                        if (index > 0) return <img
                            key={index}
                            src={item?.url}
                            alt={`Preview ${index}`}
                            className="w-full object-cover object-top rounded-md cursor-pointer"
                            onClick={() => { setSelecteImage(index) }}
                        />
                    })}
                </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full md:w-1/2 space-y-7 h-[600px] px-4 md:px-0 md:min-h-[500px] relative">
                <div className="space-y-4">
                    <h1 className="text-4xl text-gray-700 font-bold">{selectedProduct.title}</h1>
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-500 text-xl">
                        {[...Array(Math.floor(selectedProduct.rating))].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({selectedProduct.rating})</span>
                    </div>
                </div>

                {/* Price */}
                <p className="text-3xl font-bold mt-4">{selectedProduct.price} ₹</p>
                {/* Description */}
                <p className="tex-md font-semibold text-gray-800">{selectedProduct.description}</p>
                {/* Size Selection */}
                <div className="flex items-center mt-10 text-sm md:text-lg justify-between max-w-[450px] border-b-2 border-t-2 border-gray-100 py-5">
                    <div className="">
                        <h3 className="mb-2 font-bold  text-gray-700">Available Size</h3>
                        <div className="flex gap-2">
                            {[...Object.entries(selectedProduct?.sizes)].map(([size, qty]) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    disabled={qty === 0}
                                    className={`px-5 py-3 border font-bold text-lg cursor-pointer border-gray-100 rounded-lg ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                                        } ${qty === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
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
                <div className="space-y-1 absolute bottom-1 md:bottom-20">
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
                        <button onClick={addToCart} className="bg-black h-[50px] text-white px-6 py-2 rounded-md cursor-pointer">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetaile;
