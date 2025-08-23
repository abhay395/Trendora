import React, { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiUploadCloud, FiThumbsUp } from "react-icons/fi";
import useUserStore from "../store/userStore";
import { RxCross2 } from "react-icons/rx";
import useProductStore from "../store/productStore";


function ReviewSection({ productId, productTitle, reviews: initialReviews }) {
  const formatDate = (date) => date.toISOString().split("T")[0];
  const addProductReview = useProductStore(s => s.addProductReview)
  const { user } = useUserStore() || null
  // const userId = useUserStore((state) => { state?.user?.userId }) || null
  // const [user, setUser] = useState()
  const [sortBy, setSortBy] = useState("recent");
  const [prview, setPreview] = useState([]);
  const [disabled, setDisabled] = useState(false)
  const [localReviews, setLocalReviews] = useState(initialReviews || [])
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    images: [],
  });

  useEffect(() => {
    setLocalReviews(initialReviews || []);
  }, [initialReviews]);
  const averageRating = useMemo(() => {
    if (!localReviews?.length) return 0;
    const total = localReviews?.reduce((sum, r) => sum + r.rating, 0);
    return Math.round((total / localReviews?.length) * 10) / 10;
  }, [localReviews]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setPreview([...prview, URL.createObjectURL(file)])
      setNewReview({ ...newReview, images: [...newReview.images, file] });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment.trim()) return;

    const tempreview = {
      _id: Date.now().toLocaleString(),
      userId: {
        name: user?.name,
        _id: user?._id
      },
      productId: productId,
      rating: newReview.rating,
      helpful: [],
      comment: newReview.comment.trim(),
      images: prview.map((img) => ({ url: img })),
      // images: [],
      createdAt: new Date().toUTCString()
    };
    const dem = {
      _id: "68a9af9a775fe943ffd4c845",
      productId: "68a8217f016ea46e0c412ffd",
      userId: {
        _id: "688f37c1bcf1c89054e2ccdc",
        name: "Abhay Prajapati"
      },
      comment: "akaka",
      helpful: [],
      images: [],
      rating: 4,
      createdAt: "2025-08-23T12:10:02.427Z",
      updatedAt: "2025-08-23T12:10:02.427Z",
      "__v": 0
    }
    setNewReview({ rating: 0, comment: "", images: [] });
    setLocalReviews([tempreview, ...localReviews])
    console.log(localReviews)
    const form = new FormData();
    for (let [key, value] of Object.entries({
      productId: productId,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      images: newReview.images,
    })) {
      if (key == 'images') {
        value.map((file) => {
          form.append('images', file)
        })
      } else {
        form.append(key, value)
      }
    }
    setDisabled(true)
    await addProductReview(form)
    setDisabled(false)
    setPreview([])
    // console.log(review)
    // setReviews([review, ...reviews]);
  };

  const markHelpful = (id) => {
    // if (helpfulMarkedIds.has(id)) return;
    // setReviews((prev) =>
    //   prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    // );
    // setHelpfulMarkedIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-10 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h2 className="text-xl font-bold">
          Reviews {productTitle ? `for ${productTitle}` : ""}
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            {[...Array(Math.floor(averageRating))].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="font-semibold text-gray-800">
              {averageRating}
            </span>
            <span className="text-gray-500">
              ({localReviews.length} {localReviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-2 py-1 text-gray-700 focus:ring-2 focus:ring-black/40 outline-none"
          >
            <option value="recent">Most recent</option>
            <option value="rating_desc">Highest rated</option>
            <option value="rating_asc">Lowest rated</option>
          </select>
        </div>
      </div>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border border-gray-100 bg-gray-50 rounded-xl p-4 mb-8"
      >
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl transition ${newReview.rating >= star
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-300"
                }`}
              onClick={() => setNewReview({ ...newReview, rating: star })}
            />
          ))}
          <span className="text-sm text-gray-500">Tap to rate</span>
        </div>

        <textarea
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          disabled={disabled}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/40 outline-none"
        ></textarea>

        <label className="flex items-center gap-2 cursor-pointer text-gray-600 w-fit">
          <FiUploadCloud className="text-xl" />
          <span className="text-sm">Upload Image (optional)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={disabled}
          />
        </label>

        <div className="flex flex-row gap-x-4">
          {prview && prview.map((img, index) => (
            <div className="mt-2 relative" key={index}>
              <RxCross2
                className="absolute top-2 left-2 bg-black text-xl text-white rounded-full p-1 cursor-pointer"
                onClick={() =>
                  setPreview((prev) => prev.filter((_, idx) => idx != index))
                  // console.log(index)
                }
              />
              <img
                src={img}
                alt={`preview-${index}`}
                className="w-28 h-28 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {localReviews.length === 0 && (
          <p className="text-gray-600">No reviews yet. Be the first to review.</p>
        )}
        {localReviews?.map((review) => (
          <div
            key={review?._id}
            className="bg-gray-50 rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{review?.userId.name}</h3>
              <span className="text-sm text-gray-500">{formatDate(new Date(review?.createdAt))}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(review?.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700">{review?.comment}</p>
            <div className="flex flex-wrap gap-x-4">
              {review?.images.length > 0 && (
                review?.images.map((img) => <img
                  src={img.url}
                  alt="review"
                  className="mt-3 w-32 h-32 object-cover rounded-lg"
                />)
              )}</div>
            <div className="mt-3 flex items-center gap-2">
              <button
                // onClick={() => markHelpful(review?._id)}
                className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md border transition 
                  ${[...review?.helpful].includes(user?._id)
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-gray-100"
                  }`}

              // disabled={helpful.has(review?._id)}
              >
                <FiThumbsUp />
                Helpful ({review?.helpful.length})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
