import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Environment Check:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING');
console.log('Full URL for debugging:', supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test connection
supabase.from('schools').select('*').limit(5)
  .then(({ data, error, count }) => {
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      console.error('Error details:', error.message, error.details, error.hint);
    } else {
      console.log('✅ Supabase connection successful. Schools table accessible.');
      console.log('Sample data found:', data?.length || 0, 'schools');
      if (data && data.length > 0) {
        console.log('First school:', data[0].name);
      }
    }
  })
  .catch(err => {
    console.error('❌ Supabase connection failed:', err);
  });