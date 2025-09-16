# Deploy to Your Netlify Account

Since the automatic deployment didn't connect to your personal Netlify account, let's set this up manually. This will give you full control over your deployment.

## Step 1: Prepare Your Repository

First, you'll need to get your code into a GitHub repository. Since Git isn't available in this environment, you'll need to manually upload the files.

### Download Your Project Files

1. **Right-click on each file/folder** in the file explorer on the left
2. **Select "Download"** to save them to your computer
3. **Maintain the folder structure** as shown in the file explorer

### Key files you need to download:
- `package.json`
- `src/` folder (entire folder with all subfolders)
- `public/` folder
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

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Name it: `interschool-travel-crm`
4. Make it **Public** (required for free Netlify)
5. Don't initialize with README (we have files)
6. Click "Create repository"

## Step 3: Upload Files to GitHub

1. On your new repository page, click **"uploading an existing file"**
2. **Drag and drop all your project files** into the upload area
3. **Add commit message**: "Initial commit: Interschool Travel CRM"
4. Click **"Commit changes"**

## Step 4: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub
5. Select your `interschool-travel-crm` repository

### Build Settings (should auto-detect):
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### Environment Variables:
Add these in Netlify dashboard under Site settings → Environment variables:
- `VITE_SUPABASE_URL`: Your Supabase Project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## Step 5: Deploy

1. Click "Deploy site"
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at a Netlify URL

## Alternative: Quick Deploy via Netlify Drop

If you don't want to use GitHub:

1. Run `npm run build` in this environment to create a `dist` folder
2. Download the entire `dist` folder
3. Go to [netlify.com/drop](https://netlify.com/drop)
4. Drag the `dist` folder onto the page
5. Your site will be deployed instantly

**Note**: The drag-and-drop method won't have automatic deployments when you make changes.

## Need Help?

Let me know if you encounter any issues with:
- Downloading files
- Creating the GitHub repository
- Setting up Netlify
- Configuring environment variables

I can provide more specific guidance for any step!