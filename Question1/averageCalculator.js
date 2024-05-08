const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;
let numbers = [];

// Function to calculate average of numbers
function calculateAverage(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
}

// Middleware to handle requests
app.use(express.json());

// Route to handle requests for numbers
app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    let response = {
        windowPrevState: [],
        windowCurrState: [],
        numbers: [],
        avg: 0
    };

    try {
        const fetchUrl = `http://20.244.56.144/test/${numberid}`;
        const fetchResponse = await axios.get(fetchUrl);

        console.log("Response Status:", fetchResponse.status);
        console.log("Response Data:", fetchResponse.data);

        // Ensure status code is in the 200-299 range
        if (fetchResponse.status >= 200 && fetchResponse.status < 300) {
            const fetchedNumbers = fetchResponse.data.numbers;

            // Filter out duplicates
            const uniqueNumbers = fetchedNumbers.filter(num => !numbers.includes(num));

            // Update numbers array
            numbers = [...numbers, ...uniqueNumbers].slice(-windowSize);

            // Update response object
            response.windowPrevState = [...numbers];
            response.windowCurrState = [...numbers];
            response.numbers = [...fetchedNumbers];
            response.avg = calculateAverage(numbers);

            res.json(response);
        } else {
            // Handle non-success status codes
            res.status(fetchResponse.status).send(fetchResponse.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
