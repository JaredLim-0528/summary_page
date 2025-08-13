#!/bin/bash

echo "Setting up Chiller Plant Summary Dashboard for Replit..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo "🚀 Starting development server..."
    npm run dev
else
    echo "❌ Failed to install dependencies"
    exit 1
fi 