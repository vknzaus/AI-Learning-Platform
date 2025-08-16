# Development Workflow Guide 🚀

## Branch Structure

### Main Branch (`main`)

- **Purpose**: Production-ready, stable code
- **Protection**: Only accept merge requests from `dev`
- **Deployment**: Automatically deployed to production
- **Status**: ✅ Stable with complete authentication system

### Development Branch (`dev`)

- **Purpose**: Integration branch for new features
- **Current Status**: Active development branch
- **Features**: All main features + ongoing development
- **Workflow**: Feature branches merge into `dev` first

## Development Workflow

### 1. Feature Development

```bash
# Start from dev branch
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/feature-name

# Work on feature...
git add .
git commit -m "feat: descriptive commit message"

# Push feature branch
git push -u origin feature/feature-name
```

### 2. Integration Process

```bash
# Switch to dev and update
git checkout dev
git pull origin dev

# Merge feature branch (or create PR)
git merge feature/feature-name
git push origin dev
```

### 3. Release Process

```bash
# When dev is stable and ready for release
git checkout main
git pull origin main

# Merge dev into main
git merge dev
git push origin main

# Tag the release
git tag -a v1.x.x -m "Release version 1.x.x"
git push origin v1.x.x
```

## Current Development Status

### ✅ Completed Features (in `main`)

- 🎨 Duolingo-inspired dark theme design
- 🏠 Responsive header with centered gradient title
- 💎 Gamification elements (gems and hearts)
- 🔐 Complete authentication system with demo accounts
- 👤 User profile dropdown with stats and level progress
- 📱 Mobile-responsive design
- ⚙️ Backend API with Prisma/PostgreSQL
- 🗃️ Database migrations and seed data

### 🔄 Ready for Development (in `dev`)

All stable features are available for building upon.

## Demo Accounts Available

- **Demo User**: `demo` / `demo123` (💎 250, ❤️ 5, Level 3)
- **Student**: `student` / `student123` (💎 180, ❤️ 4, Level 2)
- **Learner**: `learner` / `learner123` (💎 320, ❤️ 5, Level 4)

## Next Development Priorities

### Phase 1: Core Learning Features

- [ ] Interactive lesson system
- [ ] Progress tracking and persistence
- [ ] Question types (multiple choice, drag-and-drop, coding)
- [ ] XP and level calculation system

### Phase 2: Enhanced UX

- [ ] Smooth animations and transitions
- [ ] Sound effects and celebrations
- [ ] Achievement system
- [ ] Daily streaks and goals

### Phase 3: Advanced Features

- [ ] Real-time multiplayer learning
- [ ] AI-powered personalized learning paths
- [ ] Advanced analytics and insights
- [ ] Social features and friend system

## Development Commands

### Frontend Development

```bash
cd frontend
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development

```bash
cd backend
npm run dev          # Start backend server (http://localhost:5000)
npm run build        # Build TypeScript
npm run start        # Start production server
npx prisma studio    # Open database admin UI
npx prisma migrate dev  # Run database migrations
```

### Full Stack Development

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Database (optional)
cd backend && npx prisma studio
```

## Git Best Practices

### Commit Message Format

```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting, missing semicolons, etc.
- refactor: Code restructuring without feature changes
- test: Adding/updating tests
- chore: Updating build tasks, package manager configs, etc.

Examples:
feat(auth): add user profile dropdown with stats
fix(header): resolve mobile menu alignment issue
docs(readme): update development setup instructions
```

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-cleanup` - Code refactoring

## Repository Status

**Current Branch**: `dev` ✅  
**Remote Tracking**: `origin/dev` ✅  
**Working Directory**: Clean ✅  
**Ready for Development**: Yes ✅

---

**Happy Coding!** 🎉 Ready to build amazing AI learning experiences!
