# Copilot Instructions for Dixit App

## Project Overview

Dixit App is a Node.js/Express.js application designed as a CI/CD demonstration for AWS EKS deployment. The application showcases modern DevOps practices including containerization, Kubernetes orchestration, performance testing, and monitoring.

### Core Architecture
- **Backend**: Express.js server with RESTful endpoints
- **Infrastructure**: AWS EKS (Elastic Kubernetes Service)
- **CI/CD**: GitHub Actions with automated deployment pipeline
- **Monitoring**: Prometheus alerting and performance regression detection
- **Load Testing**: k6 performance testing framework

## Directory Structure

```
dixit-app/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD pipeline configuration
├── alerts/
│   └── performance-regression.yaml  # Prometheus alerting rules
├── k6/
│   ├── test.js                  # Load testing scripts
│   └── slow-test.js            # Performance regression tests
├── k8s/
│   ├── deployment.yaml         # Kubernetes deployment configuration
│   └── service.yaml           # Kubernetes service configuration
├── src/
│   └── server.js              # Main Express.js application
├── Dockerfile                 # Container image definition
├── package.json              # Node.js dependencies and scripts
└── README.md                 # Project documentation
```

## Current Functionality

### Application Endpoints
- `GET /` - Returns welcome message
- `GET /sleep?ms=<milliseconds>` - Configurable delay endpoint for testing

### DevOps Features
- Automated Docker image building and pushing to ECR
- EKS deployment with rolling updates
- Load balancer service for external access
- Performance monitoring with Prometheus alerts
- Automated load testing with k6

## Development Guidelines

### Coding Standards
- Use modern JavaScript ES6+ features
- Follow Express.js best practices
- Implement proper error handling
- Use environment variables for configuration
- Write self-documenting code with meaningful variable names

### Data Structure Best Practices
- Use appropriate HTTP status codes
- Implement consistent JSON response formats
- Validate input parameters
- Handle edge cases gracefully

### Documentation Standards
- Keep README.md updated with any changes
- Document API endpoints with examples
- Include setup and deployment instructions
- Comment complex business logic

### Workflow Best Practices
- Use feature branches for development
- Write descriptive commit messages
- Test changes locally before pushing
- Review CI/CD pipeline results

## Cool Tasks & Enhancement Opportunities

### 🚀 Backend Development Tasks

#### Beginner Level
1. **Health Check Endpoint**
   - Add `/health` endpoint for Kubernetes readiness/liveness probes
   - Include system status, memory usage, and uptime

2. **Request Logging Middleware**
   - Implement structured logging with request ID tracking
   - Log request/response times and status codes

3. **Environment Configuration**
   - Create config management system using environment variables
   - Add development/staging/production environment support

4. **Input Validation**
   - Add request validation middleware
   - Implement parameter sanitization for the `/sleep` endpoint

#### Intermediate Level
5. **Metrics Endpoint**
   - Add `/metrics` endpoint for Prometheus scraping
   - Implement custom application metrics (request counts, response times)

6. **Rate Limiting**
   - Implement rate limiting middleware to prevent abuse
   - Add configurable limits per endpoint

7. **Graceful Shutdown**
   - Implement proper shutdown handling for Kubernetes
   - Handle SIGTERM signals gracefully

8. **Database Integration**
   - Add PostgreSQL or MongoDB integration
   - Implement user session storage or game state persistence

#### Advanced Level
9. **WebSocket Support**
   - Add real-time communication capabilities
   - Implement game room functionality for Dixit gameplay

10. **Caching Layer**
    - Implement Redis caching for frequently accessed data
    - Add cache invalidation strategies

11. **Authentication & Authorization**
    - Implement JWT-based authentication
    - Add role-based access control (RBAC)

12. **API Versioning**
    - Implement versioned API endpoints
    - Add backward compatibility support

### 🛠 Infrastructure & DevOps Tasks

#### Beginner Level
13. **Docker Optimization**
    - Implement multi-stage Docker builds
    - Reduce image size using Alpine base images

14. **Environment Variables Management**
    - Create Kubernetes ConfigMaps and Secrets
    - Implement environment-specific configurations

15. **Basic Monitoring**
    - Add application logs to CloudWatch
    - Set up basic CPU/memory alerts

#### Intermediate Level
16. **Blue-Green Deployment**
    - Implement blue-green deployment strategy
    - Add automated rollback capabilities

17. **Database Migration**
    - Add database schema migration support
    - Implement automated migration in CI/CD pipeline

18. **Security Scanning**
    - Add container vulnerability scanning
    - Implement dependency security auditing

19. **Resource Management**
    - Add resource limits and requests to Kubernetes manifests
    - Implement horizontal pod autoscaling (HPA)

