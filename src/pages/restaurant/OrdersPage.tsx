import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import useOrderStore from '../../store/orderStore';
import OrderCard from '../../components/OrderCard';
import { OrderStatus } from '../../types';

const OrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useOrderStore();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  
  // Filter and sort orders by creation date (newest first)
  const filteredOrders = orders
    .filter((order) => statusFilter === 'All' || order.status === statusFilter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const handleStatusChange = (id: string, status: OrderStatus) => {
    updateOrderStatus(id, status);
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        
        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center text-sm text-gray-700 mr-2">
            <Filter className="h-4 w-4 mr-1" />
            Filter:
          </div>
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1 text-sm rounded-full ${
              statusFilter === 'All'
                ? 'bg-burgundy-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('Pending')}
            className={`px-3 py-1 text-sm rounded-full ${
              statusFilter === 'Pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('Preparing')}
            className={`px-3 py-1 text-sm rounded-full ${
              statusFilter === 'Preparing'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Preparing
          </button>
          <button
            onClick={() => setStatusFilter('Served')}
            className={`px-3 py-1 text-sm rounded-full ${
              statusFilter === 'Served'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Served
          </button>
          <button
            onClick={() => setStatusFilter('Cancelled')}
            className={`px-3 py-1 text-sm rounded-full ${
              statusFilter === 'Cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Cancelled
          </button>
        </div>
        
        {/* Orders List */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">
              No orders found with the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;