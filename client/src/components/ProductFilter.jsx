import React, { useEffect, useReducer, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaChevronDown, FaStar } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
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
    <div className="mb-8 font-outfit">
        <h3
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-4 cursor-pointer select-none flex items-center justify-between group"
            onClick={onToggle}
        >
            {title}
            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <IoIosArrowDown />
            </span>
        </h3>
        <AnimatePresence initial={false}>
            {isOpen && (
                <AnimateContent>
                    {items
                        ? items.map(item => {
                            const label = typeof item === 'object' ? item.name : item;
                            const value = typeof item === 'object' ? item._id : item;
                            return (
                                <label key={label} className="flex items-center px-4 py-2 rounded-2xl glass border-white/50 text-[10px] font-bold uppercase tracking-widest text-gray-600 cursor-pointer hover:bg-white/40 transition-all shadow-sm">
                                    <input {...register(title.toLowerCase())} type="checkbox" className="mr-3 w-3 h-3 accent-black" value={value} />
                                    {label}
                                </label>
                            );
                        })
                        : children}
                </AnimateContent>
            )}
        </AnimatePresence>
    </div>
);

const initialState = {
    toggles: {
        gender: true,
        category: true,
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

const ProductFilter = ({ sizes, categories, genders, priceStats, query, setQuery }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
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
    };

    const onSortChange = (value) => {
        dispatch({ type: 'SET_SORT', payload: value });
        const query = buildQuery(state.queryData, value);
        setQuery(query)
    };

    const resetHandler = () => {
        dispatch({ type: 'RESET' });
        setQuery('')
        reset({
            minPrice: priceStats?.minPrice || 0,
            maxPrice: priceStats?.maxPrice || 6000,
        });
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
        <div className="font-outfit pb-20">
            {/* Sort Dropdown */}
            <div className="absolute right-6 top-6 z-10">
                <div className="relative group">
                    <select
                        id="sort-select"
                        value={state.sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="glass border-white/40 text-black rounded-2xl pl-6 pr-12 py-3 shadow-glass 
                                 focus:outline-none focus:ring-0 focus:bg-white/50
                                 text-[10px] font-black uppercase tracking-widest transition-all duration-300 appearance-none cursor-pointer 
                                 hover:shadow-xl"
                    >
                        <option value="price:asc">Price: Low → High</option>
                        <option value="price:desc">Price: High → Low</option>
                        <option value="rating:asc">Rating: Low → High</option>
                        <option value="rating:desc">Rating: High → Low</option>
                    </select>

                    {/* Custom dropdown arrow */}
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                        <FaChevronDown size={14} />
                    </span>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-80 p-8 bg-white/50 backdrop-blur-sm border-r border-gray-100 min-h-screen">
                <h2 className="text-3xl font-black mb-12 text-black tracking-tighter uppercase">Filters</h2>

                <FilterSection
                    title="Gender"
                    isOpen={state.toggles.gender}
                    onToggle={() => dispatch({ type: 'TOGGLE', payload: 'gender' })}
                    register={register}
                    items={["Men", "Women"]}
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

                <div className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-6">Price Range</h3>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            {...register("minPrice")}
                            placeholder="Min"
                            className="w-full glass border-white/40 px-4 py-3 rounded-xl text-xs font-bold focus:outline-none focus:ring-0 focus:bg-white/50 transition-all"
                        />
                        <div className="w-4 h-[1px] bg-gray-200"></div>
                        <input
                            type="number"
                            {...register("maxPrice")}
                            placeholder="Max"
                            className="w-full glass border-white/40 px-4 py-3 rounded-xl text-xs font-bold focus:outline-none focus:ring-0 focus:bg-white/50 transition-all"
                        />
                    </div>
                </div>

                <FilterSection
                    title="Rating"
                    isOpen={state.toggles.rating}
                    onToggle={() => dispatch({ type: 'TOGGLE', payload: 'rating' })}
                >
                    <div className="flex flex-col gap-4">
                        {ratings.map(r => (
                            <label key={r} className="flex items-center text-gray-400 cursor-pointer hover:text-black transition-colors group">
                                <input
                                    type="radio"
                                    {...register("rating")}
                                    value={r}
                                    className="mr-3 accent-black cursor-pointer w-4 h-4"
                                />
                                <span className="flex items-center gap-1">
                                    {[...Array(r)].map((_, i) => <FaStar key={i} className="text-luxe-gold shadow-sm" size={12} />)}
                                    <span className="text-[10px] uppercase font-black tracking-widest ml-2">&amp; up</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                <div className="flex flex-col gap-3 mt-10">
                    <button type="submit" className="w-full cursor-pointer bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-all active:scale-[0.98]">
                        Apply Selection
                    </button>

                    {hasActiveFilters() && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                resetHandler();
                            }}
                            className="cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] gap-x-2 py-4 flex justify-center items-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <RiResetLeftFill size={14} /> Clear All
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductFilter;
