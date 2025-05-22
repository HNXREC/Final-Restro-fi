import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import useCartStore from '../store/cartStore';
import { formatPrice } from '../utils/format';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <div className="flex py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
        
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 hover:bg-gray-100"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 hover:bg-gray-100"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          <button
            onClick={handleRemove}
            className="text-burgundy-600 hover:text-burgundy-800"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;