import React, { useEffect, useState } from "react";
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, Share2 } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import ReviewSection from "../components/ReviewSection";
import { useProductById } from "../hooks/useProducts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, AnimatePresence } from 'framer-motion';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useUser } from "../hooks/useUser";
import { useAddProductCart } from "../hooks/useCart";

const ProductDetail = () => {
    const { id } = useParams();
    const { mutateAsync: addProductCart } = useAddProductCart();
    const { data: productData, isLoading } = useProductById(id);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    
    const { data: user } = useUser();
    
    // Derived state
    const selectedSizeData = productData?.sizes?.find((s) => s.size === selectedSize);
    
    // Calculate display price (Range or Specific)
    const priceDisplay = selectedSizeData 
        ? `₹${selectedSizeData.price}` 
        : productData?.sizes?.length 
            ? `₹${Math.min(...productData.sizes.map(s => s.price))} - ₹${Math.max(...productData.sizes.map(s => s.price))}` 
            : "N/A";

    // --- Effects ---

    // Reset stock state on ID change
    useEffect(() => {
        setIsOutOfStock(false);
    }, [id]);

    // Auto-select first available size
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

    // Reset quantity when size changes
    useEffect(() => {
        setQuantity(1);
    }, [selectedSize]);

    // --- Handlers ---

    const addToCart = async () => {
        if (!user) {
            toast.error("Please login to add to cart.");
            return;
        }
        if (!selectedSize) {
            toast.error("Please select a size.");
            return;
        }
        
        try {
            let response = await addProductCart({ productId: id, quantity, size: selectedSize });
            if (response?.message) {
                toast.success(response?.message || "Product added to cart");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add to cart");
        }
    };

    const increaseHandler = () => {
        if (selectedSizeData && quantity < selectedSizeData.quantity) {
            setQuantity(prev => prev + 1);
        } else {
            toast.error(`Only ${selectedSizeData?.quantity || 0} in stock`);
        }
    };

    const decreaseHandler = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    if (isLoading || !productData) {
        return (
            <div className="h-screen flex items-center justify-center bg-white">
                <MoonLoader color="#000" size={30} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
                <nav className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-2">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
                    <span className="capitalize">{productData.gender}</span>
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
                    <span className="capitalize">{productData.category?.name}</span>
                    <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
                    <span className="text-black font-medium truncate">{productData.title}</span>
                </nav>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                    
                    {/* --- Left Column: Image Gallery --- */}
                    <div className="lg:col-span-7 mb-10 lg:mb-0">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col-reverse lg:flex-row gap-4"
                        >
                            {/* Thumbnails (Left side on desktop, Bottom on mobile) */}
                            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] scrollbar-hide">
                                {productData.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            selectedImage === index 
                                            ? "border-black ring-1 ring-black ring-offset-2" 
                                            : "border-transparent hover:border-gray-200"
                                        }`}
                                    >
                                        <LazyLoadImage
                                            src={image.url}
                                            alt={`Thumbnail ${index}`}
                                            className="w-full h-full object-cover object-top"
                                            effect="opacity"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="flex-1 relative bg-gray-50 rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[700px]">
                                <LazyLoadImage
                                    src={productData.images[selectedImage]?.url}
                                    alt={productData.title}
                                    className="w-full h-full object-cover object-top"
                                    effect="blur"
                                />
                                {/* Image Tags */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {isOutOfStock && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                            Out of Stock
                                        </span>
                                    )}
                                    {!isOutOfStock && (
                                        <span className="bg-white border border-gray-200 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                            In Stock
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- Right Column: Product Details --- */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            
                            {/* Title & Price */}
                            <div className="space-y-4 border-b border-gray-100 pb-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                                            {productData.title}
                                        </h1>
                                        <div className="flex items-center gap-2">
                                            <div className="flex text-black">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={16} 
                                                        fill={i < Math.floor(productData.rating.average) ? "currentColor" : "none"} 
                                                        className={i < Math.floor(productData.rating.average) ? "" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500 underline decoration-gray-300 underline-offset-4">
                                                {productData.rating.count || 0} Reviews
                                            </span>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                                
                                <div className="text-3xl font-medium text-gray-900">
                                    {priceDisplay}
                                </div>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    {productData.description}
                                </p>
                            </div>

                            {/* Selectors */}
                            <div className="space-y-6">
                                {/* Size */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-semibold text-gray-900">Select Size</span>
                                        <button className="text-sm text-gray-500 underline hover:text-black">Size Guide</button>
                                    </div>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                        {productData.sizes.map((item) => {
                                            const isAvailable = item.quantity > 0;
                                            return (
                                                <button
                                                    key={item.size}
                                                    onClick={() => {
                                                        if (isAvailable) setSelectedSize(item.size);
                                                    }}
                                                    disabled={!isAvailable}
                                                    className={`py-2.5 text-sm font-medium rounded-md border transition-colors duration-200 ${
                                                        selectedSize === item.size
                                                            ? "border-black bg-black text-white"
                                                            : isAvailable
                                                                ? "border-gray-200 bg-white text-gray-900 hover:border-black"
                                                                : "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed decoration-slice line-through"
                                                    }`}
                                                >
                                                    {item.size}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    {selectedSizeData && (
                                        <p className={`text-xs mt-2 font-medium ${selectedSizeData.quantity < 5 ? "text-red-600" : "text-green-600"}`}>
                                            {selectedSizeData.quantity < 5 ? `Hurry! Only ${selectedSizeData.quantity} left.` : "Available in stock"}
                                        </p>
                                    )}
                                </div>

                                {/* Quantity & Add to Cart Row */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-32 h-12">
                                        <button 
                                            onClick={decreaseHandler}
                                            className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 rounded-l-lg transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="flex-1 text-center font-semibold text-gray-900">{quantity}</span>
                                        <button 
                                            onClick={increaseHandler}
                                            className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 rounded-r-lg transition-colors"
                                            disabled={selectedSizeData && quantity >= selectedSizeData.quantity}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={addToCart}
                                        disabled={isOutOfStock || !selectedSize}
                                        className="flex-1 h-12 bg-black text-white rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart size={18} />
                                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`h-12 w-12 flex items-center justify-center border rounded-lg transition-colors ${
                                            isWishlisted 
                                            ? "border-red-200 bg-red-50 text-red-500" 
                                            : "border-gray-300 hover:border-black text-gray-700"
                                        }`}
                                    >
                                        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-100">
                                <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                                    <Truck className="w-6 h-6 text-gray-700 mb-2" />
                                    <span className="text-xs font-bold text-gray-900">Free Shipping</span>
                                    <span className="text-[10px] text-gray-500">On orders over ₹999</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                                    <RotateCcw className="w-6 h-6 text-gray-700 mb-2" />
                                    <span className="text-xs font-bold text-gray-900">Easy Returns</span>
                                    <span className="text-[10px] text-gray-500">14 Days policy</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                                    <Shield className="w-6 h-6 text-gray-700 mb-2" />
                                    <span className="text-xs font-bold text-gray-900">Secure Payment</span>
                                    <span className="text-[10px] text-gray-500">100% Protected</span>
                                </div>
                            </div>

                            {/* Technical Details */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <div className="text-gray-500">Category</div>
                                    <div className="text-gray-900 font-medium capitalize">{productData.category?.name}</div>
                                    
                                    <div className="text-gray-500">Gender</div>
                                    <div className="text-gray-900 font-medium capitalize">{productData.gender}</div>
                                    
                                    <div className="text-gray-500">Material</div>
                                    <div className="text-gray-900 font-medium">100% Cotton</div>
                                    
                                    <div className="text-gray-500">Product Code</div>
                                    <div className="text-gray-900 font-medium">{productData._id?.slice(-6).toUpperCase()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-20 border-t border-gray-100 pt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
                    <ReviewSection productId={id} />
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;