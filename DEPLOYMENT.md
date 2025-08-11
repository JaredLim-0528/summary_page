# Deployment Guide for Vercel

## Prerequisites

1. Make sure you have a Vercel account
2. Install Vercel CLI (optional but recommended):
   ```bash
   npm i -g vercel
   ```

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Navigate to the project directory:
   ```bash
   cd summary
   ```

2. Run the deployment command:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your project

### Option 3: Deploy via GitHub Integration

1. Connect your GitHub account to Vercel
2. Select the repository
3. Vercel will automatically deploy on every push to the main branch

## Configuration

The project includes a `vercel.json` file with the following configuration:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **SPA Routing**: Configured to handle client-side routing
- **Asset Caching**: Optimized caching for static assets

## Environment Variables

Currently, no environment variables are required for this project. If you need to add any in the future, you can configure them in the Vercel dashboard under Project Settings > Environment Variables.

## Build Process

The build process:
1. TypeScript compilation (`tsc`)
2. Vite build process
3. Outputs to `dist/` directory

## Troubleshooting

If you encounter build issues:

1. Test the build locally first:
   ```bash
   npm run build
   ```

2. Check that all dependencies are installed:
   ```bash
   npm install
   ```

3. Verify TypeScript compilation:
   ```bash
   npx tsc --noEmit
   ```

## Custom Domain (Optional)

After deployment, you can add a custom domain in the Vercel dashboard under Project Settings > Domains. 