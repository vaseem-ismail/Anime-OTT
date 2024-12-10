document.addEventListener("DOMContentLoaded", () => {
    const actionContainer = document.getElementById("action-movie-images");

    if (!actionContainer) {
        console.error('Element with id "action-movie-images" not found.');
        return;
    }

    // Fetch JSON data
    fetch('../images.json') // Adjust path to match your file location
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const actionMovies = data['Horror']; // Get only "Action" category

            if (!actionMovies || actionMovies.length === 0) {
                console.warn('No action movies found in the JSON data.');
                return;
            }

            actionMovies.forEach(movie => {
                // Create an image element for each action movie
                const img = document.createElement('img');
                img.src = movie['image-url'];
                img.alt = movie.name;
                img.classList.add('movie-image'); // Add a class for styling
                img.addEventListener('click', () => {
                    localStorage.setItem('selectedImageName', movie.name); // Store name in localStorage
                    window.location.href = '../details.html'; // Navigate to details page
                });
                // Append the image to the container
                actionContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching or processing JSON data:', error));
});
