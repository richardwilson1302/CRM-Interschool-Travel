# 🚀 Complete Deployment Guide: GitHub + Netlify

## Step 1: Download Your Project Files

You'll need to download these files from the file explorer on the left:

### Essential Files:
- `package.json`
- `index.html`
- `vite.config.ts`
- `tailwind.config.js`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `postcss.config.js`
- `eslint.config.js`
- `netlify.toml`
- `.env.example`
- `README.md`

### Essential Folders (download entire folders):
- `src/` (contains all your React components and logic)
- `public/` (contains static assets)

### How to Download:
1. **Right-click on each file/folder** in the file explorer
2. **Select "Download"**
3. **Save to a new folder** on your computer called `interschool-travel-crm`

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"New"** button (green button) or go to [github.com/new](https://github.com/new)
3. Repository name: `interschool-travel-crm`
4. Make it **Public** (required for free Netlify)
5. **Don't** check "Add a README file" (we already have one)
6. Click **"Create repository"**

## Step 3: Upload Files to GitHub

### Method A: Drag & Drop (Easiest)
1. On your new repository page, click **"uploading an existing file"**
2. **Drag all your downloaded files and folders** into the upload area
3. **Commit message**: "Initial commit: Interschool Travel CRM"
4. Click **"Commit changes"**

### Method B: Create Files Manually
1. Click **"Create new file"**
2. Type filename with path (e.g., `src/App.tsx`)
3. Copy and paste the file content
4. Click **"Commit new file"**
5. Repeat for each file

## Step 4: Connect to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. **Authorize Netlify** to access your GitHub account
5. **Select your repository**: `interschool-travel-crm`

### Build Settings (should auto-detect):
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

## Step 5: Add Environment Variables

In your Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Click **"Add variable"**
3. Add these variables:
   - **Key**: `VITE_SUPABASE_URL` **Value**: Your Supabase project URL
   - **Key**: `VITE_SUPABASE_ANON_KEY` **Value**: Your Supabase anon key

### Where to find Supabase credentials:
1. Go to your Supabase project dashboard
2. Click **Settings** → **API**
3. Copy the **Project URL** and **anon/public key**

## Step 6: Deploy

1. Click **"Deploy site"**
2. Wait 2-5 minutes for the build to complete
3. Your site will be live at a Netlify URL like `https://amazing-name-123456.netlify.app`

## Step 7: Test Your Application

1. Visit your live Netlify URL
2. Try signing up for an account
3. Test the CRM functionality

---

## Quick Checklist:

- [ ] Downloaded all project files
- [ ] Created GitHub repository
- [ ] Uploaded files to GitHub
- [ ] Connected GitHub to Netlify
- [ ] Added Supabase environment variables
- [ ] Deployed successfully
- [ ] Tested the live application

## Need Help?

If you get stuck on any step, let me know and I can provide more specific guidance!

## Alternative: Quick Deploy

If GitHub seems too complex, you can also:
1. Download the `dist` folder (after I build it)
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `dist` folder onto the page
4. Get an instant deployment (but no automatic updates)