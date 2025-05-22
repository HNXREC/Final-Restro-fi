import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';
import useCartStore from '../store/cartStore';
import { formatPrice } from '../utils/format';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addItem, items, updateQuantity } = useCartStore();
  
  // Find the item in the cart to get its current quantity
  const cartItem = items.find((i) => i.id === item.id);
  
  // Local state for the quantity selector, defaults to 1
  const [localQuantity, setLocalQuantity] = useState(1);
  
  const handleAddToCart = () => {
    // Add the item with the current local quantity
    addItem(item, localQuantity);
    // Reset local quantity to 1 after adding to cart
    setLocalQuantity(1);
  };
  
  const handleIncrement = () => {
    // Increment local quantity, minimum 1
    setLocalQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const handleDecrement = () => {
    // Decrement local quantity, minimum 1
    setLocalQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="font-bold text-burgundy-600">{formatPrice(item.price)}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          {/* Quantity Selector - Always visible */}
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus className="h-4 w-4 text-burgundy-600" />
            </button>
            <span className="mx-3 font-medium">{localQuantity}</span> {/* Use localQuantity */}
            <button
              onClick={handleIncrement}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-4 w-4 text-burgundy-600" />
            </button>
          </div>

          {/* Add to Cart button - Always visible */}
          <button
            onClick={handleAddToCart}
            className="bg-burgundy-600 text-white font-medium py-1.5 px-4 rounded-full hover:bg-burgundy-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
