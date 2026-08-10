import React, { useEffect, useReducer } from 'react';
import { IoIosArrowDown } from "react-icons/io";
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
    >
        <div className='flex flex-wrap gap-2 pt-1'>{children}</div>
    </motion.div>
);

const FilterSection = ({ title, isOpen, onToggle, items, children, register }) => (
    <div className="mb-6 font-outfit border-b border-gray-100 pb-6">
        <h3
            className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-4 cursor-pointer select-none flex items-center justify-between"
            onClick={onToggle}
        >
            {title}
            <span className={`transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>
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
                                <label
                                    key={label}
                                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-[9px] font-black uppercase tracking-widest text-gray-500 cursor-pointer hover:border-black hover:text-black transition-all duration-200"
                                >
                                    <input
                                        {...register(title.toLowerCase())}
                                        type="checkbox"
                                        className="w-3 h-3 accent-black"
                                        value={value}
                                    />
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
        if (newQuery == query || newQuery.split('=').length <= 2) return;
        setQuery(newQuery);
    };

    const onSortChange = (value) => {
        dispatch({ type: 'SET_SORT', payload: value });
        const query = buildQuery(state.queryData, value);
        setQuery(query);
    };

    const resetHandler = () => {
        dispatch({ type: 'RESET' });
        setQuery('');
        reset({
            minPrice: priceStats?.minPrice || 0,
            maxPrice: priceStats?.maxPrice || 6000,
        });
    };

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
                <div className="relative">
                    <select
                        id="sort-select"
                        value={state.sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="bg-white border border-gray-300 text-black rounded-none pl-4 pr-10 py-3
                                 focus:outline-none focus:border-black
                                 text-[9px] font-black uppercase tracking-widest transition-all duration-200 appearance-none cursor-pointer
                                 hover:border-black"
                    >
                        <option value="price:asc">Price: Low → High</option>
                        <option value="price:desc">Price: High → Low</option>
                        <option value="rating:asc">Rating: Low → High</option>
                        <option value="rating:desc">Rating: High → Low</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <FaChevronDown size={10} />
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-72 p-8 bg-white border-r border-gray-200 min-h-screen">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-black text-black tracking-tighter uppercase">Filters</h2>

                    {/* Always-visible Reset Button */}
                    <button
                        type="button"
                        onClick={resetHandler}
                        className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer
                            ${hasActiveFilters()
                                ? 'text-black border border-black px-3 py-1.5 hover:bg-black hover:text-white'
                                : 'text-gray-300 border border-gray-200 px-3 py-1.5 cursor-not-allowed'
                            }`}
                        disabled={!hasActiveFilters()}
                    >
                        <RiResetLeftFill size={11} />
                        Reset
                    </button>
                </div>

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

                {/* Price Range */}
                <div className="mb-6 border-b border-gray-100 pb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-4">Price Range</h3>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            {...register("minPrice")}
                            placeholder="Min"
                            className="w-full bg-white border border-gray-200 px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-black transition-colors"
                        />
                        <div className="w-4 h-[1px] bg-gray-300 shrink-0"></div>
                        <input
                            type="number"
                            {...register("maxPrice")}
                            placeholder="Max"
                            className="w-full bg-white border border-gray-200 px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-black transition-colors"
                        />
                    </div>
                </div>

                {/* Rating */}
                <FilterSection
                    title="Rating"
                    isOpen={state.toggles.rating}
                    onToggle={() => dispatch({ type: 'TOGGLE', payload: 'rating' })}
                >
                    <div className="flex flex-col gap-3 pt-1">
                        {ratings.map(r => (
                            <label key={r} className="flex items-center text-gray-400 cursor-pointer hover:text-black transition-colors group">
                                <input
                                    type="radio"
                                    {...register("rating")}
                                    value={r}
                                    className="mr-3 accent-black cursor-pointer w-3.5 h-3.5"
                                />
                                <span className="flex items-center gap-1">
                                    {[...Array(r)].map((_, i) => <FaStar key={i} className="text-luxe-gold" size={11} />)}
                                    <span className="text-[9px] uppercase font-black tracking-widest ml-1.5 group-hover:text-black transition-colors">& up</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Apply Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-black text-white py-3.5 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors active:scale-[0.98] border border-black"
                    >
                        Apply Filters
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFilter;
