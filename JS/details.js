document.addEventListener('DOMContentLoaded', async () => {
    const selectedImageName = localStorage.getItem('selectedImageName');
    if (!selectedImageName) {
        document.body.innerHTML = '<p>No image selected. Please go back and select an image.</p>';
        return;
    }

    try {
        const response = await fetch('../images.json'); // Adjust the path
        const data = await response.json();

        // Search for the selected image's details
        const categories = Object.values(data); // Get all categories
        let imageDetails = null;

        for (const category of categories) {
            imageDetails = category.find(item => item.name === selectedImageName);
            if (imageDetails) break;
        }

        if (imageDetails) {
            // Populate the page with details
            const container = document.getElementById('details-container');
            container.innerHTML = `
                <img src="${imageDetails['image-url']}" alt="${imageDetails.name}" class="img">
                <h1>${imageDetails.name}</h1>
                <p id="genre"> ${imageDetails.genre}</p>
                <p id="description"> ${imageDetails.description}</p>
                <p id="season"> ${imageDetails['total-seasons']}</p>
                <p id="year"> ${imageDetails['released-year']}</p>
            `;
        } else {
            document.body.innerHTML = '<p>Details not found for the selected image.</p>';
        }
    } catch (error) {
        console.error('Error fetching or processing JSON data:', error);
        document.body.innerHTML = '<p>Error loading details. Please try again later.</p>';
    }
});
