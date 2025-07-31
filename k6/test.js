import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate==0'],
  },
};

const BASE = __ENV.APP_URL;  // now dynamic!

export default function () {
  const res = http.get(`${BASE}/`);
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}