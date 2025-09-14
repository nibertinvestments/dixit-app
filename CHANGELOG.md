# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation suite
- Industry-standard README.md with badges and detailed sections
- Contributing guidelines (CONTRIBUTING.md)
- Code of Conduct (CODE_OF_CONDUCT.md)
- Security policy (SECURITY.md)
- Detailed API documentation
- Architecture diagrams and explanations

### Changed
- Enhanced README.md with comprehensive project information
- Improved project structure documentation

## [1.0.0] - 2024-01-15

### Added
- Initial release of Dixit App
- Node.js Express application with basic endpoints
- Health check endpoint with detailed metrics
- Request logging middleware with unique request IDs
- Sleep endpoint for testing purposes
- Docker containerization support
- Kubernetes deployment manifests
- AWS EKS CI/CD pipeline with GitHub Actions
- Amazon ECR integration for container registry
- k6 load testing suite with multiple test scenarios
- Performance monitoring and alerting setup
- OIDC authentication for AWS services
- Production-ready security configurations

### Features
- **Main Endpoint (`/`)**: Returns welcome message
- **Health Endpoint (`/health`)**: Comprehensive health status with:
  - Application uptime
  - Memory usage statistics (RSS, heap used, heap total)
  - Environment information
  - ISO timestamp
- **Sleep Endpoint (`/sleep`)**: Configurable delay for testing
- **Request Logging**: Automatic logging with:
  - Unique request IDs
  - Start/end timestamps
  - Response times
  - HTTP status codes

### Infrastructure
- **Docker**: Multi-stage build with Node.js 18 Alpine
- **Kubernetes**: Production-ready manifests with:
  - Deployment with 2 replicas
  - Service with LoadBalancer
  - Health checks (readiness and liveness probes)
  - Resource limits and requests
- **CI/CD**: GitHub Actions workflow with:
  - Automated testing
  - Docker image building
  - ECR registry push
  - EKS deployment
  - Load testing validation
  - Performance regression detection

### Testing
- **k6 Load Tests**:
  - Basic load test: 50 VUs for 30 seconds
  - Enhanced test: Multiple scenarios and user profiles
  - Slow endpoint test: Network latency simulation
  - Performance thresholds: <500ms p95, 0% error rate

### Monitoring
- **Health Checks**: Built-in readiness and liveness probes
- **Metrics**: Memory usage, uptime, response times
- **Alerting**: Performance regression detection
- **Logging**: Structured request/response logging

### Security
- **OIDC Integration**: Secure AWS authentication
- **Container Security**: Non-root user, minimal attack surface
- **Network Security**: Kubernetes network policies ready
- **Secrets Management**: GitHub secrets for sensitive data

---

## Release Notes Format

### Types of Changes
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

### Version Numbering
This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Links
- [Unreleased]: Compare with latest release
- [1.0.0]: Initial release tag