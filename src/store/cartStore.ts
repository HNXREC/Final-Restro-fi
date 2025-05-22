import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '../types';

type CartState = {
  items: CartItem[];
  tableNumber: number;
  // Update addItem signature to accept quantity
  addItem: (item: MenuItem, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setTableNumber: (number: number) => void;
  total: () => number;
  itemCount: () => number;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      tableNumber: 0,
      // Modify addItem to accept item and quantity
      addItem: (item: MenuItem, quantity: number) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((i) => i.id === item.id);

          if (existingItemIndex > -1) {
            // If item exists, update its quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity,
            };
            return { items: updatedItems };
          } else {
            // If item does not exist, add it with the specified quantity
            return {
              items: [...state.items, { ...item, quantity: quantity }],
            };
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      setTableNumber: (number) => set({ tableNumber: number }),
      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      itemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
