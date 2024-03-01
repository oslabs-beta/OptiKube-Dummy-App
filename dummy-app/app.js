const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}...`);
});

let taskInterval;
let intensity = 1;

const calculatePrimeNumbers = (intensity) => {
    let primeCount = 0;
    let number = 1;
    // Will caclulate prime numbers based on intensity
    while (primeCount < intensity * 100) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                isPrime = false;
                break
            }
        }
        if (isPrime) {
            primeCount++
        }
        number++
    }
}
// Start task
app.get('/start', (req, res) => {
    // Will calculate prime numbers every second
    if (!taskInterval) {
        taskInterval = setInterval(() => calculatePrimeNumbers(intensity), 1000)
        res.send("Task started")
    } else {
        res.send("Task already running")
    }
});

// Stop the task
app.get('/stop', (req, res) => {
    // Stops calculating prime numbers by clearing taskInterval and then sets it to null to indicate no running task
    if (taskInterval) {
        clearInterval(taskInterval);
        taskInterval = null;
        res.send('Task stopped.');
    } else {
        res.send('Task is running.');
    }
});

// Adjust the task intensity
app.get('/adjust/:intensity', (req, res) => {
    const newIntensity = parseInt(req.params.intensity, 10);
    if (isNaN(newIntensity) || newIntensity < 1) {
        res.send('Please provide a positive integer as intensity.');
        return;
    }
    intensity = newIntensity;
    if (taskInterval) {
        clearInterval(taskInterval);
        taskInterval = setInterval(() => calculatePrimeNumbers(intensity), 1000);
    }
    res.send(`Task intensity adjusted to ${intensity}.`);
});