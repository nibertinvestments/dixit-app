import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '3m',             // must exceed your rule’s “for: 2m”
};

export default function () {
  // fire a request, then a client-side pause
  http.get(`http://ac3bee50bd73c4dd3b06e035853a1df3-404924170.us-east-2.elb.amazonaws.com:9090/`);  
  sleep(0.6);                   // each VU sleeps 600 ms → p95 > 0.5s
}