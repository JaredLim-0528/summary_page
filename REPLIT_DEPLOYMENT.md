# Replit Deployment Guide

## Prerequisites

1. A Replit account
2. Basic knowledge of React and TypeScript

## Step-by-Step Deployment

### 1. Create a New Repl

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl"
3. Choose "React" template
4. Name your repl (e.g., "chiller-plant-summary")

### 2. Upload Project Files

**Option A: Using Git (Recommended)**
```bash
# In the Replit shell
git clone <your-repository-url>
cd <project-name>
```

**Option B: Manual Upload**
1. Upload all project files to your repl
2. Ensure the file structure matches the original project

### 3. Install Dependencies

The dependencies will be installed automatically when you run the project, but you can also run:
```bash
npm install
```

### 4. Configure Environment

The project is already configured for Replit with:
- `.replit` configuration file
- `replit.nix` for package management
- Updated Vite config for Replit hosting

### 5. Run the Application

1. Click the "Run" button in Replit
2. Or use the command: `npm run dev`
3. The app will be available in the webview panel

### 6. Access Your Application

- **Development**: Available in the Replit webview
- **Public URL**: Replit provides a public URL for sharing
- **Custom Domain**: You can configure a custom domain in Replit settings

## Configuration Files

### .replit
```toml
run = "npm run dev"
entrypoint = "src/main.tsx"

[nix]
channel = "stable-23_11"

[env]
PATH = "/home/runner/$REPL_SLUG/.config/npm/node_global/bin:/home/runner/$REPL_SLUG/node_modules/.bin"
npm_config_prefix = "/home/runner/$REPL_SLUG/.config/npm/node_global"

[packager]
language = "nodejs"

[packager.features]
packageSearch = true
guessImports = true

[languages]
[languages.javascript]
pattern = "**/*.{js,jsx,ts,tsx}"
syntax = "javascript"

[languages.javascript.languageServer]
start = [ "typescript-language-server", "--stdio" ]

[deployment]
run = ["sh", "-c", "npm run build"]
deploymentTarget = "static"
```

### replit.nix
```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
  ];
}
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - The app is configured to use port 3000
   - If there's a conflict, check the Vite config

2. **Dependencies Not Installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

3. **Build Errors**
   - Check TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed

4. **App Not Loading**
   - Check the console for errors
   - Verify the entry point in main.tsx
   - Ensure the root element exists in index.html

### Performance Optimization

1. **Enable Caching**
   - Replit automatically caches node_modules
   - Use production builds for better performance

2. **Memory Management**
   - Monitor memory usage in Replit
   - Optimize bundle size with tree shaking

## Monitoring and Maintenance

### Health Checks
- Access `/health.json` to check application status
- Monitor logs in the Replit console

### Updates
1. Pull latest changes from your repository
2. Run `npm install` to update dependencies
3. Test the application before deploying

### Backup
- Replit automatically saves your work
- Consider using Git for version control
- Export important data regularly

## Security Considerations

1. **Environment Variables**
   - Use Replit's secrets feature for sensitive data
   - Never commit API keys or passwords

2. **Dependencies**
   - Regularly update dependencies
   - Use `npm audit` to check for vulnerabilities

3. **Access Control**
   - Configure appropriate permissions
   - Use Replit's privacy settings

## Support

For additional help:
- Check Replit documentation
- Review the project README
- Check the troubleshooting section above 