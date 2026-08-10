import React from 'react'

const SkeletonCard = () => {
    return (
        <div className="w-full h-full bg-white border border-gray-200 overflow-hidden animate-pulse">
            <div className="aspect-[4/5] bg-gray-200 w-full" />
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div className="h-4 bg-gray-200 w-2/3" />
                    <div className="h-4 bg-gray-200 w-1/5" />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="h-3 bg-gray-200 w-1/3" />
                    <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 ring-2 ring-white" />
                        <div className="w-6 h-6 rounded-full bg-gray-200 ring-2 ring-white" />
                        <div className="w-6 h-6 rounded-full bg-gray-200 ring-2 ring-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard
