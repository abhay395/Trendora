import React from 'react';
import ProductNotFound from './ProductNotFound';
import { FaReceipt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SkeletonRow = () => (
  <tr>
    <td className="p-3"><Skeleton className="h-4 w-20" /></td>
    <td className="p-3"><Skeleton className="h-4 w-16" /></td>
    <td className="p-3"><Skeleton className="h-4 w-14" /></td>
    <td className="p-3"><Skeleton className="h-4 w-20" /></td>
    <td className="p-3"><Skeleton className="h-8 w-16" /></td>
  </tr>
);

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 rounded-md ${className}`} />
);

const OrderHistorySection = ({ orders = [], isLoading = false }) => {
  let navigate = useNavigate();
  return (
    <section className="mb-8 bg-white rounded-2xl shadow border border-gray-100 p-6  transition-shadow duration-300">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FaReceipt className="text-gray-700" />
        Your Orders
      </h2>

      {/* No Orders */}
      {isLoading ? (
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">order Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, idx) => (
                <SkeletonRow key={idx} />
              ))}
            </tbody>
          </table>
        </div>
      ) : orders.length === 0 ? (
        <ProductNotFound message={"You haven't ordered yet"} />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">order Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={order._id || order.id}
                  className={`transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100`}
                >
                  <td className="p-3 font-medium text-gray-900">{order?._id.slice(-8)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'confirmed'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-gray-900">₹{order.totalPrice}</td>
                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button onClick={() => navigate(`/order/${order._id}`)} className="px-3 cursor-pointer py-1.5 rounded-lg bg-gray-800 text-white text-xs font-medium hover:bg-gray-900 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default OrderHistorySection;
