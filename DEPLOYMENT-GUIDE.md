# Complete Deployment Guide: GitHub + Supabase + Netlify

This guide will walk you through setting up the Interschool Travel CRM with proper integrations.

## Step 1: GitHub Integration

### 1.1 Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Name it: `interschool-travel-crm`
4. Make it **Public** (required for free Netlify)
5. Don't initialize with README (we already have files)
6. Click "Create repository"

### 1.2 Connect Your Local Project to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Interschool Travel CRM"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/interschool-travel-crm.git

# Push to GitHub
git push -u origin main
```

## Step 2: Supabase Setup

### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Sign in
3. Click "New Project"
4. Choose your organization
5. Name: `interschool-travel-crm`
6. Database Password: Create a strong password (save it!)
7. Region: Choose closest to your users
8. Click "Create new project"

### 2.2 Set Up Database Schema
1. Wait for project to be ready (2-3 minutes)
2. Go to "SQL Editor" in the left sidebar
3. Copy and paste the database schema from our migration files
4. Run the SQL to create all tables

### 2.3 Get Supabase Credentials
1. Go to Settings → API
2. Copy these values:
   - **Project URL** (starts with https://...)
   - **anon/public key** (starts with eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

## Step 3: Netlify Deployment

### 3.1 Connect GitHub to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Sign in (use GitHub account for easier integration)
3. Click "Add new site" → "Import an existing project"
4. Choose "Deploy with GitHub"
5. Authorize Netlify to access your GitHub
6. Select your `interschool-travel-crm` repository

### 3.2 Configure Build Settings
Netlify should auto-detect these settings, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 or higher

### 3.3 Add Environment Variables
In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add these variables:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 3.4 Deploy
1. Click "Deploy site"
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at a random Netlify URL

## Step 4: Custom Domain (Optional)

### 4.1 Set Up Custom Domain
1. In Netlify dashboard, go to Domain settings
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions

## Step 5: Database Setup

### 5.1 Import Sample Data
Once your site is deployed:
1. Visit your live site
2. Sign up for an account
3. Use the "Add Sample Data" button in the dashboard
4. Or use the "Import Educational Tours" feature

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all environment variables are set correctly
2. **Database connection fails**: Verify Supabase URL and key
3. **Site loads but no data**: Make sure you've run the database migrations
4. **Authentication issues**: Check Supabase auth settings

### Getting Help:
- Netlify: Check build logs in dashboard
- Supabase: Check logs in Supabase dashboard
- GitHub: Ensure all files are committed and pushed

## Automatic Deployments

Once set up, any push to your GitHub main branch will automatically:
1. Trigger a new Netlify build
2. Deploy the updated site
3. Your changes go live in 2-5 minutes

## Security Notes

- Never commit `.env` files to GitHub
- Use Netlify environment variables for secrets
- Enable Row Level Security (RLS) in Supabase
- Consider enabling branch deploy previews in Netlify

---

## Quick Commands Reference

```bash
# Push changes to GitHub (triggers auto-deploy)
git add .
git commit -m "Your commit message"
git push

# Check deployment status
# Visit your Netlify dashboard

# View live site
# Use the URL provided by Netlify
```