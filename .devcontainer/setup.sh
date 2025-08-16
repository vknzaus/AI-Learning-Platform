#!/bin/bash

echo "🚀 Setting up AI Learning Platform development environment..."
echo "📱 Initializing existing project dependencies..."

# Update npm to latest version
npm install -g npm@latest

# Install frontend dependencies
if [ -d "frontend" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
else
    echo "❌ Frontend directory not found!"
    exit 1
fi

# Install backend dependencies
if [ -d "backend" ]; then
    echo "🔧 Installing backend dependencies..." 
    cd backend
    npm install
    
    # Setup database if needed
    if [ -f "prisma/schema.prisma" ]; then
        echo "🗄️  Setting up database..."
        npx prisma generate
        npx prisma db push
        npx prisma db seed
    fi
    
    cd ..
else
    echo "❌ Backend directory not found!"
    exit 1
fi

# Create/update development documentation
mkdir -p docs/daily-logs docs/architecture docs/development docs/handoff

cat > docs/current-status.md << 'EOF'
# AI Learning Platform - Development Status

## Project Overview
- **Project**: FunLabs AI Learning Platform  
- **Tech Stack**: React + TypeScript, Node.js + Express, PostgreSQL, Redis
- **Status**: Active Development - Feature Complete
- **Theme**: Duolingo-inspired Dark Theme with Gamification

## Current Features
- ✅ Header with centered gradient title and gamification (💎 gems, ❤️ hearts)
- ✅ Dark theme implementation across all components
- ✅ Sidebar navigation (Practice, Leaderboards, Profile sections)  
- ✅ Topic management system
- ✅ Database integration with Prisma ORM
- ✅ Comprehensive error handling and loading states

## Environment Status
- ✅ Node.js 20 installed and configured
- ✅ PostgreSQL database running (funlabs_ai)
- ✅ Redis cache available
- ✅ Development ports configured (3000: Frontend, 5000: Backend)
- ✅ GitHub Codespaces integration ready

## Recent Updates
- **Latest**: Header redesign with centered gradient title
- **Theme**: Complete Duolingo-inspired dark theme  
- **Gamification**: Added gems and hearts to header
- **Navigation**: Sidebar with Practice, Leaderboards, Profile sections

## Quick Start Commands
\`\`\`bash
# Start backend server
cd backend && npm run dev

# Start frontend (in new terminal)
cd frontend && npm run dev

# Database commands
cd backend && npx prisma studio  # View database
cd backend && npx prisma migrate dev  # Apply migrations
\`\`\`

## Next Development Goals
1. Add more interactive learning content
2. Implement user authentication
3. Enhance gamification features
4. Add real-time collaboration features
EOF

# Make sure we have executable permissions
chmod +x /workspace/.devcontainer/setup.sh

echo ""
echo "✅ AI Learning Platform environment setup complete!"
echo "🎯 Ready for development with full-featured learning platform"
echo ""
echo "🚀 To start development:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm run dev"
echo "   Database: cd backend && npx prisma studio"