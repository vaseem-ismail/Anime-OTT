const fetch = require("node-fetch");

async function fetchImageData(imageName) {
    if (!imageName) {
        console.error("Please provide an image name.");
        return;
    }

    try {
        // Make a GET request to the Flask backend
        const response = await fetch(`http://127.0.0.1:5000/get-image?name=${encodeURIComponent(imageName)}`);
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            const errorData = contentType.includes("application/json")
                ? await response.json()
                : await response.text(); // Fallback for HTML error pages
            console.error("Error:", errorData);
            return;
        }

        if (contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Image Data:", data);
        } else {
            const data = await response.text();
            console.error("Unexpected response:", data);
        }
    } catch (error) {
        console.error("Error fetching image data:", error);
    }
}

// Call the function with the image name (example usage)
const imageName = process.argv[2]; // Pass the image name as a command-line argument
fetchImageData(imageName);
