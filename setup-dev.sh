#!/bin/bash

# AI Learning Platform - Unified Development Setup Script
# Handles both automatic Codespaces initialization and manual comprehensive setup

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 AI Learning Platform - Development Setup${NC}"
echo "================================================================"

# Detect if this is auto-run (from postCreateCommand) or manual
AUTO_RUN=false
if [ "$1" = "--auto" ] || [ -z "$1" ]; then
    AUTO_RUN=true
    echo -e "${YELLOW}📡 Detected: Automatic Codespaces setup${NC}"
else
    echo -e "${YELLOW}🔧 Detected: Manual comprehensive setup${NC}"
fi

# Check if we're in the correct directory
if [ ! -d "frontend" ] && [ ! -d "backend" ]; then
    echo -e "${RED}❌ This doesn't appear to be the AI Learning Platform directory${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found AI Learning Platform project structure${NC}"

# Update npm to latest version
echo -e "${BLUE}📦 Updating npm to latest version...${NC}"
npm install -g npm@latest

# Install backend dependencies
echo -e "${BLUE}🔧 Setting up backend...${NC}"
cd backend
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
    
    # Database setup (only for manual run or if explicitly requested)
    if [ "$AUTO_RUN" = false ] || [ "$2" = "--database" ]; then
        if [ -f "prisma/schema.prisma" ]; then
            echo -e "${BLUE}🗄️  Setting up database...${NC}"
            npx prisma generate
            npx prisma db push
            if [ -f "prisma/seed.ts" ]; then
                npx prisma db seed
                echo -e "${GREEN}✅ Database seeded successfully${NC}"
            fi
            echo -e "${GREEN}✅ Database setup complete${NC}"
        else
            echo -e "${YELLOW}⚠️  No Prisma schema found, skipping database setup${NC}"
        fi
    fi
else
    echo -e "${RED}❌ No backend package.json found${NC}"
    exit 1
fi
cd ..

# Install frontend dependencies  
echo -e "${BLUE}📦 Setting up frontend...${NC}"
cd frontend
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ No frontend package.json found${NC}"
    exit 1
fi
cd ..
    cd ..

# Create comprehensive documentation (only for manual runs)
if [ "$AUTO_RUN" = false ]; then
    echo -e "${BLUE}📝 Creating development documentation...${NC}"
    
    # Create docs structure
    mkdir -p docs/daily-logs docs/architecture docs/development docs/handoff
    
    # Create comprehensive status documentation
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
```bash
# Start backend server
cd backend && npm run dev

# Start frontend (in new terminal)
cd frontend && npm run dev

# Database commands
cd backend && npx prisma studio  # View database
cd backend && npx prisma migrate dev  # Apply migrations
```

## Next Development Goals
1. Add more interactive learning content
2. Implement user authentication
3. Enhance gamification features
4. Add real-time collaboration features
EOF
    
    echo -e "${GREEN}✅ Documentation created${NC}"
fi

# Final summary
echo ""
echo "================================================================"
if [ "$AUTO_RUN" = true ]; then
    echo -e "${GREEN}✅ AI Learning Platform - Quick setup complete!${NC}"
    echo -e "${BLUE}🚀 Your Codespace is ready for development${NC}"
    echo ""
    echo -e "${YELLOW}To start developing:${NC}"
    echo "   Backend:  cd backend && npm run dev"
    echo "   Frontend: cd frontend && npm run dev"
    echo ""
    echo -e "${BLUE}💡 For full setup with database, run: ./setup-dev.sh --full --database${NC}"
else
    echo -e "${GREEN}✅ AI Learning Platform - Complete setup finished!${NC}"
    echo -e "${BLUE}🎯 Ready for full-stack development with database${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "   1. Backend:  cd backend && npm run dev"
    echo "   2. Frontend: cd frontend && npm run dev (new terminal)"
    echo "   3. Database: cd backend && npx prisma studio"
    echo ""
    echo -e "${BLUE}📋 Documentation created in docs/current-status.md${NC}"
fi

echo -e "${GREEN}🎉 Happy coding!${NC}"

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