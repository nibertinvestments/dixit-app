import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users
    { duration: '60s', target: 50 },  // Stay at 50 users
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
    'http_req_duration{endpoint:health}': ['p(95)<100'], // Health check should be fast
    'http_req_duration{endpoint:main}': ['p(95)<500'],
  },
};

const BASE = __ENV.APP_URL || 'http://localhost:3000';

export default function () {
  // Test main endpoint
  let response = http.get(`${BASE}/`, {
    tags: { endpoint: 'main' },
  });
  check(response, {
    'main endpoint status is 200': (r) => r.status === 200,
    'main endpoint contains welcome message': (r) => r.body.includes('Hello World'),
  });

  sleep(1);

  // Test health endpoint
  response = http.get(`${BASE}/health`, {
    tags: { endpoint: 'health' },
  });
  check(response, {
    'health endpoint status is 200': (r) => r.status === 200,
    'health endpoint returns JSON': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.status === 'healthy';
      } catch (e) {
        return false;
      }
    },
  });

  sleep(0.5);

  // Occasionally test sleep endpoint with short delay
  if (Math.random() < 0.1) {
    response = http.get(`${BASE}/sleep?ms=100`, {
      tags: { endpoint: 'sleep' },
    });
    check(response, {
      'sleep endpoint status is 200': (r) => r.status === 200,
      'sleep endpoint response correct': (r) => r.body === 'Slept 100ms',
    });
  }

  sleep(1);
}