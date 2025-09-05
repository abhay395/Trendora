import React from 'react'
import Skeleton from 'react-loading-skeleton'
function ReviewSkeleton(idx) {
    return (
        <div
            key={idx}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* <img
                        src={`https://ui-avatars.com/api/?name=${review?.userId?.name}&background=f3f4f6&color=111827&size=128`}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                    /> */}
                    <Skeleton circle={true} height={40} width={40} />
                    <div>
                        <h3 className="font-semibold text-gray-900"><Skeleton /></h3>
                        <span className="text-sm text-gray-500"><Skeleton /></span>
                    </div>
                </div>
                {/* <div className="flex items-center gap-1">
                    {[...Array(review?.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                    ))}
                </div> */}
            </div>

            <p className="mt-3 text-gray-700 text-sm"><Skeleton height={30} /></p>

            {/* {review?.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                    {review.images.map((img, index) => (
                        <LazyLoadImage
                            key={index}
                            src={img.url}
                            alt="review"
                            className="w-32 h-32 object-cover rounded-xl border border-gray-200 hover:scale-105 transition-transform"
                            wrapperClassName="w-32 h-32"
                            effect="blur"
                        />
                    ))}
                </div>
            )} */}

            {/* <div className="mt-4 flex items-center gap-3">
                <button
                    // onClick={() => markHelpful(review._id)}
                    disabled={[...review?.helpful].includes(user?._id) || review.userId._id === user?._id}
                    className={`flex items-center gap-2 px-4 py-1 rounded-lg border text-sm transition 
                   ${[...review?.helpful].includes(user?._id) || review.userId._id === user?._id
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                >
                    <FiThumbsUp className="text-gray-600" />
                    Helpful ({review?.helpful.length})
                </button>
            </div> */}
        </div>
    )
}

export default ReviewSkeleton