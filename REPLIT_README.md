# Chiller Plant Summary Dashboard - Replit Setup

This is a React-based dashboard for chiller plant summary data, configured to run on Replit.

## Quick Start

1. **Fork this repl** or create a new React + TypeScript repl
2. **Install dependencies**: The dependencies will be installed automatically when you run the project
3. **Run the project**: Click the "Run" button or use the command `npm run dev`
4. **View the app**: The app will be available in the webview panel

## Available Scripts

- `npm run dev` - Start development server (default Replit run command)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles
├── components/      # React components
└── data/           # Data files and CSV imports
```

## Features

- Interactive charts using Chart.js
- Real-time data visualization
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Replit Configuration

This project includes:
- `.replit` - Replit configuration file
- `replit.nix` - Nix package dependencies
- Updated Vite config for Replit hosting

## Troubleshooting

If you encounter issues:

1. **Clear cache**: Run `npm cache clean --force`
2. **Reinstall dependencies**: Delete `node_modules` and run `npm install`
3. **Check port**: Ensure port 3000 is available
4. **Restart repl**: Sometimes a fresh start helps

## Deployment

The project is configured for static deployment. Use `npm run build` to create a production build. 