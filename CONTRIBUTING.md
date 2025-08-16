# Contributing to FunLabs AI Learning Platform

Thank you for your interest in contributing to the FunLabs AI Learning Platform! 🎉

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Set up** the development environment using our unified setup script:
   ```bash
   ./setup-dev.sh --full --database
   ```

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly

### 3. Code Quality
- Run linting: `npm run lint` (in both frontend and backend)
- Ensure TypeScript compilation succeeds
- Test in both development and production builds

### 4. Submit a Pull Request
- Push your changes to your fork
- Create a detailed Pull Request with:
  - Clear description of changes
  - Screenshots for UI changes
  - Testing instructions

## Code Style

### Frontend (React/TypeScript)
- Use functional components with hooks
- Follow the existing dark theme patterns
- Keep components focused and reusable
- Use TypeScript types consistently

### Backend (Node.js/Express)
- Use async/await for asynchronous operations
- Follow RESTful API conventions
- Add proper error handling
- Document API endpoints

## Project Structure

- `frontend/src/components/` - React components
- `backend/src/` - API server code
- `.devcontainer/` - Development environment configuration
- `docs/` - Documentation files

## Areas for Contribution

### 🎨 Frontend
- UI/UX improvements
- New learning components
- Mobile responsiveness
- Accessibility enhancements

### 🔧 Backend
- API endpoints
- Database optimizations
- Authentication features
- Performance improvements

### 📚 Content
- Learning materials
- Documentation
- Code examples
- Tutorials

### 🧪 Testing
- Unit tests
- Integration tests
- E2E testing
- Performance testing

## Questions?

- Open an [Issue](https://github.com/vknzaus/AI-Learning-Platform/issues) for bugs
- Start a [Discussion](https://github.com/vknzaus/AI-Learning-Platform/discussions) for questions
- Check the [Wiki](https://github.com/vknzaus/AI-Learning-Platform/wiki) for detailed docs

## Code of Conduct

Please be respectful and constructive in all interactions. We're building an inclusive learning environment for everyone interested in AI and ML.

---

**Happy contributing! 🚀**
