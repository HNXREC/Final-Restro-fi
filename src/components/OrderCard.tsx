import React from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { formatPrice } from '../utils/format';

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  const statusIcons = {
    Pending: <Clock className="h-5 w-5 text-yellow-500" />,
    Preparing: <AlertTriangle className="h-5 w-5 text-blue-500" />,
    Served: <CheckCircle className="h-5 w-5 text-green-500" />,
    Cancelled: <XCircle className="h-5 w-5 text-red-500" />,
  };
  
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Preparing: 'bg-blue-100 text-blue-800',
    Served: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-burgundy-600">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-2">
            <span className="font-bold text-gray-800">Table #{order.tableNumber}</span>
            <span className={`ml-3 px-2 py-1 text-xs rounded-full flex items-center ${statusColors[order.status]}`}>
              {statusIcons[order.status]}
              <span className="ml-1">{order.status}</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-burgundy-700">{formatPrice(order.totalAmount)}</p>
          <p className="text-sm text-gray-500">{order.items.reduce((acc, item) => acc + item.quantity, 0)} items</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium text-gray-700 mb-2">Order Items:</h4>
        <ul className="text-sm text-gray-600">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-1">
              <span>{item.quantity}x {item.name}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 flex space-x-2">
        {order.status !== 'Served' && order.status !== 'Cancelled' && (
          <>
            {order.status === 'Pending' && (
              <button 
                onClick={() => onStatusChange(order.id, 'Preparing')}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Start Preparing
              </button>
            )}
            {order.status === 'Preparing' && (
              <button 
                onClick={() => onStatusChange(order.id, 'Served')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Mark as Served
              </button>
            )}
            <button 
              onClick={() => onStatusChange(order.id, 'Cancelled')}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Cancel Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;