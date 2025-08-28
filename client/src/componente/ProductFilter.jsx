import React, { useEffect, useReducer, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaChevronDown, FaStar } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useProductStore from '../store/productStore';
import { RiResetLeftFill } from "react-icons/ri";

const AnimateContent = ({ children }) => (
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
);

const FilterSection = ({ title, isOpen, onToggle, items, children, register }) => (
    (title != 'Category') ? (<div className="mb-6">
        <h3
            className="font-semibold text-gray-800 mb-2 cursor-pointer select-none flex items-center justify-between"
            onClick={onToggle}
        >
            {title}
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h3>
        <AnimatePresence initial={false}>
            {isOpen && (
                <AnimateContent>
                    {items
                        ? items.map(item => (
                            <label key={item} className="flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-800 cursor-pointer hover:bg-gray-200 transition">
                                <input {...register(title.toLowerCase())} type="checkbox" className="mr-2 accent-black" value={item} />
                                {item}
                            </label>
                        ))
                        : children}
                </AnimateContent>
            )}
        </AnimatePresence>
    </div>) : (<div className="mb-6">
        <h3
            className="font-semibold text-gray-800 mb-2 cursor-pointer select-none flex items-center justify-between"
            onClick={onToggle}
        >
            {title}
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h3>
        <AnimatePresence initial={false}>
            {isOpen && (
                <AnimateContent>
                    {items
                        ? items.map(item => (
                            <label key={item.name} className="flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-800 cursor-pointer hover:bg-gray-200 transition">
                                <input {...register(title.toLowerCase())} type="checkbox" className="mr-2 accent-black" value={item._id} />
                                {item.name}
                            </label>
                        ))
                        : children}
                </AnimateContent>
            )}
        </AnimatePresence>
    </div>)
);

const initialState = {
    toggles: {
        gender: false,
        category: false,
        size: false,
        rating: false,
    },
    sortBy: 'ratingDesc',
    queryData: {},
};

function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE':
            return {
                ...state,
                toggles: { ...state.toggles, [action.payload]: !state.toggles[action.payload] },
            };
        case 'SET_SORT':
            return { ...state, sortBy: action.payload };
        case 'SET_QUERY':
            return { ...state, queryData: action.payload };
        case 'RESET':
            return { ...initialState };
        default:
            return state;
    }
}

