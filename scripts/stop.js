import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 1 }, // use 1 user to send stop command
    ],
};

export default function () {
    http.get('http://localhost:3000/stop');
    sleep(1);
}