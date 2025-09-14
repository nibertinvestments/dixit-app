# Contributing to Dixit App

Thank you for your interest in contributing to the Dixit App! We welcome contributions from the community and are grateful for any help you can provide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Security Issues](#security-issues)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ 
- npm or yarn
- Git
- Docker (for containerization testing)
- kubectl (for Kubernetes testing)

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # On GitHub, click the "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dixit-app.git
   cd dixit-app
   ```

3. **Add the upstream repository**
   ```bash
   git remote add upstream https://github.com/nibertinvestments/dixit-app.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Verify the setup**
   ```bash
   npm start
   # Visit http://localhost:3000 to confirm it's working
   ```

## Development Workflow

### Creating a Feature Branch

1. **Sync with upstream**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-number-description
   ```

### Making Changes

1. **Write your code**
   - Follow our [coding standards](#coding-standards)
   - Add tests for new functionality
   - Update documentation as needed

2. **Test your changes**
   ```bash
   # Run the application locally
   npm start
   
   # Test with Docker
   docker build -t dixit-app-test .
   docker run -p 3000:3000 dixit-app-test
   
   # Run load tests if applicable
   k6 run k6/test.js
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

### Commit Message Convention

We follow [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```bash
git commit -m "feat: add health check endpoint"
git commit -m "fix: resolve memory leak in request logging"
git commit -m "docs: update API documentation"
git commit -m "chore: update dependencies"
```

## Coding Standards

### JavaScript Style Guide

- Use ES6+ features where appropriate
- Follow consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Code Examples

**Good:**
```javascript
// Good: Clear, descriptive function name and proper error handling
async function getHealthStatus() {
  try {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime)} seconds`,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
      }
    };
  } catch (error) {
    throw new Error(`Health check failed: ${error.message}`);
  }
}
```

**Avoid:**
```javascript
// Avoid: Unclear naming and no error handling
function getStuff() {
  let x = process.uptime();
  let y = process.memoryUsage();
  return {s: 'ok', t: new Date(), u: x, m: y};
}
```

### File Structure

```
src/
├── server.js          # Main application entry point
├── middleware/        # Express middleware
├── routes/           # API route handlers
├── controllers/      # Business logic
├── services/         # External service integrations
├── utils/            # Utility functions
└── config/           # Configuration files
```

## Testing Guidelines

### Manual Testing

1. **Local testing**
   ```bash
   npm start
   curl http://localhost:3000
   curl http://localhost:3000/health
   ```

2. **Docker testing**
   ```bash
   docker build -t dixit-app-test .
   docker run -p 3000:3000 dixit-app-test
   ```

3. **Load testing**
   ```bash
   k6 run k6/test.js
   ```

### Test Coverage

- All new features should include appropriate tests
- Maintain or improve existing test coverage
- Test both happy path and error scenarios

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Test thoroughly**
   - Run the application locally
   - Test with Docker
   - Run load tests if applicable
   - Verify Kubernetes manifests if changed

3. **Update documentation**
   - Update README.md if needed
   - Add/update API documentation
   - Update CHANGELOG.md

### Submitting the Pull Request

1. **Push your branch**
   ```bash
   git push origin your-feature-branch
   ```

2. **Create the pull request**
   - Use a clear, descriptive title
   - Fill out the pull request template
   - Link any related issues
   - Add screenshots if UI changes are involved

3. **Pull request template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Other (please describe)
   
   ## Testing
   - [ ] Local testing completed
   - [ ] Docker testing completed
   - [ ] Load testing completed (if applicable)
   
   ## Checklist
   - [ ] Code follows the style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No new warnings introduced
   ```

### Review Process

1. **Automated checks**
   - CI/CD pipeline must pass
   - All status checks must be green

2. **Code review**
   - At least one maintainer approval required
   - Address all review comments
   - Update code as needed

3. **Merge**
   - Squash and merge is preferred
   - Delete feature branch after merge

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Environment information**
   - Node.js version
   - Operating system
   - Docker version (if applicable)

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Additional context**
   - Error messages
   - Log output
   - Any relevant configuration

### Feature Requests

When requesting features:

1. **Use case description**
   - What problem does it solve?
   - Who would benefit?

2. **Proposed solution**
   - How should it work?
   - Any implementation ideas?

3. **Alternatives considered**
   - Other approaches evaluated
   - Why this approach is preferred

### Issue Templates

Use the provided issue templates:
- Bug Report
- Feature Request
- Documentation Improvement
- Performance Issue

## Security Issues

**DO NOT** report security vulnerabilities in public issues.

Instead:
1. Email security@nibertinvestments.com
2. Include detailed description
3. Provide steps to reproduce
4. Allow time for investigation before disclosure

See [SECURITY.md](SECURITY.md) for more details.

## Development Resources

### Useful Commands

```bash
# Development
npm start                    # Start the application
npm install                 # Install dependencies

# Docker
docker build -t dixit-app . # Build image
docker run -p 3000:3000 dixit-app # Run container

# Kubernetes
kubectl apply -f k8s/       # Deploy to cluster
kubectl logs -f deployment/dixit-test-app # View logs

# Load Testing
k6 run k6/test.js          # Basic load test
k6 run k6/enhanced-test.js # Advanced load test
```

### Documentation

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [k6 Documentation](https://k6.io/docs/)

## Questions?

- Check existing [issues](https://github.com/nibertinvestments/dixit-app/issues)
- Review [documentation](README.md)
- Contact maintainers: dev@nibertinvestments.com

Thank you for contributing! 🎉