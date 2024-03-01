import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 75 }, // ramp up to 50 users over 10 seconds
        { duration: '1m', target: 75 }, // stay at 50 users for 3 minutes
    ],
};

export default function () {
    // Adjust the intensity periodically within your test or based on some logic
    let intensity = Math.floor(Math.random() * 10) + 1; // Random intensity between 1 and 10
    http.get(`http://localhost:3000/adjust/${intensity}`);
    sleep(1);
}