#### Advanced Level
20. **Service Mesh**
    - Implement Istio service mesh for advanced traffic management
    - Add circuit breakers and retry policies

21. **GitOps Workflow**
    - Implement ArgoCD for GitOps deployment
    - Add automated configuration drift detection

22. **Multi-Environment Pipeline**
    - Create staging and production environments
    - Implement promotion-based deployment workflow

### 🧪 Testing & Quality Assurance

#### Beginner Level
23. **Unit Testing**
    - Add Jest or Mocha testing framework
    - Implement unit tests for all endpoints

24. **Integration Testing**
    - Add supertest for API integration testing
    - Test database interactions

25. **Linting & Formatting**
    - Add ESLint and Prettier configuration
    - Implement pre-commit hooks

#### Intermediate Level
26. **End-to-End Testing**
    - Add Playwright or Cypress for E2E testing
    - Test complete user workflows

27. **Performance Testing Enhancement**
    - Extend k6 tests with realistic scenarios
    - Add performance benchmarking and reporting

28. **Test Coverage**
    - Implement test coverage reporting
    - Set minimum coverage thresholds

#### Advanced Level
29. **Chaos Engineering**
    - Implement chaos testing with tools like Chaos Monkey
    - Test application resilience under failure conditions

30. **Load Testing in CI/CD**
    - Add performance regression detection
    - Implement automated performance benchmarking

### 📊 Monitoring & Observability

#### Beginner Level
31. **Application Metrics**
    - Add custom business metrics
    - Implement request duration histograms

32. **Error Tracking**
    - Integrate with Sentry or similar error tracking service
    - Add error rate monitoring

#### Intermediate Level
33. **Distributed Tracing**
    - Implement OpenTelemetry tracing
    - Add trace correlation across services

34. **Log Aggregation**
    - Set up centralized logging with ELK stack
    - Implement structured logging with correlation IDs

#### Advanced Level
35. **Custom Dashboards**
    - Create Grafana dashboards for application metrics
    - Implement SLI/SLO monitoring

36. **Predictive Monitoring**
    - Implement anomaly detection for performance metrics
    - Add capacity planning dashboards

### 🎮 Game-Specific Features

#### Beginner Level
37. **Game State Management**
    - Implement basic game state storage
    - Add player session management

38. **Card Management**
    - Create card deck management system
    - Implement card dealing and shuffling logic

#### Intermediate Level
39. **Real-time Game Updates**
    - Implement WebSocket-based game updates
    - Add player action broadcasting

40. **Game Room Management**
    - Create multi-room support
    - Implement room creation and joining logic

#### Advanced Level
41. **AI Integration**
    - Add AI-powered card description generation
    - Implement intelligent game suggestions

42. **Analytics & Insights**
    - Track game statistics and player behavior
    - Implement game balance analytics

## Best Practices Implementation

### Code Quality
- Use TypeScript for better type safety
- Implement comprehensive error handling
- Follow SOLID principles
- Use dependency injection for better testability

### Security
- Implement input validation and sanitization
- Use HTTPS everywhere
- Implement proper CORS policies
- Regular security audits and updates

### Performance
- Implement response compression
- Use connection pooling for databases
- Implement efficient caching strategies
- Monitor and optimize query performance

### Scalability
- Design for horizontal scaling
- Implement stateless services
- Use message queues for async processing
- Plan for multi-region deployment

## Getting Started with Tasks

1. **Choose a task** based on your skill level and interests
2. **Create a feature branch** for your work
3. **Review existing code** to understand the current architecture
4. **Write tests first** (TDD approach recommended)
5. **Implement the feature** following the coding standards
6. **Test thoroughly** in local environment
7. **Update documentation** as needed
8. **Submit a pull request** with clear description

## Useful Commands

```bash
# Development
npm install                    # Install dependencies
npm start                     # Start the application
npm test                      # Run tests (when implemented)

# Docker
docker build -t dixit-app .   # Build container image
docker run -p 3000:3000 dixit-app  # Run container locally

# Kubernetes (when kubectl is configured)
kubectl apply -f k8s/         # Deploy to Kubernetes
kubectl get pods              # Check pod status
kubectl logs -f <pod-name>    # View logs

# Load Testing
k6 run k6/test.js            # Run load tests
k6 run k6/slow-test.js       # Run performance regression test
```

## Resources & References

- [Express.js Documentation](https://expressjs.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [AWS EKS User Guide](https://docs.aws.amazon.com/eks/)
- [k6 Performance Testing](https://k6.io/docs/)
- [Prometheus Monitoring](https://prometheus.io/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## Contributing

When working on any of these tasks:
1. Ensure all existing functionality continues to work
2. Add appropriate tests for new features
3. Update this documentation if you add new capabilities
4. Follow the existing code style and conventions
5. Consider the impact on the CI/CD pipeline

Happy coding! 🚀