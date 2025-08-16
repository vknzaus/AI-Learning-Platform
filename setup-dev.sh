#!/bin/bash

# AI Learning Platform - Development Setup Script
echo "🚀 Setting up AI Learning Platform development environment..."

# Check if we're in the correct directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ] && [ ! -d "backend" ]; then
    echo "❌ This doesn't appear to be the AI Learning Platform directory"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ -f "package.json" ]; then
    npm install
    echo "✅ Backend dependencies installed"
else
    echo "⚠️ No backend package.json found"
fi

cd ..

# Install frontend dependencies  
echo "📦 Installing frontend dependencies..."
cd frontend
if [ -f "package.json" ]; then
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️ No frontend package.json found"
fi

cd ..

# Set up environment files if they don't exist
echo "⚙️ Setting up environment configuration..."

# Backend environment
if [ ! -f "backend/.env" ] && [ -f "backend/.env.example" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Backend .env file created from template"
fi

# Frontend environment  
if [ ! -f "frontend/.env" ] && [ -f "frontend/.env.development" ]; then
    cp frontend/.env.development frontend/.env
    echo "✅ Frontend .env file created from template"
fi

# Database setup (if using Prisma)
echo "🗄️ Setting up database..."
cd backend
if [ -f "prisma/schema.prisma" ]; then
    echo "Running Prisma generate..."
    npx prisma generate
    echo "✅ Prisma client generated"
fi

cd ..

echo "🎉 Development environment setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Start the backend: cd backend && npm run dev"
echo "  2. Start the frontend: cd frontend && npm run dev"
echo "  3. Open http://localhost:3000 to view the app"
echo ""
echo "🛠️ Available ports:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend:  http://localhost:5000"
echo "  - Database: localhost:5432 (PostgreSQL)"