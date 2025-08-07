import React from 'react';
import ProductNotFound from './ProductNotFound';
import { FaReceipt } from 'react-icons/fa';

const OrderHistorySection = ({ orders = [] }) => {
  return (
    <section className="mb-8 bg-white rounded-xl shadow border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-black mb-5 flex items-center gap-2">
        <FaReceipt className="text-black" />
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <ProductNotFound message={"You have't order yet"} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-black border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3 text-left border-b">Order ID</th>
                <th className="p-3 text-left border-b">Status</th>
                <th className="p-3 text-left border-b">Total</th>
                <th className="p-3 text-left border-b">Date</th>
                <th className="p-3 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id || order.id} className="hover:bg-gray-50 transition-all">
                  <td className="p-3 border-b">{order._id || order.id}</td>
                  <td className="p-3 border-b capitalize">{order.status}</td>
                  <td className="p-3 border-b font-semibold text-black">₹{order.totalPrice}</td>
                  <td className="p-3 border-b">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    <button className="px-3 py-1 rounded bg-black text-white text-xs hover:bg-gray-900 transition">
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
