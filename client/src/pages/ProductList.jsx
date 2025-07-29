import React from 'react'
import ProductFilter from '../componente/ProductFilter'
import useProductStore from '../store/productStore'
import { useEffect } from 'react'

function ProductList() {
  const { fetchProductFilters, filters, isLoading } = useProductStore()
  useEffect(() => {
    fetchProductFilters()
  }, [])
  if (isLoading) return (<div className='flex h-screen items-center justify-center'>....Loading</div>)
  if (filters != null) return (
    <div className='min-h-screen text-black w-full flex mt-20 '>
      <ProductFilter {...filters} />
      <h1 className='mt-7 text-5xl font-bold text-center w-full pt-20'>Product List </h1>
    </div>
  )
}

export default ProductList