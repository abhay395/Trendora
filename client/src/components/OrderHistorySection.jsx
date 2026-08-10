
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, PackageOpen } from 'lucide-react';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-100 ${className}`} />
);

const OrderHistorySection = ({ orders = [], isLoading = false }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':  return 'bg-white border border-green-300 text-green-700';
      case 'confirmed':  return 'bg-white border border-blue-200 text-blue-700';
      case 'shipped':    return 'bg-white border border-purple-200 text-purple-700';
      case 'cancelled':  return 'bg-white border border-red-200 text-red-600';
      default:           return 'bg-white border border-gray-200 text-gray-500';
    }
  };

  if (!isLoading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-gray-200">
        <PackageOpen size={28} className="text-gray-300 mb-3" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">No orders yet</p>
        <p className="text-xs text-gray-400 mb-4">Looks like you haven't placed any orders.</p>
        <button
          onClick={() => navigate('/products')}
          className="text-[9px] font-black uppercase tracking-widest text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
            <th className="py-3 px-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</th>
            <th className="py-3 px-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
            <th className="py-3 px-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Total</th>
            <th className="py-3 px-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <tr key={i}>
                <td className="p-3"><Skeleton className="h-4 w-20" /></td>
                <td className="p-3"><Skeleton className="h-4 w-24" /></td>
                <td className="p-3"><Skeleton className="h-5 w-20" /></td>
                <td className="p-3"><Skeleton className="h-4 w-16" /></td>
                <td className="p-3"><Skeleton className="h-7 w-14 ml-auto" /></td>
              </tr>
            ))
          ) : (
            orders.map((order) => (
              <tr key={order._id} className="group hover:bg-gray-50 transition-colors">
                <td className="p-3 text-xs font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</td>
                <td className="p-3 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-xs font-bold text-gray-900">₹{order.totalPrice?.toFixed(2)}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-[9px] font-black uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors"
                  >
                    <Eye size={12} />
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistorySection;