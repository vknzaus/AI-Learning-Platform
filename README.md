# 🚀 FunLabs AI Learning Platform

> Master artificial intelligence through fun, interactive lessons!

A modern, Duolingo-inspired learning platform designed to make AI and ML concepts accessible through engaging, bite-sized lessons with gamification elements.

![Platform Status](https://img.shields.io/badge/status-active%20development-green)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Node.js%20%7C%20PostgreSQL-blue)
![Theme](https://img.shields.io/badge/theme-dark%20mode-purple)

## ✨ Features

### 🎨 Modern UI/UX

- **Dark Theme**: Authentic Duolingo-inspired dark design
- **Gradient Headers**: Beautiful centered gradient titles
- **Gamification**: Gems 💎 and hearts ❤️ system
- **Responsive Design**: Works perfectly on all devices

### 📚 Learning Platform

- **Interactive Lessons**: Engaging AI/ML content
- **Practice Mode**: Hands-on coding exercises
- **Leaderboards**: Competitive learning with rankings
- **Profile System**: Track your progress and achievements
- **Topic Management**: Organized learning paths

### 🛠️ Technical Features

- **Full-Stack TypeScript**: Type-safe development
- **Real-time Updates**: Instant feedback and progress
- **Database Integration**: PostgreSQL with Prisma ORM
- **Redis Caching**: Fast performance
- **Error Handling**: Comprehensive error states and recovery

## 🏗️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS** for styling
- **Custom Components** with dark theme

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma ORM** for database management
- **PostgreSQL** for data storage
- **Redis** for caching

### Development

- **GitHub Codespaces** ready
- **Docker** containerization
- **ESLint & Prettier** for code quality
- **Automated setup scripts**

## 🚀 Quick Start

### Option 1: GitHub Codespaces (Recommended)

1. Click "Code" → "Create codespace on main"
2. Wait for automatic setup to complete
3. Start developing immediately!

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/vknzaus/AI-Learning-Platform.git
cd AI-Learning-Platform

# Run the unified setup script
./setup-dev.sh --full --database

# Start backend (terminal 1)
cd backend && npm run dev

# Start frontend (terminal 2)
cd frontend && npm run dev
```

## 📁 Project Structure

```
AI-Learning-Platform/
├── 🎨 frontend/              # React TypeScript app
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── Header.tsx    # Gradient header with gamification
│   │   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   │   ├── Practice.tsx  # Interactive practice mode
│   │   │   ├── Leaderboards.tsx # Competitive rankings
│   │   │   └── Profile.tsx   # User profile & progress
│   │   ├── services/         # API integration
│   │   └── App.tsx          # Main application
│   ├── tailwind.config.js   # Dark theme configuration
│   └── package.json
│
├── 🔧 backend/               # Node.js Express API
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── app.ts          # Express application
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Database seeding
│   └── package.json
│
├── 🐳 .devcontainer/        # GitHub Codespaces config
│   ├── devcontainer.json   # Codespace configuration
│   └── docker-compose.yml  # Development services
│
├── 📚 docs/                 # Documentation
├── 🛠️ setup-dev.sh         # Unified setup script
└── README.md               # This file
```

## 🔧 Development Scripts

### Setup Scripts

```bash
# Automatic setup (used by Codespaces)
./setup-dev.sh --auto

# Full manual setup
./setup-dev.sh --full

# Full setup with database initialization
./setup-dev.sh --full --database
```

### Backend Commands

```bash
cd backend

# Development server
npm run dev

# Database management
npx prisma studio          # Visual database editor
npx prisma migrate dev     # Apply database migrations
npx prisma db seed         # Seed database with test data
npx prisma generate        # Generate Prisma client
```

### Frontend Commands

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Available URLs

When running locally:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database Studio**: http://localhost:5555 (when running `npx prisma studio`)

## 🎯 Current Features Status

### ✅ Completed

- [x] Modern dark theme UI with Duolingo inspiration
- [x] Centered gradient header with gamification elements
- [x] Sidebar navigation with multiple sections
- [x] Practice mode with interactive exercises
- [x] Leaderboards with competitive rankings
- [x] Profile system with progress tracking
- [x] Topic management and display
- [x] Database integration with PostgreSQL
- [x] Error handling and loading states
- [x] Responsive design for all screen sizes
- [x] GitHub Codespaces integration

### 🚧 In Development

- [ ] User authentication system
- [ ] Real-time multiplayer features
- [ ] Advanced gamification (streaks, badges, XP)
- [ ] Content management system
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test them
4. Commit with descriptive messages
5. Push and create a Pull Request

## 🛠️ Development Environment

This project is optimized for **GitHub Codespaces** with:

- Pre-configured development containers
- Automatic dependency installation
- Database setup and seeding
- Port forwarding for local development
- VS Code extensions for optimal DX

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

Having issues? Check out:

- [Issues](https://github.com/vknzaus/AI-Learning-Platform/issues) for bug reports
- [Discussions](https://github.com/vknzaus/AI-Learning-Platform/discussions) for questions
- [Wiki](https://github.com/vknzaus/AI-Learning-Platform/wiki) for detailed docs

---

<div align="center">
  
**Built with ❤️ for the AI learning community**

[⭐ Star this repo](https://github.com/vknzaus/AI-Learning-Platform) • [🐛 Report Bug](https://github.com/vknzaus/AI-Learning-Platform/issues) • [💡 Request Feature](https://github.com/vknzaus/AI-Learning-Platform/issues)

</div>
