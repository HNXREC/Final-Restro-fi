import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Utensils, 
  Users, 
  BarChart3, 
  Clock,
  CheckCircle,
  XCircle,
  Table as TableIcon
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useOrderStore from '../../store/orderStore';
import useMenuStore from '../../store/menuStore';
import useTableStore from '../../store/tableStore';
import { formatPrice } from '../../utils/format';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { orders } = useOrderStore();
  const { menuItems } = useMenuStore();
  const { tables } = useTableStore();
  
  // Calculate stats
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const preparingOrders = orders.filter(o => o.status === 'Preparing').length;
  const servedOrders = orders.filter(o => o.status === 'Served').length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;
  
  // Calculate total revenue
  const totalRevenue = orders
    .filter(o => o.status === 'Served')
    .reduce((sum, order) => {
      // Add checks for order.totalAmount
      return sum + (order.totalAmount || 0);
    }, 0);
  
  // Get recent orders, filter out orders with invalid data for display
  const recentOrders = [...orders]
    .filter(order => order.createdAt && order.items?.length > 0 && order.tableNumber != null && (order.totalAmount != null && !isNaN(order.totalAmount))) // Filter out orders with missing essential data
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="mt-2">
          <h2 className="text-lg font-medium text-gray-700">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-sm text-gray-500">
            Restro-fi Dashboard
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-burgundy-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Menu Items
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {menuItems.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <Link
                to="/menu-management"
                className="text-sm font-medium text-burgundy-600 hover:text-burgundy-500"
              >
                Manage menu
              </Link>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TableIcon className="h-6 w-6 text-burgundy-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Tables
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {tables.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <Link
                to="/tables"
                className="text-sm font-medium text-burgundy-600 hover:text-burgundy-500"
              >
                Manage tables
              </Link>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-burgundy-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Pending Orders
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {pendingOrders}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <Link
                to="/orders"
                className="text-sm font-medium text-burgundy-600 hover:text-burgundy-500"
              >
                View orders
              </Link>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-burgundy-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {formatPrice(totalRevenue)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm text-gray-500">
                From {servedOrders} completed orders
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Status Cards */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Order Statistics</h2>
          
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-400">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      Pending
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {pendingOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-400">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Utensils className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      Preparing
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {preparingOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-400">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      Served
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {servedOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-400">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <XCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      Cancelled
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {cancelledOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <Link
              to="/orders"
              className="text-sm font-medium text-burgundy-600 hover:text-burgundy-500"
            >
              View all
            </Link>
          </div>
          
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            {recentOrders.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <li key={order.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-burgundy-600 truncate">
                            {order.tableNumber != null ? `Table #${order.tableNumber}` : 'Unknown Table'}
                          </p>
                          <div className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Served' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}`}
                          >
                            {order.status}
                          </div>
                        </div>
                        <div className="text-sm text-gray-900 font-medium">
                          {formatPrice(order.totalAmount || 0)}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <p>
                            {order.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0} items • {order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'Invalid Date'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
                No orders yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
