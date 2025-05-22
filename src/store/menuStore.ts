import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabaseClient'; // Import Supabase client
import { MenuItem, Category } from '../types';
import toast from 'react-hot-toast'; // Import toast for notifications

type MenuState = {
  menuItems: MenuItem[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchMenuItems: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
};

const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      menuItems: [],
      categories: [],
      isLoading: false,
      error: null,

      // Fetch menu items from Supabase
      fetchMenuItems: async () => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('menu_items') // Assuming your table name is 'menu_items'
          .select('*');

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error fetching menu items:', error);
          toast.error(`Failed to fetch menu items: ${error.message}`);
        } else {
          set({ menuItems: data as MenuItem[], isLoading: false, error: null });
        }
      },

      // Fetch categories from Supabase
      fetchCategories: async () => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('categories') // Assuming your table name is 'categories'
          .select('*');

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error fetching categories:', error);
          toast.error(`Failed to fetch categories: ${error.message}`);
        } else {
          set({ categories: data as Category[], isLoading: false, error: null });
        }
      },

      // Add a new menu item to Supabase
      addMenuItem: async (item) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('menu_items')
          .insert([item])
          .select(); // Select the inserted data to get the generated ID

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error adding menu item:', error);
          toast.error(`Failed to add menu item: ${error.message}`);
        } else if (data && data.length > 0) {
          set((state) => ({
            menuItems: [...state.menuItems, data[0] as MenuItem],
            isLoading: false,
            error: null,
          }));
          toast.success('Menu item added successfully!');
        } else {
           set({ isLoading: false, error: 'Failed to add menu item.' });
           toast.error('Failed to add menu item.');
        }
      },

      // Update an existing menu item in Supabase
      updateMenuItem: async (id, updatedItem) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('menu_items')
          .update(updatedItem)
          .eq('id', id)
          .select(); // Select the updated data

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error updating menu item:', error);
          toast.error(`Failed to update menu item: ${error.message}`);
        } else if (data && data.length > 0) {
          set((state) => ({
            menuItems: state.menuItems.map((item) =>
              item.id === id ? (data[0] as MenuItem) : item
            ),
            isLoading: false,
            error: null,
          }));
          toast.success('Menu item updated successfully!');
        } else {
           set({ isLoading: false, error: 'Failed to update menu item.' });
           toast.error('Failed to update menu item.');
        }
      },

      // Delete a menu item from Supabase
      deleteMenuItem: async (id) => {
        set({ isLoading: true, error: null });
        const { error } = await supabase
          .from('menu_items')
          .delete()
          .eq('id', id);

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error deleting menu item:', error);
          toast.error(`Failed to delete menu item: ${error.message}`);
        } else {
          set((state) => ({
            menuItems: state.menuItems.filter((item) => item.id !== id),
            isLoading: false,
            error: null,
          }));
          toast.success('Menu item deleted successfully!');
        }
      },

      // Add a new category to Supabase
      addCategory: async (category) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('categories')
          .insert([category])
          .select(); // Select the inserted data

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error adding category:', error);
          toast.error(`Failed to add category: ${error.message}`);
        } else if (data && data.length > 0) {
          set((state) => ({
            categories: [...state.categories, data[0] as Category],
            isLoading: false,
            error: null,
          }));
          toast.success('Category added successfully!');
        } else {
           set({ isLoading: false, error: 'Failed to add category.' });
           toast.error('Failed to add category.');
        }
      },

      // Update an existing category in Supabase
      updateCategory: async (id, name) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('categories')
          .update({ name })
          .eq('id', id)
          .select(); // Select the updated data

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error updating category:', error);
          toast.error(`Failed to update category: ${error.message}`);
        } else if (data && data.length > 0) {
          set((state) => ({
            categories: state.categories.map((cat) =>
              cat.id === id ? (data[0] as Category) : cat
            ),
            isLoading: false,
            error: null,
          }));
          toast.success('Category updated successfully!');
        } else {
           set({ isLoading: false, error: 'Failed to update category.' });
           toast.error('Failed to update category.');
        }
      },

      // Delete a category from Supabase
      deleteCategory: async (id) => {
        set({ isLoading: true, error: null });
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error deleting category:', error);
          toast.error(`Failed to delete category: ${error.message}`);
        } else {
          set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
            isLoading: false,
            error: null,
          }));
          toast.success('Category deleted successfully!');
        }
      },
    }),
    {
      name: 'menu-storage',
      // Don't persist menu items or categories, fetch them on load
      partialize: (state) => ({}),
      // Fetch data on rehydration
      onRehydrateStorage: () => {
         return (state, get) => {
            (get as () => MenuState)().fetchMenuItems();
            (get as () => MenuState)().fetchCategories();
         };
      },
    }
  )
);

export default useMenuStore;
