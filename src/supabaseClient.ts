import { createClient } from '@supabase/supabase-js';

// Ensure these environment variables are set in your .env.local file
// VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
// VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY (Public key)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be provided as environment variables.');
  // Depending on the application's needs, you might throw an error or handle this differently
  // For now, we'll log an error and proceed, but the client will be undefined or non-functional
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
