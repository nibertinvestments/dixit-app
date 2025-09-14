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
    'http_req_duration{endpoint:api_info}': ['p(95)<200'],
    'http_req_duration{endpoint:api_metrics}': ['p(95)<300'],
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
    'main endpoint returns JSON': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.message && data.app && data.version;
      } catch (e) {
        return false;
      }
    },
    'main endpoint has request ID': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.requestId && data.requestId.length > 0;
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);

  // Test health endpoint
  response = http.get(`${BASE}/health`, {
    tags: { endpoint: 'health' },
  });
  check(response, {
    'health endpoint status is 200': (r) => r.status === 200,
    'health endpoint returns healthy status': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.status === 'healthy';
      } catch (e) {
        return false;
      }
    },
    'health endpoint has memory info': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.memory && data.memory.rss && data.memory.heapUsed;
      } catch (e) {
        return false;
      }
    },
  });

  sleep(0.5);

  // Test API info endpoint
  response = http.get(`${BASE}/api/info`, {
    tags: { endpoint: 'api_info' },
  });
  check(response, {
    'api info endpoint status is 200': (r) => r.status === 200,
    'api info has features array': (r) => {
      try {
        const data = JSON.parse(r.body);
        return Array.isArray(data.features) && data.features.length > 0;
      } catch (e) {
        return false;
      }
    },
    'api info has endpoints object': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.endpoints && typeof data.endpoints === 'object';
      } catch (e) {
        return false;
      }
    },
  });

  sleep(0.5);

  // Test API metrics endpoint
  response = http.get(`${BASE}/api/metrics`, {
    tags: { endpoint: 'api_metrics' },
  });
  check(response, {
    'api metrics endpoint status is 200': (r) => r.status === 200,
    'api metrics has uptime info': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.uptime && data.uptime.seconds >= 0;
      } catch (e) {
        return false;
      }
    },
    'api metrics has platform info': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.platform && data.platform.nodeVersion;
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
      'sleep endpoint response correct': (r) => {
        try {
          const data = JSON.parse(r.body);
          return data.message === 'Slept 100ms' && data.duration === 100;
        } catch (e) {
          return false;
        }
      },
    });
  }

  // Test 404 handling occasionally
  if (Math.random() < 0.05) {
    response = http.get(`${BASE}/non-existent-endpoint`, {
      tags: { endpoint: '404' },
    });
    check(response, {
      '404 endpoint returns 404': (r) => r.status === 404,
      '404 endpoint returns error JSON': (r) => {
        try {
          const data = JSON.parse(r.body);
          return data.error === 'Endpoint not found';
        } catch (e) {
          return false;
        }
      },
    });
  }

  sleep(1);
}