import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import useProductStore from '../store/productStore';

const AnimateContent = ({ children }) => {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className='overflow-hidden'
        >
            <div className='flex flex-wrap gap-2'>{children}</div>
        </motion.div>
    )
}

const FilterSection = ({ title, isOpen, onToggle, items, children, register }) => (
    <div className="mb-6">
        <h3
            className="font-semibold text-gray-800 mb-2 cursor-pointer select-none flex items-center justify-between"
            onClick={() => onToggle(!isOpen)}
        >
            {title}
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h3>
        <AnimatePresence initial={false}>
            {isOpen && (
                <AnimateContent
                >
                    {items ? (items.map(item => (
                        <label key={item} className="flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-800 cursor-pointer hover:bg-gray-200 transition">
                            <input {...register(title.toLowerCase())} type="checkbox" className="mr-2 accent-black" name={title.toLowerCase()} value={item} />
                            {item}
                        </label>
                    ))) : (children)}
                </AnimateContent>
            )}
        </AnimatePresence>
    </div>
);
const ProductFilter = ({ sizes, categories, genders, priceStats }) => {
    const { fetchFilterdProduct } = useProductStore()

    // console.log(priceStats)
    const [priceRange, setPriceRange] = useState(
        [
            priceStats?.minPrice || 0,
            priceStats?.maxPrice || 5000
        ]
    );
    let [sortBy, setSortBy] = useState('rating')
    const ratings = [4, 3, 2, 1];
    const [queryData, setQueryData] = useState({})
    const [genderOpen, setGenderOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false)
    const [ratingOpen, setRatingOpen] = useState(false)
    const { register
        , handleSubmit,
        formState: { errors }
    } = useForm()
    const submit = (data) => {
        setQueryData(data)
        let query = ''
        if (data?.gender) {
            query += `gender=${data.gender.join(",")}&`
        }
        if (data?.category) {
            query += `category=${data.category.join(",")}&`
        }
        if (data?.minPrice) {
            query += `minPrice=${data.minPrice}&`
        }
        if (data?.maxPrice) {
            query += `maxPrice=${data.maxPrice}&`
        }
        if (data?.rating) {
            query += `rating=${data.rating}&`
        }
        // console.log(query)
        fetchFilterdProduct(query);
    }
    const handleSort = (value) => {
        setSortBy(value)
        let query = ''
        if (queryData?.gender) {
            query += `gender=${queryData.gender.join(",")}&`
        }
        if (queryData?.category) {
            query += `category=${queryData.category.join(",")}&`
        }
        if (queryData?.minPrice) {
            query += `minPrice=${queryData.minPrice}&`
        }
        if (queryData?.maxPrice) {
            query += `maxPrice=${queryData.maxPrice}&`
        }
        if (queryData?.rating) {
            query += `rating=${queryData.rating}&`
        }
        if (value) {
            query += `sortBy=${value}`
        }
        fetchFilterdProduct(query)
    }
    useEffect(() => {
        if (priceStats?.minPrice !== undefined && priceStats?.maxPrice !== undefined) {
            setPriceRange([priceStats.minPrice, priceStats.maxPrice]);
        }
    }, [priceStats]);
    return (
        <div>
            <div className="absolute right-4 top-4">
                <label htmlFor="sort" className="sr-only">Sort By</label>
                <div className="relative">
                    <select
                        name="sort"
                        id="sort"
                        className="bg-white text-gray-800 border-2 border-gray-200 rounded-2xl px-6 py-3 pr-12 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-sm font-medium transition-all duration-300 ease-in-out appearance-none relative cursor-pointer hover:border-gray-300 hover:shadow-xl transform hover:scale-105"
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                    >
                        {/* <option value="rating" className="py-2">Rating</option> */}
                        <option value="priceAsc" className="py-2">Price - Asc</option>
                        <option value="priceDesc" className="py-2">Price - Desc</option>
                        <option value="ratingAsc" className="py-2">Rating - Asc</option>
                        <option value="ratingDesc" className="py-2">Rating - Desc</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(submit)} className="w-full md:w-72 p-6 pt-3 bg-white border border-gray-200">
                <h2 className="text-2xl font-bold mb-10 text-gray-900 tracking-tight">Filters</h2>

                {/* Gender Filter */}
                <FilterSection title="Gender" isOpen={genderOpen} onToggle={setGenderOpen} register={register} items={genders}>
                </FilterSection>

                {/* Category Filter */}
                <FilterSection title="Category" isOpen={categoryOpen} onToggle={setCategoryOpen} register={register} items={categories}>
                </FilterSection>

                {/* Size Filter */}
                <FilterSection title="Size" isOpen={sizeOpen} onToggle={setSizeOpen} register={register} items={sizes}>
                </FilterSection>

                {/* Price Filter */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
                    <div className="flex items-center gap-2">
                        <input
                            {...register("minPrice")}
                            type="number"
                            value={priceRange[0]}
                            max={priceStats?.maxPrice}
                            min={priceStats?.minPrice}
                            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                            className="w-20 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Min"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            {...register("maxPrice")}
                            type="number"
                            value={priceRange[1]}
                            max={priceStats?.maxPrice}
                            min={priceStats?.minPrice}
                            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                            className="w-20 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Max"
                        />
                    </div>
                </div>
                {/* Rating Filter */}
                <FilterSection title="Rating" isOpen={ratingOpen} onToggle={setRatingOpen}>
                    <div className="flex flex-col gap-3">
                        {ratings.map(r => (
                            <label key={r} className="flex items-center text-gray-800 cursor-pointer hover:text-black">
                                <input type="radio"  {...register("rating")} name="rating" value={r} className="mr-2 accent-black cursor-pointer w-4 h-4" />
                                <span className="flex items-center">
                                    <span className="mr-1 flex ">{[...new Array(r)].map((_, i) => <FaStar key={i} />)}</span>
                                    <span className="text-gray-500 font-semibold ml-1 text-xs">&amp; up</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
                <button type='submit' className="w-full mt-2 bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-base font-semibold shadow-md transition">
                    Apply Filters
                </button>
            </form>
        </div>
    );
};

export default ProductFilter;
