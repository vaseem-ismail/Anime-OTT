import fetch from 'node-fetch';
import readline from 'readline';

// Set up a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to fetch the video and console log Base64
async function fetchVideo(query) {
    try {
        const response = await fetch('http://127.0.0.1:5000/fetch-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch video.');
        }

        const result = await response.json();
        console.log('Filename:', result.filename);
        console.log('Base64 Data:', result.base64);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        rl.close();
    }
}

// Prompt the user for a MongoDB query
rl.question('Enter your MongoDB query as JSON: ', (input) => {
    try {
        const query = JSON.parse(input); // Parse the input to JSON
        fetchVideo(query); // Fetch the video with the given query
    } catch (err) {
        console.error('Invalid JSON input. Please try again.');
        rl.close();
    }
});
