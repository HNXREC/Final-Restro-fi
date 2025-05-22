import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, AlertCircle, Loader2 } from 'lucide-react'; // Import Loader2
import useCartStore from '../../store/cartStore';
import useOrderStore from '../../store/orderStore';
import CartItem from '../../components/CartItem';
import { formatPrice } from '../../utils/format';
import toast from 'react-hot-toast'; // Import toast

const CartPage: React.FC = () => {
  const { items, tableNumber, clearCart, total } = useCartStore();
  const { addOrder, isLoading: isPlacingOrder, error: orderError } = useOrderStore(); // Get addOrder, isLoading, error from orderStore
  
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const totalAmount = total();
  const isEmpty = items.length === 0;
  
  const handlePlaceOrder = async () => { // Make async
    if (tableNumber === 0) {
      toast.error('Unable to place order. Table number is not set.');
      return;
    }
    
    if (isEmpty) {
      toast.error('Your cart is empty. Add some items to place an order.');
      return;
    }
    
    // isLoading and error are now managed by the orderStore
    
    const orderId = await addOrder(tableNumber, items, totalAmount); // Await the async function
    
    if (orderId) {
      // Clear the cart only on successful order placement
      clearCart();
      
      // Show success message
      setSuccess(true);
      
      // In a real app, we might redirect to an order confirmation page
      setTimeout(() => {
        navigate(`/menu/${tableNumber}`);
      }, 3000);
    }
    // Error message is displayed via the orderStore's error state and toast
  };
  
  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Link
            to={tableNumber ? `/menu/${tableNumber}` : '/menu'}
            className="text-burgundy-600 hover:text-burgundy-700 flex items-center"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Menu
          </Link>
        </div>
        
        {/* Cart Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2 text-burgundy-600" />
            Your Cart
          </h1>
          {tableNumber > 0 && (
            <span className="text-sm text-gray-600">
              Table #{tableNumber}
            </span>
          )}
        </div>
        
        {/* Success Message */}
        {success && (
          <div className="mt-6 bg-green-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Your order has been placed successfully! Redirecting you back to the menu...
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {orderError && ( // Display error from orderStore
          <div className="mt-6 bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{orderError}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Cart Items */}
        <div className="mt-6">
          {isEmpty ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-1 text-sm text-gray-500">
                Looks like you haven't added any items to your cart yet.
              </p>
              <div className="mt-6">
                <Link
                  to={tableNumber ? `/menu/${tableNumber}` : '/menu'}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-600 hover:bg-burgundy-700"
                >
                  Browse Menu
                </Link>
              </div>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              
              {/* Cart Summary */}
              <div className="mt-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="flex justify-between py-2 text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200">
                    <span>Taxes & Fees</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 font-semibold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  
                  {tableNumber === 0 && (
                    <div className="mt-4 bg-yellow-50 p-2 rounded text-sm text-yellow-700">
                      <AlertCircle className="inline-block h-4 w-4 mr-1" />
                      Table number not detected. Please scan the QR code at your table.
                    </div>
                  )}
                  
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder || tableNumber === 0} // Use isPlacingOrder from store
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-600 hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50"
                  >
                    {isPlacingOrder ? ( // Use isPlacingOrder from store
                      <span className="flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </span>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
