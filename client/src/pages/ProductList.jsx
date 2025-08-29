import React, { useEffect, useState } from 'react'
import ProductFilter from '../componente/ProductFilter'
import Card from '../componente/Card'
import SkeletonCard from '../componente/SkeletonCard'
import { AnimatePresence, motion } from 'framer-motion'
import ProductNotFoundForFilter from '../componente/ProductNotFoundForFilter'
import { useLocation } from 'react-router-dom'
import { useFetchProductFilters, useProductsFilterd } from '../hooks/useProducts'

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const { } = useProductsFilterd()
  const { data: filters } = useFetchProductFilters()
  const [query, setQuery] = useState('')
  const { data: filterdProduct, isLoading } = useProductsFilterd(query)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    let searchTerm = searchParams.get('search')
    if (searchTerm) {
      setSearchTerm(searchTerm)
      let query = `search=${searchTerm}`
      setQuery(query)
    }
  }, [location.search])

  return (
    <div className='min-h-screen text-black w-full flex mt-16 relative'>
      <ProductFilter {...filters} query={query} setQuery={setQuery} />
      {filterdProduct?.length == 0 && !isLoading ?
        <ProductNotFoundForFilter /> : <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-18 gap-x-6 gap-y-6 px-4 w-full'>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : (
              <AnimatePresence mode='sync'>
                {filterdProduct?.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card product={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
        </section>
      }
    </div>
  )
}

export default ProductList
