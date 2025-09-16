# Local Development Setup

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials (see below)

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## Supabase Setup (Required)

To use the full functionality, you'll need to set up Supabase:

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > API in your Supabase dashboard
4. Copy your Project URL and anon/public key
5. Update your `.env` file:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Alternative: Demo Mode

If you want to test the application without setting up Supabase, you can run it in demo mode with sample data by temporarily modifying the App.tsx file to use the demo contexts instead of the real ones.

## Troubleshooting

- If you get dependency errors, try deleting `node_modules` and running `npm install` again
- Make sure you're using Node.js version 18 or higher
- If the dev server doesn't start, try running `npm run build` first to check for any build errors

## Building for Production

```bash
npm run build
```

This creates a `dist` folder that you can deploy to any static hosting service.