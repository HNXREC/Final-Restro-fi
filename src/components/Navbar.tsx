import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, ShoppingCart, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const itemCount = useCartStore((state) => state.itemCount());
  const tableNumber = useCartStore((state) => state.tableNumber);
  
  // Check if the current path is the customer menu page (either /menu or /menu/:tableId)
  // Exclude /menu-management
  const isCustomerPage = location.pathname === '/menu' || /^\/menu\/\d+$/.test(location.pathname);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Utensils className="h-8 w-8 text-burgundy-600" />
              <span className="ml-2 text-xl font-bold text-burgundy-700">Ajay Sweet House</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated && !isCustomerPage ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-burgundy-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/menu-management" 
                    className="text-gray-700 hover:text-burgundy-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Menu
                  </Link>
                  <Link 
                    to="/orders" 
                    className="text-gray-700 hover:text-burgundy-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Orders
                  </Link>
                  <Link 
                    to="/tables" 
                    className="text-gray-700 hover:text-burgundy-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Tables
                  </Link>
                </div>
                <div className="ml-4 flex items-center">
                  <button
                    onClick={logout}
                    className="flex items-center text-gray-700 hover:text-burgundy-600 px-3 py-2"
                  >
                    <span className="mr-2">{user?.name}</span>
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : isCustomerPage ? (
              <div className="flex items-center">
                {tableNumber > 0 && (
                  <div className="mr-4 text-gray-700">
                    Table #{tableNumber}
                  </div>
                )}
                <Link 
                  to="/cart" 
                  className="relative text-gray-700 hover:text-burgundy-600"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-burgundy-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-burgundy-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-burgundy-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-burgundy-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
