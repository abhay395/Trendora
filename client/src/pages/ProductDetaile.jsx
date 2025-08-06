import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import useProductStore from "../store/productStore";
import { motion } from "framer-motion";
import { MoonLoader } from "react-spinners";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const { id } = useParams();
    const { selectedProduct, isLoading, fetchProductById, clearSelectedProduct } = useProductStore();
    const { addProductCart } = useCartStore();

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isOutOfStock, setIsOutOfStock] = useState(false);

    useEffect(() => {
        clearSelectedProduct()
        fetchProductById(id);
        setIsOutOfStock(false);
    }, [id]);

    const addToCart = () => {
        if (selectedSize) {
            addProductCart({ productId: id, quantity: quantity, size: selectedSize });
        } else {
            toast.error("Please select a size.");
        }
    };

    useEffect(() => {
        if (selectedProduct) {
            let sizes = { ...selectedProduct.sizes };
            let size = '';
            for (let [key, value] of Object.entries(sizes)) {
                if (value > 0) {
                    size = key;
                    break;
                }
            }
            if (size === '') {
                setIsOutOfStock(true);  // 🛑 All sizes are 0
            } else {
                setIsOutOfStock(false); // ✅ At least one size available
                setSelectedSize(size);  // ✅ Select first available size
            }
        }
    }, [selectedProduct]);

    useEffect(() => {
        setQuantity(1);
    }, [selectedSize]);

    const increaseHandler = () => {
        if (selectedSize && quantity < selectedProduct?.sizes?.[selectedSize]) {
            setQuantity(quantity + 1);
        } else {
            toast.error(`Only ${selectedProduct?.sizes?.[selectedSize] || 0} in stock`);
        }
    };
    const decreaseHandler = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (isLoading || !selectedProduct) {
        return (
            <div className='h-screen flex items-center justify-center'>
                <MoonLoader color='#000' />
            </div>
        );
    }

    return (
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
                        disabled={selectedImage === selectedProduct?.images.length - 1}
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
                <div className="w-full h-[150px] mt-2 overflow-hidden grid grid-cols-4 gap-2">
                    {selectedProduct?.images?.slice(1).map((item, index) => (
                        <img
                            key={index + 1}
                            src={item?.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full object-cover object-top rounded-md cursor-pointer"
                            onClick={() => setSelectedImage(index + 1)}
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
                    <h1 className="text-4xl text-gray-700 font-bold">{selectedProduct.title}</h1>
                    <div className="flex items-center gap-1 text-yellow-500 text-xl">
                        {[...Array(Math.floor(selectedProduct.rating))].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({selectedProduct.rating})</span>
                    </div>
                </div>

                <p className="text-3xl font-bold mt-4">{selectedProduct.price} ₹</p>
                <p className="text-md font-semibold text-gray-800">{selectedProduct.description}</p>

                <div className="flex items-center mt-10 text-sm md:text-lg justify-between max-w-[450px] border-b-2 border-t-2 border-gray-100 py-5">
                    <div>
                        <h3 className="mb-2 font-bold text-gray-700">Available Size</h3>
                        <div className="flex gap-2">
                            {Object.entries(selectedProduct?.sizes).map(([size, qty]) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    disabled={qty === 0}
                                    className={`px-5 py-3 border-gray-300 border font-bold text-lg rounded-lg ${selectedSize === size
                                        ? "bg-black text-white"
                                        : "bg-white text-black"
                                        } ${qty === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="pb-3 font-bold text-gray-700">Available Color</h3>
                        <div className="flex gap-2 items-center">
                            <span className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-300 p-5 cursor-pointer" />
                            <span className="w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-300 p-5 cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="space-y-1 absolute bottom-1 md:bottom-20">
                    <p className="text-md text-gray-500 font-semibold mt-7">
                        <span className="text-gray-800 font-bold">Last 1 left</span> - make it yours!
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <div className={`flex border rounded-md h-[50px]  border-gray-200 ${selectedSize === "" ? "opacity-45 cursor-not-allowed" : ""}`}>
                            <button
                                disabled={selectedSize === ''}
                                className="px-3 py-3 text-md  cursor-pointer disabled:cursor-not-allowed"
                                onClick={increaseHandler}
                            >
                                <FaPlus />
                            </button>
                            <span className="px-4 py-3 text-md font-bold">{quantity}</span>
                            <button
                                disabled={selectedSize === ''}
                                className="px-3 py-3 text-md cursor-pointer disabled:cursor-not-allowed"
                                onClick={decreaseHandler}
                            >
                                <FaMinus />
                            </button>
                        </div>
                        <button
                            onClick={addToCart}
                            disabled={selectedSize === ''}
                            className="bg-black h-[50px] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetail;
