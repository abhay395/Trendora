import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import useProductStore from "../store/productStore";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import ReviewSection from "../componente/ReviewSection";

const ProductDetail = () => {
    const { id } = useParams();
    const { selectedProduct, isLoading, fetchProductById, clearSelectedProduct, fetchProductReview, review, reviewLoading } =
        useProductStore();
    const { addProductCart } = useCartStore();

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isOutOfStock, setIsOutOfStock] = useState(false);

    useEffect(() => {
        clearSelectedProduct();
        fetchProductById(id);
        fetchProductReview(id);
        setIsOutOfStock(false);
    }, [id]);

    const addToCart = () => {
        if (selectedSize) {
            addProductCart({ productId: id, quantity, size: selectedSize });
            toast.success("Added to cart!");
        } else {
            toast.error("Please select a size.");
        }
    };

    // 🔥 Auto-select first available size
    useEffect(() => {
        if (selectedProduct?.sizes?.length) {
            const available = selectedProduct.sizes.find((s) => s.quantity > 0);
            if (available) {
                setSelectedSize(available.size);
                setIsOutOfStock(false);
            } else {
                setIsOutOfStock(true);
            }
        }
    }, [selectedProduct]);

    useEffect(() => {
        setQuantity(1);
    }, [selectedSize]);

    const currentSizeObj = selectedProduct?.sizes?.find(
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

    if (isLoading || !selectedProduct) {
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
                            className="absolute disabled:opacity-70 left-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer"
                            onClick={() => setSelectedImage(selectedImage - 1)}
                        >
                            <IoIosArrowBack />
                        </button>
                        <button
                            disabled={
                                selectedImage === selectedProduct?.images.length - 1
                            }
                            className="absolute disabled:opacity-70 right-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer"
                            onClick={() => setSelectedImage(selectedImage + 1)}
                        >
                            <IoIosArrowForward />
                        </button>
                        <img
                            src={selectedProduct?.images?.[selectedImage]?.url}
                            alt="Product"
                            className="w-full h-[470px] object-top object-cover rounded-md"
                        />
                    </div>
                    <div className="w-full h-[150px] mt-2 overflow-hidden grid grid-cols-4 gap-1">
                        {selectedProduct?.images?.map((item, index) => (
                            <img
                                key={index}
                                src={item?.url}
                                alt={`Preview ${index + 1}`}
                                className={`w-full object-cover object-top  cursor-pointer`}
                                onClick={() => setSelectedImage(index)}
                            />
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
                            {selectedProduct.title}
                        </h1>
                        <div className="flex items-center gap-1 text-yellow-500 text-xl">
                            {[...Array(Math.floor(selectedProduct?.rating?.average))].map(
                                (_, i) => (
                                    <FaStar key={i} />
                                )
                            )}
                            <span className="text-sm text-gray-600 ml-2">
                                ({selectedProduct.rating.average})
                            </span>
                        </div>
                    </div>

                    {/* 🔥 Show price of selected size */}
                    <p className="text-3xl font-bold mt-4">
                        {currentSizeObj?.price} ₹
                    </p>
                    <p className="text-md font-semibold text-gray-800">
                        {selectedProduct.description}
                    </p>

                    {/* Sizes + Colors */}
                    <div className="flex items-center mt-10 text-sm md:text-lg justify-between max-w-[450px] border-b-2 border-t-2 border-gray-100 py-5">
                        <div>
                            <h3 className="mb-2 font-bold text-gray-700">Available Size</h3>
                            <div className="flex gap-2">
                                {selectedProduct?.sizes.map((item) => (
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
                {!reviewLoading && <ReviewSection productId={id} productTitle={selectedProduct?.title} reviews={review?.results} />}
            </div>
        </section>
    );
};

export default ProductDetail;
