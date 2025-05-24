import React, { useState, useEffect } from 'react';
import { MenuItem, Category } from '../types';

// Define a type for the form data, including a potential File object for the image
interface MenuItemFormData extends Omit<MenuItem, 'id'> {
  imageFile?: File | null; // Add a field for the selected file
}

interface MenuItemFormProps {
  item?: MenuItem;
  categories: Category[];
  // Update onSubmit to potentially accept a File object
  onSubmit: (itemData: Omit<MenuItem, 'id'>, imageFile?: File | null) => void;
  onCancel: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  item,
  categories,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<MenuItemFormData>({
    name: '',
    price: 0,
    description: '',
    image: '', // This will still store the URL for existing items
    imageFile: null, // Initialize imageFile state
    category: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image, // Load existing image URL
        imageFile: null, // No file selected initially for existing items
        category: item.category,
      });
    } else {
       // Reset form for new items
       setFormData({
         name: '',
         price: 0,
         description: '',
         image: '',
         imageFile: null,
         category: '',
       });
    }
  }, [item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      setFormData({ ...formData, imageFile: files ? files[0] : null });
    } else if (name === 'price') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass both form data (excluding imageFile) and the imageFile to onSubmit
    const { imageFile, ...itemData } = formData;
    onSubmit(itemData, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring-burgundy-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (₹)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring-burgundy-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring-burgundy-500 p-2 border"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          // required // Make required only if adding a new item and no image URL exists
          accept="image/*" // Accept only image files
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-burgundy-50 file:text-burgundy-700
            hover:file:bg-burgundy-100"
        />
        {/* Display current image or selected file name */}
        {item?.image && !formData.imageFile && (
           <p className="mt-2 text-sm text-gray-500">Current Image: <a href={item.image} target="_blank" rel="noopener noreferrer" className="text-burgundy-600 hover:underline">View Image</a></p>
        )}
        {formData.imageFile && (
           <p className="mt-2 text-sm text-gray-500">Selected File: {formData.imageFile.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring-burgundy-500 p-2 border"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-600 hover:bg-burgundy-700"
        >
          {item ? 'Update' : 'Create'} Item
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;
