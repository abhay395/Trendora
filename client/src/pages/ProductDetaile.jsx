import React, { useEffect, useState } from "react";
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import ReviewSection from "../componente/ReviewSection";
import { useProductById } from "../hooks/useProducts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from 'framer-motion'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useUser } from "../hooks/useUser";

const ProductDetail = () => {
    const { id } = useParams();
    const { addProductCart } = useCartStore();
    const [sortBy, setSortBy] = useState('createdAt:desc')
    const { data: productData, isLoading, error } = useProductById(id)
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false)
    const { data: user } = useUser()
    const selectedSizeData = productData?.sizes?.find((s) => s.size === selectedSize)
    const formatPrice = (price) => {
        return `$${(price / 100).toFixed(2)}`
    }
    useEffect(() => {
        setIsOutOfStock(false);
    }, [id]);
    const addToCart = async () => {
        if (selectedSize && user    ) {
            console.log("Adding to cart:", { productId: id, quantity, size: selectedSize });
            await addProductCart({ productId: id, quantity, size: selectedSize });
        } else {
            if (!user) {
                toast.error("Please login to add to cart.");
                return;
            }
            toast.error("Please select a size.");
        }
    };

    // 🔥 Auto-select first available size
    useEffect(() => {
        if (productData?.sizes?.length) {
            const available = productData.sizes.find((s) => s.quantity > 0);
            if (available) {
                setSelectedSize(available.size);
                setIsOutOfStock(false);
            } else {
                setIsOutOfStock(true);
            }
        }
    }, [productData]);

    useEffect(() => {
        setQuantity(1);
    }, [selectedSize]);

    const currentSizeObj = productData?.sizes?.find(
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

    if (isLoading || !productData) {
        return (
            <div className="h-screen flex items-center justify-center">
                <MoonLoader color="#000" />
            </div>
        );
    }

    // return (
    //     <section>
    //         <motion.div
    //             initial={{ opacity: 0 }}
    //             animate={{ opacity: 1 }}
    //             transition={{ duration: 0.5 }}
    //             className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-20"
    //         >
    //             {/* Left: Images */}
    //             <div className="flex flex-col w-full md:w-1/2">
    //                 <div className="w-full relative">
    //                     <button
    //                         disabled={selectedImage === 0}
    //                         className="absolute disabled:opacity-70 left-1 z-50 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer"
    //                         onClick={() => setSelectedImage(selectedImage - 1)}
    //                     >
    //                         <IoIosArrowBack />
    //                     </button>
    //                     <button
    //                         disabled={
    //                             selectedImage === product?.images.length - 1
    //                         }
    //                         className="absolute disabled:opacity-70 z-50 right-1 top-1/2 bg-white p-1 rounded-sm text-xl cursor-pointer"
    //                         onClick={() => setSelectedImage(selectedImage + 1)}
    //                     >
    //                         <IoIosArrowForward />
    //                     </button>
    //                     <LazyLoadImage
    //                         src={product?.images?.[selectedImage]?.url}
    //                         alt="Product"
    //                         className="w-full h-[470px] object-top object-cover rounded-md"
    //                         effect="blur"
    //                         wrapperClassName="w-full h-[470px]"
    //                     // wrapperClassName="w-full h-[470px] object-top object-cover rounded-md"
    //                     />
    //                 </div>
    //                 <div className="w-full h-[150px] mt-2 overflow-hidden grid grid-cols-4 gap-1">
    //                     {product?.images?.map((item, index) => {
    //                         if (index != 4) return <div className="rounded-md overflow-hidden">
    //                             <LazyLoadImage
    //                                 key={index}
    //                                 src={item?.url}
    //                                 alt={`Preview ${index + 1}`}
    //                                 className={`w-full object-cover object-top  cursor-pointer`}
    //                                 wrapperClassName=""
    //                                 onClick={() => setSelectedImage(index)}
    //                                 effect="blur"
    //                             />
    //                         </div>
    //                     })}
    //                 </div>
    //             </div>

    //             {/* Right: Product Info */}
    //             <div className="w-full md:w-1/2 space-y-7 h-[600px] px-4 md:px-0 md:min-h-[500px] relative">
    //                 {isOutOfStock && (
    //                     <p className="right-0 text-white text-center rounded-3xl text-sm bg-red-500 inline px-3">
    //                         Out of Stock
    //                     </p>
    //                 )}

    //                 <div className="space-y-4">
    //                     <h1 className="text-4xl text-gray-700 font-bold">
    //                         {product.title}
    //                     </h1>
    //                     <div className="flex items-center gap-1 text-yellow-500 text-xl">
    //                         {[...Array(Math.floor(product?.rating?.average))].map(
    //                             (_, i) => (
    //                                 <FaStar key={i} />
    //                             )
    //                         )}
    //                         <span className="text-sm text-gray-600 ml-1 mt-1">
    //                             ({product?.rating?.average})
    //                         </span>
    //                     </div>
    //                 </div>

    //                 {/* 🔥 Show price of selected size */}
    //                 <p className="text-3xl font-bold mt-4">
    //                     {currentSizeObj?.price} ₹
    //                 </p>
    //                 <p className="text-md font-semibold text-gray-800">
    //                     {product.description}
    //                 </p>

    //                 {/* Sizes + Colors */}
    //                 <div className="flex items-center mt-10 text-sm md:text-lg justify-between max-w-[450px] border-b-2 border-t-2 border-gray-100 py-5">
    //                     <div>
    //                         <h3 className="mb-2 font-bold text-gray-700">Available Size</h3>
    //                         <div className="flex gap-2">
    //                             {product?.sizes.map((item) => (
    //                                 <button
    //                                     key={item.size}
    //                                     onClick={() => setSelectedSize(item.size)}
    //                                     disabled={item.quantity === 0}
    //                                     className={`px-5 py-3 border-gray-300 border font-bold text-lg rounded-lg ${selectedSize === item.size
    //                                         ? "bg-black text-white"
    //                                         : "bg-white text-black"
    //                                         } ${item.quantity === 0
    //                                             ? "opacity-50 cursor-not-allowed"
    //                                             : "cursor-pointer"
    //                                         }`}
    //                                 >
    //                                     {item.size}
    //                                 </button>
    //                             ))}
    //                         </div>
    //                     </div>

    //                     <div>
    //                         <h3 className="pb-3 font-bold text-gray-700">Available Color</h3>
    //                         <div className="flex gap-2 items-center">
    //                             <span className="w-7 h-7 rounded-full bg-gray-400 border-2 border-gray-300 cursor-pointer" />
    //                             <span className="w-7 h-7 rounded-full bg-gray-800 border-2 border-gray-300 cursor-pointer" />
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/* Quantity + Add to Cart */}
    //                 <div className="space-y-1 absolute bottom-2 md:bottom-20">
    //                     <div className="flex items-center gap-4 mt-4">
    //                         <div
    //                             className={`flex border rounded-md h-[50px] border-gray-200 ${selectedSize === "" ? "opacity-45 cursor-not-allowed" : ""
    //                                 }`}
    //                         >
    //                             <button
    //                                 disabled={selectedSize === ""}
    //                                 className="px-3 py-3 text-md cursor-pointer disabled:cursor-not-allowed"
    //                                 onClick={increaseHandler}
    //                             >
    //                                 <FaPlus />
    //                             </button>
    //                             <span className="px-4 py-3 text-md font-bold">{quantity}</span>
    //                             <button
    //                                 disabled={selectedSize === ""}
    //                                 className="px-3 py-3 text-md cursor-pointer disabled:cursor-not-allowed"
    //                                 onClick={decreaseHandler}
    //                             >
    //                                 <FaMinus />
    //                             </button>
    //                         </div>
    //                         <button
    //                             onClick={addToCart}
    //                             disabled={selectedSize === ""}
    //                             className="bg-black h-[50px] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md"
    //                         >
    //                             Add to cart
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </motion.div>
    //         {/* Review */}
    //         <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
    //             <ReviewSection productId={id} />
    //         </div>
    //     </section>
    // );
    return <div
        className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Fashion Store</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            <Heart className="w-6 h-6" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            <ShoppingCart className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm text-gray-500">
                <span>Home</span> / <span>{productData.gender}</span> / <span>{productData.category.name}</span> /{" "}
                <span className="text-gray-900">{productData.title}</span>
            </nav>
        </div>

        {/* Main Content */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
                        <LazyLoadImage
                            src={productData.images[selectedImage]?.url || "/placeholder.svg"}
                            alt={productData.title}
                            className="w-full h-full object-cover object-top"
                            effect="blur"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-5 gap-2">
                        {productData.images.map((image, index) => (
                            <button
                                key={image._id}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-colors ${selectedImage === index ? "border-gray-700" : "border-transparent hover:border-gray-300"
                                    }`}
                            >
                                <LazyLoadImage
                                    src={image.url || "/placeholder.svg"}
                                    alt={`${productData.title} view ${index + 1}`}
                                    className="w-full h-full object-cover object-top"
                                    effect="blur"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{productData.title}</h1>
                        <p className="text-gray-600">{productData.description}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                (star) < productData.rating.average ? <Star key={star} className="w-5 h-5 text-orange-400" fill="orange" /> : <Star key={star} className="w-5 h-5 text-gray-200" fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">({productData.rating.count} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        {selectedSizeData ? (
                            <div className="text-3xl font-bold text-gray-900">₹{(selectedSizeData.price)}</div>
                        ) : (
                            <div className="text-3xl font-bold text-gray-900">
                                {/* {Math.min(...productData.sizes.map((s) => s.price))} -{" "} */}
                                {Math.max(...productData.sizes.map((s) => s.price))}
                            </div>
                        )}
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">Size</h3>
                        <div className="flex gap-2">
                            {productData.sizes.map((sizeOption) => (
                                <button
                                    key={sizeOption.size}
                                    onClick={() => setSelectedSize(sizeOption.size)}
                                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${selectedSize === sizeOption.size
                                        ? "border-black bg-black text-white"
                                        : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    {sizeOption.size}
                                </button>
                            ))}
                        </div>
                        {selectedSizeData && <p className="text-sm text-gray-600">{selectedSizeData.quantity} in stock</p>}
                    </div>

                    {/* Quantity */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={decreaseHandler}
                                className="w-10 h-10 border border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <button
                                onClick={increaseHandler}
                                className="w-10 h-10 border border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            disabled={!selectedSize}
                            onClick={addToCart}
                            className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>

                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`w-full py-3 px-6 rounded-lg font-semibold border transition-colors flex items-center justify-center gap-2 ${isWishlisted
                                ? "bg-black text-white border-black"
                                : "bg-white border-black text-black hover:bg-black hover:text-white"
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>

                    {/* Features */}
                    <div className="border-t pt-6 space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Truck className="w-5 h-5" />
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <RotateCcw className="w-5 h-5" />
                            <span>30-day return policy</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Shield className="w-5 h-5" />
                            <span>2-year warranty included</span>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="border-t pt-6 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Category:</span>
                                <span>{productData.category.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Gender:</span>
                                <span>{productData.gender}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Product ID:</span>
                                <span>{productData.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Review */}
            <ReviewSection productId={id} />
        </motion.div>
    </div>
};

export default ProductDetail;
