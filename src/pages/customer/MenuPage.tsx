import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMenuStore from '../../store/menuStore';
import useCartStore from '../../store/cartStore';
import MenuItemCard from '../../components/MenuItemCard';
import CategoryFilter from '../../components/CategoryFilter';
import { Search, Loader2 } from 'lucide-react'; // Import Loader2 icon

const MenuPage: React.FC = () => {
  const { tableId } = useParams();
  const { menuItems, categories, fetchMenuItems, fetchCategories, isLoading, error } = useMenuStore(); // Get fetch functions, isLoading, and error
  const { setTableNumber } = useCartStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    // Fetch menu items and categories when the component mounts
    fetchMenuItems();
    fetchCategories();
  }, [fetchMenuItems, fetchCategories]); // Depend on fetch functions
  
  useEffect(() => {
    if (tableId) {
      const tableNumber = parseInt(tableId);
      if (!isNaN(tableNumber)) {
        setTableNumber(tableNumber);
      }
    }
  }, [tableId, setTableNumber]);
  
  // Filter menu items based on search and category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
          <p className="mt-2 text-gray-600">
            Discover our delicious offerings and place your order
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search menu..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        
        {/* Loading/Error State */}
        {isLoading && (
          <div className="text-center py-12 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-burgundy-600 mr-2" />
            Loading menu...
          </div>
        )}
        
        {error && (
          <div className="text-center py-12 text-red-600">
            Error loading menu: {error}
          </div>
        )}
        
        {/* Menu Items Grid */}
        {!isLoading && !error && (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No menu items found. Try a different search or category.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MenuPage;
