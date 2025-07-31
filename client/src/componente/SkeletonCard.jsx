import React from 'react'

const SkeletonCard = () => {
    return (
        <div className="w-full max-w-lg min-w-xs h-[400px] sm:max-w-sm md:max-w-md bg-white shadow animate-pulse">
            <div className="h-[350px]  bg-gray-200 w-full rounded-t-md" />
            <div className="p-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    )
}

export default SkeletonCard