const ProductFilter = ({ sizes, categories, genders, priceStats }) => {
    const { fetchFilterdProduct } = useProductStore();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [query, setQuery] = useState('')
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            minPrice: priceStats?.minPrice || 0,
            maxPrice: priceStats?.maxPrice || 6000,
        }
    });

    const buildQuery = (data, sort) => {
        let query = '';
        if (data?.gender?.length > 0) query += `gender=${data.gender.join(",")}&`;
        if (data?.category?.length > 0) query += `category=${data.category.join(",")}&`;
        if (data?.size?.length > 0) query += `size=${data.size.join(",")}&`;
        if (data?.minPrice && data.minPrice !== priceStats.minPrice) query += `minPrice=${data.minPrice}&`;
        if (data?.maxPrice && data.maxPrice !== priceStats.maxPrice) query += `maxPrice=${data.maxPrice}&`;
        if (data?.rating) query += `rating=${data.rating}&`;
        if (sort) query += `sortBy=${sort}`;
        return query;
    };

    const onSubmit = (data) => {
        dispatch({ type: 'SET_QUERY', payload: data });
        const newQuery = buildQuery(data, state.sortBy);
        if (newQuery == query || newQuery.split('=').length <= 2) return
        setQuery(newQuery)
        fetchFilterdProduct(newQuery);
    };

    const onSortChange = (value) => {
        dispatch({ type: 'SET_SORT', payload: value });
        const query = buildQuery(state.queryData, value);
        fetchFilterdProduct(query);
    };

    const resetHandler = () => {
        dispatch({ type: 'RESET' });
        reset({
            minPrice: priceStats?.minPrice || 0,
            maxPrice: priceStats?.maxPrice || 6000,
        });
        fetchFilterdProduct('');
    };

    // Update price range when priceStats change
    useEffect(() => {
        setValue('minPrice', priceStats?.minPrice || 0);
        setValue('maxPrice', priceStats?.maxPrice || 6000);
    }, [priceStats]);
    const ratings = [4, 3, 2, 1];
    const watchedFields = watch();
    const hasActiveFilters = () => {
        return (
            (watchedFields.gender && watchedFields.gender.length > 0) ||
            (watchedFields.category && watchedFields.category.length > 0) ||
            (watchedFields.size && watchedFields.size.length > 0) ||
            watchedFields.rating ||
            (watchedFields.minPrice && watchedFields.minPrice !== priceStats?.minPrice) ||
            (watchedFields.maxPrice && watchedFields.maxPrice !== priceStats?.maxPrice)
        );
    };
    return (
        <div>
            {/* Sort Dropdown */}
            <div className="absolute right-4 top-4">
                <label
                    htmlFor="sort-select"
                    className="sr-only"
                >
                    Sort products
                </label>
                <div className="relative">
                    <select
                        id="sort-select"
                        value={state.sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="bg-white text-gray-800 border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 shadow-md 
                 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 
                 text-sm font-medium transition-all duration-200 appearance-none cursor-pointer 
                 hover:border-gray-400 hover:shadow-lg"
                    >
                        <option value="price:asc">Price: Low → High</option>
                        <option value="price:desc">Price: High → Low</option>
                        <option value="rating:asc">Rating: Low → High</option>
                        <option value="rating:desc">Rating: High → Low</option>
                    </select>

                    {/* Custom dropdown arrow */}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <FaChevronDown />
                    </span>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-72 p-6 pt-3 bg-white border h-full border-gray-200">
                <h2 className="text-2xl font-bold mb-10 text-gray-900 tracking-tight">Filters</h2>

                <FilterSection
                    title="Gender"
                    isOpen={state.toggles.gender}
                    onToggle={() => dispatch({ type: 'TOGGLE', payload: 'gender' })}
                    register={register}
                    // items={genders}
                    items={["Men", "Women"]} //? Change later
                />

                <FilterSection
                    title="Category"
                    isOpen={state.toggles.category}
                    onToggle={() => dispatch({ type: 'TOGGLE', payload: 'category' })}
                    register={register}
                    items={categories}
                />

                <FilterSection
                    title="Size"
                    isOpen={state.toggles.size}
                    onToggle={() => dispatch({ type: 'TOGGLE', payload: 'size' })}
                    register={register}
                    items={sizes}
                />

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            {...register("minPrice")}
                            className="w-20 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            {...register("maxPrice")}
                            className="w-20 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>

                <FilterSection
                    title="Rating"
                    isOpen={state.toggles.rating}
                    onToggle={() => dispatch({ type: 'TOGGLE', payload: 'rating' })}
                >
                    <div className="flex flex-col gap-3">
                        {ratings.map(r => (
                            <label key={r} className="flex items-center text-gray-800 cursor-pointer hover:text-black">
                                <input
                                    type="radio"
                                    {...register("rating")}
                                    value={r}
                                    className="mr-2 accent-black cursor-pointer w-4 h-4"
                                />
                                <span className="flex items-center">
                                    {[...Array(r)].map((_, i) => <FaStar key={i} />)}
                                    <span className="text-gray-500 font-semibold ml-1 text-xs">&amp; up</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                <button type="submit" className="w-full mt-2 cursor-pointer bg-black hover:bg-gray-900 text-white py-2 rounded-xl text-base font-semibold shadow-md transition">
                    Apply Filters
                </button>

                {hasActiveFilters() && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            resetHandler();
                        }}
                        className="bg-white cursor-pointer text-lg gap-x-1 mt-4 flex justify-center items-center text-black py-2 w-full rounded-xl font-semibold border-gray-700 border"
                    >
                        <RiResetLeftFill /> Reset
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProductFilter;
