import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabaseClient'; // Import Supabase client
import { User } from '../types'; // Assuming User type is compatible or will be adjusted

// Define AuthState with potential loading/error states
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void; // Keep for potential profile updates
  checkAuth: () => Promise<void>; // Add a function to check auth status on load
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login function using Supabase
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          set({ error: error.message, isLoading: false, isAuthenticated: false, user: null });
          console.error('Login error:', error);
          return false;
        }

        // Assuming Supabase user structure is compatible or mapped to your User type
        // You might need to fetch additional profile data from a 'profiles' table here
        const supabaseUser = data.user;
        if (supabaseUser) {
           // Basic mapping - adjust based on your Supabase user/profile structure
           const appUser: User = {
             id: supabaseUser.id,
             email: supabaseUser.email || '',
             name: supabaseUser.user_metadata?.name || '', // Example: fetching from user_metadata
             restaurantName: supabaseUser.user_metadata?.restaurantName || '', // Example: fetching from user_metadata
           };
          set({ user: appUser, isAuthenticated: true, isLoading: false, error: null });
          return true;
        } else {
           // Should not happen if data.user is null but no error, but good practice
           set({ error: 'Login failed: No user data received.', isLoading: false, isAuthenticated: false, user: null });
           return false;
        }
      },

      // Logout function using Supabase
      logout: async () => {
        set({ isLoading: true, error: null });
        const { error } = await supabase.auth.signOut();

        if (error) {
          set({ error: error.message, isLoading: false });
          console.error('Logout error:', error);
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },

      // Function to update user data (e.g., profile information)
      updateUser: (userData) => {
         set((state) => ({
           user: state.user ? { ...state.user, ...userData } : null,
         }));
         // In a real app, you'd also update this in your Supabase database
      },

      // Function to check current auth status (e.g., on app load)
      checkAuth: async () => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          set({ error: error.message, isLoading: false, isAuthenticated: false, user: null });
          console.error('Check auth error:', error);
        } else if (data?.session) {
           const supabaseUser = data.session.user;
           // Basic mapping - adjust based on your Supabase user/profile structure
           const appUser: User = {
             id: supabaseUser.id,
             email: supabaseUser.email || '',
             name: supabaseUser.user_metadata?.name || '',
             restaurantName: supabaseUser.user_metadata?.restaurantName || '',
           };
          set({ user: appUser, isAuthenticated: true, isLoading: false, error: null });
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      // Only persist isAuthenticated and potentially user ID/minimal data if needed
      // Full user object might be better fetched on load via checkAuth
      partialize: (state) => ({
         isAuthenticated: state.isAuthenticated,
         // Optionally persist user ID if needed for checkAuth logic, but fetching full user is safer
         user: state.user ? { id: state.user.id } : null,
      }),
      // Hydration might need to trigger checkAuth
      onRehydrateStorage: () => {
         return (state, get) => {
            if (state?.isAuthenticated) {
               // Trigger checkAuth after rehydration to get fresh user data
               // Need to cast get to the correct type
               (get as () => AuthState)().checkAuth();
            }
         };
      },
    }
  )
);

export default useAuthStore;
