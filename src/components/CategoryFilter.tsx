import React from 'react';
import clsx from 'clsx';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="overflow-x-auto mb-6 pb-2">
      <div className="flex space-x-2">
        <button
          onClick={() => onSelect('')}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
            selectedCategory === ''
              ? 'bg-burgundy-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          All Items
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.name)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              selectedCategory === category.name
                ? 'bg-burgundy-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;