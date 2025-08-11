# Chiller Plant Summary Dashboard

A modern, responsive dashboard for monitoring chiller plant operations with real-time KPIs, equipment status, and historical data visualization.

## Features

- **Real-time KPIs**: COP, Cooling Load, and Power Consumption with trend indicators
- **Equipment Status**: Live status monitoring for Chillers, Cooling Towers, and Water Pumps
- **Abnormal Issues**: Alert system with urgency levels and device tracking
- **Historical Data**: Interactive charts for Chiller and Cooling Tower performance
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark interface optimized for monitoring environments

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Chart.js** with React Chart.js 2 for data visualization
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. Navigate to the summary directory:
   ```bash
   cd summary
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
summary/
├── src/
│   ├── App.tsx          # Main dashboard component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Dashboard Components

### KPI Cards
- **COP (Coefficient of Performance)**: Shows current efficiency with trend
- **Overall Cooling Load**: Displays current cooling demand
- **Overall Power Consumption**: Shows power usage with trend indicators

### Equipment Status
- **Chiller Status**: Temperature readings and operational status
- **Cooling Tower Status**: Water temperature and operational metrics
- **Water Pumps Status**: Pump performance indicators

### Abnormal Issues Table
- Real-time alerts with urgency levels (I, II, III)
- Device identification and timestamps
- Color-coded urgency indicators

### Historical Charts
- Interactive line charts for Chiller and Cooling Tower performance
- Time range selection (Hourly, Monthly, Yearly)
- Current vs Previous period comparison

## Customization

The dashboard uses mock data by default. To integrate with real data:

1. Replace the mock data in `App.tsx` with API calls
2. Update the chart data structure to match your data format
3. Modify the equipment status data to reflect your system
4. Connect the abnormal issues to your alert system

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## License

This project is created for demonstration purposes. 