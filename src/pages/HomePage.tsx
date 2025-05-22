import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Utensils, Smartphone, QrCode } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-burgundy-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-burgundy-700 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Modernize Your</span>
                  <span className="block text-gold-400">Restaurant Experience</span>
                </h1>
                <p className="mt-3 text-base text-cream-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your restaurant operations with QR code ordering, digital menus, and real-time order management.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-burgundy-700 bg-cream-100 hover:bg-cream-200 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cream-100 bg-burgundy-600 hover:bg-burgundy-500 md:py-4 md:text-lg md:px-10"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Restaurant interior"
          />
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simplify Your Restaurant Management
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Restro-fi offers everything you need to digitize your restaurant operations
              and provide a premium experience to your customers.
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-burgundy-600 rounded-md shadow-lg">
                        <ChefHat className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">Menu Management</h3>
                    <p className="mt-3 text-base text-gray-600">
                      Easily create and update digital menus with images, descriptions, and prices.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-burgundy-600 rounded-md shadow-lg">
                        <QrCode className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">QR Code Ordering</h3>
                    <p className="mt-3 text-base text-gray-600">
                      Generate unique QR codes for each table that allow customers to view the menu and order.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-burgundy-600 rounded-md shadow-lg">
                        <Utensils className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">Order Management</h3>
                    <p className="mt-3 text-base text-gray-600">
                      Track and manage orders in real-time. Update order status and communicate with the kitchen.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-md h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-burgundy-600 rounded-md shadow-lg">
                        <Smartphone className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">Mobile-friendly</h3>
                    <p className="mt-3 text-base text-gray-600">
                      Responsive design that works perfectly on any device, ensuring a seamless customer experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-burgundy-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-cream-100 sm:text-4xl">
            <span className="block">Ready to elevate your restaurant?</span>
            <span className="block text-gold-400">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-burgundy-700 bg-cream-100 hover:bg-cream-200"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;