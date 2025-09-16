import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Supabase Environment Check:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? `✅ ${supabaseUrl.substring(0, 30)}...` : '❌ MISSING');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? `✅ ${supabaseAnonKey.substring(0, 30)}...` : '❌ MISSING');

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL is missing from environment variables');
}
if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is missing from environment variables');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please click "Connect to Supabase" button in the top right corner');
  throw new Error('Missing required Supabase environment variables. Please click "Connect to Supabase" button in the top right corner.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test connection
console.log('🔄 Testing Supabase connection...');
supabase.from('schools').select('*').limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase connection test FAILED:', error);
      console.error('Error details:', error.message, error.details, error.hint);
      console.error('This usually means:');
      console.error('1. Environment variables are missing or incorrect');
      console.error('2. Database permissions are not set correctly');
      console.error('3. Row Level Security policies are blocking access');
    } else {
      console.log('✅ Supabase connection SUCCESSFUL!');
      console.log('📊 Schools table accessible. Found:', data?.length || 0, 'schools');
      if (data && data.length > 0) {
        console.log('📝 First school found:', data[0].name);
      } else {
        console.log('⚠️ No schools found in database - this might be normal if you haven\'t added any yet');
      }
    }
  })
  .catch(err => {
    console.error('❌ Supabase connection FAILED with exception:', err);
  });