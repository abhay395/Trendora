import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import ReviewSection from "../componente/ReviewSection";
import { useProductById, useProductReviews } from "../hooks/useProducts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductDetail = () => {
    const { id } = useParams();
    const { addProductCart } = useCartStore();
    const [sortBy, setSortBy] = useState('createdAt:desc')
    const { data: product, isLoading, error } = useProductById(id)
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    useEffect(() => {
        setIsOutOfStock(false);
    }, [id]);
    const addToCart = () => {
        if (selectedSize) {
            addProductCart({ productId: id, quantity, size: selectedSize });
        } else {
            toast.error("Please select a size.");
        }
    };

    // 🔥 Auto-select first available size
    useEffect(() => {
        if (product?.sizes?.length) {
            const available = product.sizes.find((s) => s.quantity > 0);
            if (available) {
                setSelectedSize(available.size);
                setIsOutOfStock(false);
            } else {
                setIsOutOfStock(true);
            }
        }
    }, [product]);

    useEffect(() => {
        setQuantity(1);
    }, [selectedSize]);

    const currentSizeObj = product?.sizes?.find(
        (s) => s.size === selectedSize
    );

    const increaseHandler = () => {
        if (currentSizeObj && quantity < currentSizeObj.quantity) {
            setQuantity(quantity + 1);
        } else {
            toast.error(
                `Only ${currentSizeObj?.quantity || 0} in stock`
            );
        }
    };

    const decreaseHandler = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (isLoading || !product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#000" />
            </div>
        );
    }

    return (
        <section>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-20"
            >
                {/* Left: Images */}
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="w-full relative">
                        <button
                            disabled={selectedImage === 0}
                            className="absolute disabled:opacity-70 left-1 z-50 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer"
                            onClick={() => setSelectedImage(selectedImage - 1)}
                        >
                            <IoIosArrowBack />
                        </button>
                        <button
                            disabled={
                                selectedImage === product?.images.length - 1
                            }
                            className="absolute disabled:opacity-70 z-50 right-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer"
                            onClick={() => setSelectedImage(selectedImage + 1)}
                        >
                            <IoIosArrowForward />
                        </button>
                        <LazyLoadImage
                            src={product?.images?.[selectedImage]?.url}
                            alt="Product"
                            className="w-full h-[470px] object-top object-cover rounded-md"
                            effect="blur"
                            wrapperClassName="w-full h-[470px]"
                        // wrapperClassName="w-full h-[470px] object-top object-cover rounded-md"
                        />
                    </div>
                    <div className="w-full h-[150px] mt-2 overflow-hidden grid grid-cols-4 gap-1">
                        {product?.images?.map((item, index) => (
                            <div className="rounded-md overflow-hidden">
                                <LazyLoadImage
                                    key={index}
                                    src={item?.url}
                                    alt={`Preview ${index + 1}`}
                                    className={`w-full object-cover object-top  cursor-pointer`}
                                    wrapperClassName=""
                                    onClick={() => setSelectedImage(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="w-full md:w-1/2 space-y-7 h-[600px] px-4 md:px-0 md:min-h-[500px] relative">
                    {isOutOfStock && (
                        <p className="right-0 text-white text-center rounded-3xl text-sm bg-red-500 inline px-3">
                            Out of Stock
                        </p>
                    )}

                    <div className="space-y-4">
                        <h1 className="text-4xl text-gray-700 font-bold">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-1 text-yellow-500 text-xl">
                            {[...Array(Math.floor(product?.rating?.average))].map(
                                (_, i) => (
                                    <FaStar key={i} />
                                )
                            )}
                            <span className="text-sm text-gray-600 ml-1 mt-1">
                                ({product?.rating?.average})
                            </span>
                        </div>
                    </div>

                    {/* 🔥 Show price of selected size */}
                    <p className="text-3xl font-bold mt-4">
                        {currentSizeObj?.price} ₹
                    </p>
                    <p className="text-md font-semibold text-gray-800">
                        {product.description}
                    </p>

                    {/* Sizes + Colors */}
                    <div className="flex items-center mt-10 text-sm md:text-lg justify-between max-w-[450px] border-b-2 border-t-2 border-gray-100 py-5">
                        <div>
                            <h3 className="mb-2 font-bold text-gray-700">Available Size</h3>
                            <div className="flex gap-2">
                                {product?.sizes.map((item) => (
                                    <button
                                        key={item.size}
                                        onClick={() => setSelectedSize(item.size)}
                                        disabled={item.quantity === 0}
                                        className={`px-5 py-3 border-gray-300 border font-bold text-lg rounded-lg ${selectedSize === item.size
                                            ? "bg-black text-white"
                                            : "bg-white text-black"
                                            } ${item.quantity === 0
                                                ? "opacity-50 cursor-not-allowed"
                                                : "cursor-pointer"
                                            }`}
                                    >
                                        {item.size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="pb-3 font-bold text-gray-700">Available Color</h3>
                            <div className="flex gap-2 items-center">
                                <span className="w-7 h-7 rounded-full bg-gray-400 border-2 border-gray-300 cursor-pointer" />
                                <span className="w-7 h-7 rounded-full bg-gray-800 border-2 border-gray-300 cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className="space-y-1 absolute bottom-2 md:bottom-20">
                        <div className="flex items-center gap-4 mt-4">
                            <div
                                className={`flex border rounded-md h-[50px] border-gray-200 ${selectedSize === "" ? "opacity-45 cursor-not-allowed" : ""
                                    }`}
                            >
                                <button
                                    disabled={selectedSize === ""}
                                    className="px-3 py-3 text-md cursor-pointer disabled:cursor-not-allowed"
                                    onClick={increaseHandler}
                                >
                                    <FaPlus />
                                </button>
                                <span className="px-4 py-3 text-md font-bold">{quantity}</span>
                                <button
                                    disabled={selectedSize === ""}
                                    className="px-3 py-3 text-md cursor-pointer disabled:cursor-not-allowed"
                                    onClick={decreaseHandler}
                                >
                                    <FaMinus />
                                </button>
                            </div>
                            <button
                                onClick={addToCart}
                                disabled={selectedSize === ""}
                                className="bg-black h-[50px] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Review */}
            <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
                <ReviewSection productId={id} />
            </div>
        </section>
    );
};

export default ProductDetail;
