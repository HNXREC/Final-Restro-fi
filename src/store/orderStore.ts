import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabaseClient'; // Import Supabase client
import { Order, OrderStatus, CartItem } from '../types';
import toast from 'react-hot-toast'; // Import toast for notifications

type OrderState = {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (tableNumber: number, items: CartItem[], total: number) => Promise<string | undefined>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  getOrderById: (id: string) => Order | undefined; // Keep for local state access
};

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      isLoading: false,
      error: null,

      // Fetch orders from Supabase
      fetchOrders: async () => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('orders') // Assuming your table name is 'orders'
          .select('*')
          .order('created_at', { ascending: false }); // Order by creation date

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error fetching orders:', error);
          toast.error(`Failed to fetch orders: ${error.message}`);
        } else {
          console.log('Fetched orders data:', data); // Log fetched data
          // Map Supabase data to your Order type if necessary
          const fetchedOrders: Order[] = data.map(item => ({
             id: item.id,
             tableNumber: item.table_number, // Corrected field name to match Supabase schema
             items: item.items, // Assuming items are stored as JSONB or similar
             status: item.status as OrderStatus, // Cast to OrderStatus type
             totalAmount: item.total_amount, // Corrected field name to match Supabase schema
             createdAt: item.created_at, // Adjust field names if different in Supabase
          }));
          console.log('Mapped orders:', fetchedOrders); // Log mapped data
          set({ orders: fetchedOrders, isLoading: false, error: null });
        }
      },

      // Add a new order to Supabase
      addOrder: async (tableNumber, items, total) => {
        set({ isLoading: true, error: null });
        const newOrderData = {
          table_number: tableNumber, // Corrected column name to match Supabase schema
          items, // Assuming items can be stored directly (e.g., JSONB)
          status: 'Pending', // Initial status
          total_amount: total, // Corrected column name to match Supabase schema
          // Supabase will automatically add created_at if configured
        };

        const { data, error } = await supabase
          .from('orders')
          .insert([newOrderData])
          .select(); // Select the inserted data to get the generated ID and created_at

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error adding order:', error);
          toast.error(`Failed to place order: ${error.message}`);
          return undefined;
        } else if (data && data.length > 0) {
           // Map Supabase inserted data to your Order type
           const addedOrder: Order = {
              id: data[0].id,
              tableNumber: data[0].table_number, // Corrected field name
              items: data[0].items,
              status: data[0].status as OrderStatus,
              totalAmount: data[0].total_amount, // Corrected field name
              createdAt: data[0].created_at,
           };
          set((state) => ({
            orders: [addedOrder, ...state.orders], // Add to the beginning for newest first
            isLoading: false,
            error: null,
          }));
          toast.success('Order placed successfully!');
          return addedOrder.id; // Return the new order ID
        } else {
           set({ isLoading: false, error: 'Failed to place order.' });
           toast.error('Failed to place order.');
           return undefined;
        }
      },

      // Update an existing order's status in Supabase
      updateOrderStatus: async (id, status) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase
          .from('orders')
          .update({ status })
          .eq('id', id)
          .select(); // Select the updated data

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error updating order status:', error);
          toast.error(`Failed to update order status: ${error.message}`);
        } else if (data && data.length > 0) {
          set((state) => ({
            orders: state.orders.map((order) =>
              order.id === id ? (data[0] as Order) : order // Update the order in local state
            ),
            isLoading: false,
            error: null,
          }));
          toast.success(`Order status updated to ${status}!`);
        } else {
           set({ isLoading: false, error: 'Failed to update order status.' });
           toast.error('Failed to update order status.');
        }
      },

      // Get order by ID from local state (assuming fetchOrders has been called)
      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },
    }),
    {
      name: 'order-storage',
      // Don't persist orders, fetch them on load
      partialize: (state) => ({}),
      // Fetch data on rehydration
      onRehydrateStorage: () => {
         return (state, get) => {
            (get as () => OrderState)().fetchOrders();
         };
      },
    }
  )
);

export default useOrderStore;
