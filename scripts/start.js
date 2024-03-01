import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 20 }, // ramp up to 20 users over 1 minute
        { duration: '3m', target: 20 }, // stay at 20 users for 3 minutes
    ],
};

export default function () {
    http.get('http://localhost:3000/start');
    sleep(1);
}