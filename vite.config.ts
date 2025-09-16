import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ensure environment variables are available in production
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://elpjovjxuelypkhyevet.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGpvdmp4dWVseXBraHlldmV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Mjk3MzAsImV4cCI6MjA3MjMwNTczMH0.gtwdHXJAu_ZtOiEE096Hh9-xKjGRCh1SFZqK4voSl-E'),
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
