import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, PackageOpen } from 'lucide-react';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

const OrderHistorySection = ({ orders = [], isLoading = false }) => {
  const navigate = useNavigate();

  // Helper for Status Styles
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  if (!isLoading && orders.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <PackageOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-semibold">No orders yet</h3>
            <p className="text-gray-500 text-sm mt-1">Looks like you haven't placed any orders.</p>
            <button onClick={() => navigate('/products')} className="mt-4 text-sm font-medium text-black underline underline-offset-4">Start Shopping</button>
        </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
              <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
                [...Array(3)].map((_, i) => (
                    <tr key={i}>
                        <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                        <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                        <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                        <td className="p-4"><Skeleton className="h-8 w-16 ml-auto" /></td>
                    </tr>
                ))
            ) : (
                orders.map((order) => (
                    <tr key={order._id} className="group hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm font-medium text-gray-900">
                            #{order._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="p-4 text-sm font-bold text-gray-900">
                            ₹{order.totalPrice?.toFixed(2)}
                        </td>
                        <td className="p-4 text-right">
                            <button 
                                onClick={() => navigate(`/order/${order._id}`)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-black hover:text-black transition-colors shadow-sm"
                            >
                                <Eye size={14} />
                                View
                            </button>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistorySection;