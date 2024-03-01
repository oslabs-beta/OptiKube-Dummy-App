import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 40 }, // start with high load
        { duration: '2m', target: 0 },  // scale down to 0 users over 2 minutes
    ],
};

export default function () {
    // Initially, you might want to hit the `/adjust/:intensity` with high intensity
    // and then reduce the intensity over time or directly use `/stop` to simulate stopping the load
    http.get(`http://localhost:3000/stop`);
    sleep(1);
}