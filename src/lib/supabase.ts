import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// Production environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elpjovjxuelypkhyevet.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGpvdmp4dWVseXBraHlldmV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Mjk3MzAsImV4cCI6MjA3MjMwNTczMH0.gtwdHXJAu_ZtOiEE096Hh9-xKjGRCh1SFZqK4voSl-E';

console.log('🔍 Supabase Environment Check (Production):');
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_SUPABASE_URL:', supabaseUrl ? `✅ ${supabaseUrl}` : '❌ MISSING');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? `✅ ${supabaseAnonKey.substring(0, 30)}...` : '❌ MISSING');

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL is missing from environment variables');
  console.error('Current env vars:', Object.keys(import.meta.env));
}
if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is missing from environment variables');
  console.error('Current env vars:', Object.keys(import.meta.env));
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test connection
console.log('🔄 Testing Supabase connection to IST CRM database...');
supabase.from('schools').select('*').limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ IST CRM database connection test FAILED:', error);
      console.error('Error details:', error.message, error.details, error.hint);
      console.error('URL being used:', supabaseUrl);
      console.error('Key being used:', supabaseAnonKey ? 'Present' : 'Missing');
    } else {
      console.log('✅ IST CRM database connection SUCCESSFUL!');
      console.log('📊 IST CRM Schools table accessible. Found:', data?.length || 0, 'schools');
      if (data && data.length > 0) {
        console.log('📝 First IST CRM school found:', data[0].name);
      } else {
        console.log('⚠️ No schools found in IST CRM database');
      }
    }
  })
  .catch(err => {
    console.error('❌ IST CRM database connection FAILED with exception:', err);
  });