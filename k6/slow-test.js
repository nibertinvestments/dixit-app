import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '3m',             // must exceed your rule’s “for: 2m”
};

const BASE = __ENV.APP_URL || 'http://localhost:3000';

export default function () {
  // fire a request, then a client-side pause
  http.get(`${BASE}/`);  
  sleep(0.6);                   // each VU sleeps 600 ms → p95 > 0.5s
}