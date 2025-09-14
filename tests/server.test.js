const request = require('supertest');
const { app, server } = require('../src/server');

describe('Dixit App', () => {
  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should return welcome message with app info', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('app');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('requestId');
      expect(response.body.message).toBe('Hello World from EKS CI/CD Demo!!');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('requestId');
      
      // Check memory properties
      expect(response.body.memory).toHaveProperty('rss');
      expect(response.body.memory).toHaveProperty('heapUsed');
      expect(response.body.memory).toHaveProperty('heapTotal');
      expect(response.body.memory).toHaveProperty('external');
    });
  });

  describe('GET /sleep', () => {
    it('should sleep for default 1000ms', async () => {
      const startTime = Date.now();
      const response = await request(app).get('/sleep');
      const endTime = Date.now();
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Slept 1000ms');
      expect(response.body).toHaveProperty('duration', 1000);
      expect(response.body).toHaveProperty('requestId');
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
    });

    it('should sleep for specified duration', async () => {
      const sleepTime = 500;
      const startTime = Date.now();
      const response = await request(app).get(`/sleep?ms=${sleepTime}`);
      const endTime = Date.now();
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', `Slept ${sleepTime}ms`);
      expect(response.body).toHaveProperty('duration', sleepTime);
      expect(endTime - startTime).toBeGreaterThanOrEqual(sleepTime);
    });

    it('should reject excessive sleep duration', async () => {
      const response = await request(app).get('/sleep?ms=50000');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Sleep duration cannot exceed');
    });
  });

  describe('GET /api/info', () => {
    it('should return application information', async () => {
      const response = await request(app).get('/api/info');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('app');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('features');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body).toHaveProperty('requestId');
      expect(Array.isArray(response.body.features)).toBe(true);
      expect(typeof response.body.endpoints).toBe('object');
    });
  });

  describe('GET /api/metrics', () => {
    it('should return performance metrics', async () => {
      const response = await request(app).get('/api/metrics');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('cpu');
      expect(response.body).toHaveProperty('platform');
      expect(response.body).toHaveProperty('requestId');
      
      // Check uptime structure
      expect(response.body.uptime).toHaveProperty('seconds');
      expect(response.body.uptime).toHaveProperty('human');
      
      // Check memory structure
      expect(response.body.memory).toHaveProperty('rss');
      expect(response.body.memory).toHaveProperty('heapUsed');
      expect(response.body.memory).toHaveProperty('heapTotal');
      
      // Check platform structure
      expect(response.body.platform).toHaveProperty('arch');
      expect(response.body.platform).toHaveProperty('platform');
      expect(response.body.platform).toHaveProperty('nodeVersion');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app).get('/non-existent');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Endpoint not found');
      expect(response.body).toHaveProperty('method', 'GET');
      expect(response.body).toHaveProperty('url', '/non-existent');
      expect(response.body).toHaveProperty('requestId');
    });
  });
});