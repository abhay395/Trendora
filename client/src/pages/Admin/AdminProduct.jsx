import { useNavigate } from "react-router-dom";
import { useAdminProducts, useDeleteProductPermanently, useSoftDeleteProduct } from "../../hooks/useAdmin";
import SkeletonCard from "../../componente/SkeletonCard";
import ProductCard from "./componente/productCard";
import { AnimatePresence, motion } from "framer-motion";

function AdminProduct() {
  const navigate = useNavigate();
  const { data: productData, isLoading } = useAdminProducts()
  const { mutate: softDeleteProduct } = useSoftDeleteProduct()
  const { mutate: deleteProductPermanently } = useDeleteProductPermanently()

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-black hover:bg-gray-800 text-white cursor-pointer px-5 py-2 rounded-lg text-base font-medium shadow-sm transition"
        >
          + Add Product
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {!isLoading ? (
          <AnimatePresence mode='sync'>
            {
              productData?.results?.map((product) => (
                <motion.div
                  initial={{ opacity: 0, }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  key={product._id}
                >
                  <ProductCard product={product} softDeleteProduct={softDeleteProduct} deleteProductPermanently={deleteProductPermanently} navigate={navigate} />
                </motion.div>
              ))
            }
          </AnimatePresence>
        ) : [...new Array(8)].map((_, idx) => <SkeletonCard key={idx} />)}
      </div>

      {/* No products case */}
      {productData?.results?.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No products found.
        </div>
      )}
    </div>
  );
}

export default AdminProduct;
