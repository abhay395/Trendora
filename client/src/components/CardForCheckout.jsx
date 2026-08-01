import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Truck } from 'lucide-react';

function CardForCheckout({ item, index, length }) {
    // Find price for the specific size selected
    const sizeData = item.productId.sizes.find((size) => size.size === item.size);
    const price = sizeData ? sizeData.price : 0;

    return (
        <div className="group">
            <div className="flex gap-4 py-4">
                {/* Image */}
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                    <LazyLoadImage 
                        src={item.productId.images[0]?.url} 
                        alt={item.productId.title} 
                        className="h-full w-full object-cover object-center" 
                        effect="blur" 
                    />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start gap-4">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                                {item.productId.title}
                            </h4>
                            <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                ₹{price.toFixed(2)}
                            </p>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-medium">Size: {item.size}</span>
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium mt-2">
                         <Truck size={12} />
                         <span>Estimated delivery by 14 July 2025</span>
                    </div>
                </div>
            </div>
            
            {/* Divider (except last item) */}
            {index < length - 1 && (
                <div className="border-b border-gray-100" />
            )}
        </div>
    );
}

export default CardForCheckout;