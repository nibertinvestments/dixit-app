# Dixit App

[![Build & Deploy](https://github.com/nibertinvestments/dixit-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/nibertinvestments/dixit-app/actions/workflows/deploy.yml)
[![Node.js Version](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](Dockerfile)

A production-ready Node.js Express application demonstrating modern DevOps practices including CI/CD deployment on AWS EKS, automated testing, monitoring, and scalability features.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Monitoring](#-monitoring)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

- **Modern Node.js**: Built with Express.js and Node.js 18+
- **Cloud Native**: Containerized with Docker and Kubernetes manifests
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **AWS EKS Integration**: Production deployment on Amazon Elastic Kubernetes Service
- **Load Testing**: Integrated k6 performance testing
- **Health Monitoring**: Built-in health checks and observability
- **Request Logging**: Comprehensive request/response logging with unique request IDs
- **Security Middleware**: Helmet.js for security headers, CORS configuration
- **Performance**: Gzip compression and configurable request limits
- **Error Handling**: Comprehensive error handling with request tracking
- **Metrics Collection**: Detailed system and performance metrics
- **Graceful Shutdown**: SIGTERM and SIGINT handling
- **Scalability**: Horizontal scaling support with Kubernetes

## 🏗️ Architecture

This application follows a microservices architecture designed for cloud-native deployment:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub        │    │   AWS ECR       │    │   AWS EKS       │
│   Repository    │───▶│   Container     │───▶│   Kubernetes    │
│                 │    │   Registry      │    │   Cluster       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         ▼                                              ▼
┌─────────────────┐                            ┌─────────────────┐
│   GitHub        │                            │   Load Balancer │
│   Actions       │                            │   & Service     │
│   CI/CD         │                            │                 │
└─────────────────┘                            └─────────────────┘
```

### Technology Stack

- **Runtime**: Node.js 18+ (Alpine Linux)
- **Framework**: Express.js 4.18+
- **Container**: Docker with multi-stage builds
- **Orchestration**: Kubernetes (AWS EKS)
- **CI/CD**: GitHub Actions with OIDC
- **Registry**: Amazon ECR
- **Load Testing**: k6
- **Monitoring**: Built-in health endpoints

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (for containerization)
- kubectl (for Kubernetes deployment)
- AWS CLI (for cloud deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/nibertinvestments/dixit-app.git
   cd dixit-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Verify the application**
   ```bash
   curl http://localhost:3000
   # Expected: "Hello World from EKS CI/CD Demo!!"
   
   curl http://localhost:3000/health
   # Expected: JSON health status
   ```

The application will be available at `http://localhost:3000`.

## 💻 Development

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3000` | No |
| `NODE_ENV` | Environment | `development` | No |
| `APP_NAME` | Application name | `Dixit App` | No |
| `APP_VERSION` | Application version | `1.0.0` | No |
| `HELMET_ENABLED` | Enable Helmet security middleware | `true` | No |
| `CORS_ORIGIN` | CORS allowed origins | `*` | No |
| `CORS_CREDENTIALS` | Enable CORS credentials | `false` | No |
| `COMPRESSION_ENABLED` | Enable gzip compression | `true` | No |
| `MAX_REQUEST_SIZE` | Maximum request body size | `10mb` | No |

### Development Scripts

```bash
# Start the application
npm start

# Install dependencies
npm install

# Build Docker image
docker build -t dixit-app .

# Run with Docker
docker run -p 3000:3000 dixit-app
```

### Code Structure

```
src/
├── server.js          # Main application server
├── middleware/        # Custom middleware (future)
├── routes/           # API routes (future)
└── utils/            # Utility functions (future)

k8s/
├── deployment.yaml   # Kubernetes deployment
└── service.yaml      # Kubernetes service

k6/
├── test.js          # Basic load test
├── enhanced-test.js # Advanced load test
└── slow-test.js     # Slow endpoint test

.github/
└── workflows/
    └── deploy.yml   # CI/CD pipeline
```

## 🚀 Deployment

### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t dixit-app:latest .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 3000:3000 --name dixit-app dixit-app:latest
   ```

### Kubernetes Deployment

1. **Apply manifests**
   ```bash
   kubectl apply -f k8s/
   ```

2. **Check deployment status**
   ```bash
   kubectl rollout status deployment/dixit-test-app
   ```

3. **Get service URL**
   ```bash
   kubectl get svc dixit-test-app-svc
   ```

### AWS EKS Deployment

The application automatically deploys to AWS EKS when code is pushed to the `main` branch. The CI/CD pipeline:

1. Builds Docker image
2. Pushes to Amazon ECR
3. Deploys to EKS cluster
4. Runs load tests
5. Sets up monitoring alerts

**Required Secrets:**
- `AWS_ROLE_TO_ASSUME`: AWS IAM role ARN for OIDC
- `AWS_REGION`: AWS region for deployment
- `ECR_REGISTRY`: ECR registry URL
- `EKS_CLUSTER_NAME`: Name of the EKS cluster

## 📚 API Documentation

### Endpoints

#### `GET /`
Returns a welcome message with application information.

**Response:**
```json
{
  "message": "Hello World from EKS CI/CD Demo!!",
  "app": "Dixit App",
  "version": "1.0.0",
  "environment": "development",
  "requestId": "abc123def456"
}
```

#### `GET /health`
Returns application health status and comprehensive metrics.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": "3600 seconds",
  "memory": {
    "rss": "25 MB",
    "heapUsed": "15 MB",
    "heapTotal": "20 MB",
    "external": "2 MB"
  },
  "environment": "development",
  "app": "Dixit App",
  "version": "1.0.0",
  "requestId": "abc123def456"
}
```

#### `GET /sleep?ms=1000`
Test endpoint that sleeps for specified milliseconds.

**Parameters:**
- `ms` (optional): Sleep duration in milliseconds (default: 1000, max: 30000)

**Response:**
```json
{
  "message": "Slept 1000ms",
  "duration": 1000,
  "requestId": "abc123def456"
}
```

**Error Response (duration too long):**
```json
{
  "error": "Sleep duration cannot exceed 30000ms",
  "requestId": "abc123def456"
}
```

#### `GET /api/info`
Returns comprehensive application information and available endpoints.

**Response:**
```json
{
  "app": "Dixit App",
  "version": "1.0.0",
  "description": "A production-ready Node.js Express application",
  "features": [
    "AWS EKS deployment",
    "CI/CD with GitHub Actions",
    "Load testing with k6",
    "Health monitoring",
    "Security middleware",
    "Performance optimization"
  ],
  "endpoints": {
    "/": "Welcome message",
    "/health": "Health check and metrics",
    "/sleep": "Configurable delay endpoint",
    "/api/info": "Application information",
    "/api/metrics": "Performance metrics"
  },
  "requestId": "abc123def456"
}
```

#### `GET /api/metrics`
Returns detailed performance metrics and system information.

**Response:**
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": {
    "seconds": 3600,
    "human": "1h 0m 0s"
  },
  "memory": {
    "rss": 26214400,
    "heapUsed": 15728640,
    "heapTotal": 20971520,
    "external": 2097152,
    "arrayBuffers": 0
  },
  "cpu": {
    "user": 1000000,
    "system": 500000
  },
  "platform": {
    "arch": "x64",
    "platform": "linux",
    "nodeVersion": "v18.19.0"
  },
  "requestId": "abc123def456"
}
```

### Request Logging

All requests are logged with:
- Unique request ID
- Timestamp
- HTTP method and URL
- Response status code
- Response time in milliseconds

Example log:
```
[2024-01-15T10:30:00.000Z] [abc123def456] GET / - START
[2024-01-15T10:30:00.001Z] [abc123def456] GET / - 200 - 1ms
```

### Error Handling

The application includes comprehensive error handling:

- **Request ID Tracking**: All errors include the unique request ID for tracing
- **Development Mode**: Detailed error messages in development environment
- **Production Mode**: Sanitized error responses in production
- **404 Handling**: Structured responses for non-existent endpoints
- **Graceful Shutdown**: Proper cleanup on SIGTERM and SIGINT signals

**Error Response Format:**
```json
{
  "error": "Error description",
  "requestId": "abc123def456",
  "method": "GET",
  "url": "/nonexistent"
}
```

### OpenAPI Specification

The API follows RESTful principles and can be documented using OpenAPI 3.0 specification:

```yaml
openapi: 3.0.0
info:
  title: Dixit App API
  description: A production-ready Node.js Express application
  version: 1.0.0
servers:
  - url: http://localhost:3000
    description: Development server
paths:
  /:
    get:
      summary: Welcome message
      responses:
        '200':
          description: Application welcome message
  /health:
    get:
      summary: Health check
      responses:
        '200':
          description: Application health status
  /api/info:
    get:
      summary: Application information
      responses:
        '200':
          description: Comprehensive application details
  /api/metrics:
    get:
      summary: Performance metrics
      responses:
        '200':
          description: System performance metrics
```

## 🧪 Testing

### Load Testing with k6

The application includes comprehensive load testing using k6:

1. **Basic load test**
   ```bash
   k6 run k6/test.js
   ```

2. **Enhanced load test with multiple scenarios**
   ```bash
   k6 run k6/enhanced-test.js
   ```

3. **Slow endpoint testing**
   ```bash
   k6 run k6/slow-test.js
   ```

### Performance Thresholds

- 95th percentile response time: < 500ms
- Error rate: 0%
- Concurrent users: Up to 50
- Test duration: 30 seconds

## 📊 Monitoring

### Health Checks

- **Readiness Probe**: `/health` endpoint checked every 10s
- **Liveness Probe**: `/health` endpoint checked every 20s
- **Startup Delay**: 5s for readiness, 15s for liveness

### Metrics Available

- Application uptime
- Memory usage (RSS, heap used, heap total)
- Request/response logging with timing
- Environment information

### Performance Alerts

Configured alerts for:
- Response time degradation
- Error rate increases  
- Memory usage spikes
- Pod restart frequency

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: [support@nibertinvestments.com](mailto:support@nibertinvestments.com)
- 🐛 Issues: [GitHub Issues](https://github.com/nibertinvestments/dixit-app/issues)
- 📖 Documentation: [Wiki](https://github.com/nibertinvestments/dixit-app/wiki)

---

**Built with ❤️ by the Nibert Investments Team**
