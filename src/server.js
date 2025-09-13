const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);
  
  // Add request ID to request object for potential use in other middleware
  req.requestId = requestId;
  
  console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.url} - START`);
  
  // Override res.end to log response time
  const originalEnd = res.end;
  res.end = function(...args) {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    originalEnd.apply(this, args);
  };
  
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World from EKS CI/CD Demo!!');
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
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/sleep', (req, res) => {
  const ms = parseInt(req.query.ms) || 1000;
  setTimeout(() => res.send(`Slept ${ms}ms`), ms);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
