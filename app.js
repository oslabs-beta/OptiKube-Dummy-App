const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}...`);
});


// This intensity will help dictate how many prime numbers are caclulated.
let intensity = 1;
let isRunning = false;

// CPU Intensive process - this will be the main operation for our dummy app.
const calculatePrimeNumbers = () => {
    // These variables will be availabel using closure.
    let primeCount = 0;
    let number = 1;
    // Target is caclulated based on the current intensity
    let target = intensity * 100;

    const calculate = () => {
        // Check and stop the calculation if running.
        if (!isRunning) return;
        // Assumes the number is prime until told otherwise.
        let isPrime = true;
        // Iterate through numbers starting a 2 the smallest prime number and the sqaure root of current number.
        // This is because in this range a number because if a number has no divsors other than 1 and itself --> prime.
        for (let i = 2; i <= Math.sqrt(number); i++) {
            // If the number modulo i is 0 would indicate it's not prime as their is a divisor.
            if (number % i === 0) {
                isPrime = false;
                break;
            }
        }
        // Increment number for next prime number calculation.
        number++;
        // If the number is prime (indicated by the isPrime flag) increase the primecount.
        if (isPrime) primeCount++;

        // The caclulation will use recursion to call the next calculation of a prime number if the target has not been reached.
        if (primeCount < target) {
            // use setImmediate to avoid callstack overflow and blocking other requests to the server.
            // This will put the next call of calculate on the event queue. From there the event loop is able to pick up new events. 
            setImmediate(calculate)
        } else {
            // if the target equals the prime count then restart the caclulcation after 1 second pause.
            console.log(`Reached ${target} prime numbers at intensity ${intensity}`);
            setTimeout(calculatePrimeNumbers, 1000); // Restart calculation every second
        }
    }
}

// Start task endpoint.
app.get('/start', (req, res) => {
    // Check if task if already running.
    if (!isRunning) {
        // When started set isRunning to true.
        isRunning = true;
        // Invoke caclulatePrimeNumbers.
        calculatePrimeNumbers();
        res.send("Task started.");
    } else {
        res.send("Task already running.");
    }
});

// Stop the task endpoint.
app.get('/stop', (req, res) => {
    // Sets isRunning to false stopping the calculation at the next cycle.
    // This might take a while as the numbers get larger.
    isRunning = false;
    res.send('Task stopped.');
});

// Adjust the task intensity
app.get('/adjust/:intensity', (req, res) => {
    const newIntensity = parseInt(req.params.intensity, 10);
    if (isNaN(newIntensity) || newIntensity < 1) {
        res.send('Please provide a positive integer as intensity.');
    } else {
        intensity = newIntensity;
        res.send(`Task intensity adjusted to ${intensity}.`);
    }
});