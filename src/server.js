const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
if (process.env.HELMET_ENABLED !== 'false') {
  app.use(helmet());
}

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  })
);

// Compression middleware
if (process.env.COMPRESSION_ENABLED !== 'false') {
  app.use(compression());
}

// Body parsing middleware
app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE || '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);

  // Add request ID to request object for potential use in other middleware
  req.requestId = requestId;

  console.log(
    `[${new Date().toISOString()}] [${requestId}] ${req.method} ${
      req.url
    } - START`
  );

  // Override res.end to log response time
  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - startTime;
    console.log(
      `[${new Date().toISOString()}] [${requestId}] ${req.method} ${
        req.url
      } - ${res.statusCode} - ${duration}ms`
    );
    originalEnd.apply(this, args);
  };

  next();
});

// API Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World from EKS CI/CD Demo!!',
    app: process.env.APP_NAME || 'Dixit App',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    requestId: req.requestId,
  });
});

app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)} seconds`,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`,
    },
    environment: process.env.NODE_ENV || 'development',
    app: process.env.APP_NAME || 'Dixit App',
    version: process.env.APP_VERSION || '1.0.0',
    requestId: req.requestId,
  });
});

app.get('/sleep', (req, res) => {
  const msParam = req.query.ms;
  const ms = parseInt(msParam);
  const maxSleep = 30000; // Maximum 30 seconds for safety

  // If no parameter provided, use default
  if (msParam === undefined) {
    const defaultMs = 1000;
    setTimeout(() => {
      res.json({
        message: `Slept ${defaultMs}ms`,
        duration: defaultMs,
        requestId: req.requestId,
      });
    }, defaultMs);
    return;
  }

  // Validate that ms is a valid number
  if (isNaN(ms) || ms < 0) {
    return res.status(400).json({
      error: 'Sleep duration must be a positive number',
      requestId: req.requestId,
    });
  }

  if (ms > maxSleep) {
    return res.status(400).json({
      error: `Sleep duration cannot exceed ${maxSleep}ms`,
      requestId: req.requestId,
    });
  }

  setTimeout(() => {
    res.json({
      message: `Slept ${ms}ms`,
      duration: ms,
      requestId: req.requestId,
    });
  }, ms);
});

// New API endpoints for demonstration
app.get('/api/info', (req, res) => {
  res.json({
    app: process.env.APP_NAME || 'Dixit App',
    version: process.env.APP_VERSION || '1.0.0',
    description: 'A production-ready Node.js Express application',
    features: [
      'AWS EKS deployment',
      'CI/CD with GitHub Actions',
      'Load testing with k6',
      'Health monitoring',
      'Security middleware',
      'Performance optimization',
    ],
    endpoints: {
      '/': 'Welcome message',
      '/health': 'Health check and metrics',
      '/sleep': 'Configurable delay endpoint',
      '/api/info': 'Application information',
      '/api/metrics': 'Performance metrics',
    },
    requestId: req.requestId,
  });
});

app.get('/api/metrics', (req, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();

  res.json({
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(process.uptime()),
      human: formatUptime(process.uptime()),
    },
    memory: {
      rss: memoryUsage.rss,
      heapUsed: memoryUsage.heapUsed,
      heapTotal: memoryUsage.heapTotal,
      external: memoryUsage.external,
      arrayBuffers: memoryUsage.arrayBuffers,
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system,
    },
    platform: {
      arch: process.arch,
      platform: process.platform,
      nodeVersion: process.version,
    },
    requestId: req.requestId,
  });
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(`[${new Date().toISOString()}] [${req.requestId}] Error:`, err);
  res.status(500).json({
    error: 'Internal Server Error',
    requestId: req.requestId,
    ...(process.env.NODE_ENV === 'development' && { details: err.message }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    method: req.method,
    url: req.url,
    requestId: req.requestId,
  });
});

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

const server = app.listen(port, () => {
  console.log(
    `🚀 ${process.env.APP_NAME || 'Dixit App'} listening at http://localhost:${port}`
  );
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 Version: ${process.env.APP_VERSION || '1.0.0'}`);
});

module.exports = { app, server };
