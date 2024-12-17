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

const episodeCount = [
    {"Naruto Shippuden" : 500, "url-value" : "Naruto_Ship_", "name" : "Episode-"},
    {"Naruto Classic" : 220, "url-value" : "Naruto-Classic-", "name" : "Episode-"},
    {"Attack on Titan" : 59, "url-value" : "Attack-on-Titan-", "name" : "Episode-"},
    {"Jujutsu Kaisen" : 47, "url-value" : "Jujutsu-Kaisen-", "name" : "Episode-"},
    {"Demon Slayer" : 63, "url-value" : "Demon-Slayer-", "name" : "Episode-"},
    {"5 Centimeter per Second" : 1, "url-value" : "5-centimeter-per-second", "name" : "Episode-"},
    {"Your Name" : 1, "url-value" : "Your-Name", "name" : "Your Name"},
    {"Tunnel to Summer" : 1, "url-value" : "Tunnel_to_Summer", "name" : "Tunnel to the Summer"},
    {"Suzume" : 1, "url-value" : "Suzume_NT", "name" : "Episode-"},
    {"Death Note" : 37, "url-value" : "DN", "name" : "Episode-"},
    {"Solo Leveling" : 12, "url-value" : "Solo-Leveling-", "name" : "Episode-"},
    {"Kaiju No-8" : 12, "url-value" : "Kaiju-no8-", "name" : "Episode-"},
    {"Blue Lock" : 29, "url-value" : "Blue-Lock-", "name" : "Episode-"},
    {"My Dressup Darling" : 12, "url-value" : "My-Dressup-Darling-", "name" : "Episode-"},
    {"Dandadan" : 8, "url-value" : "Dandadan-", "name" : "Episode-"},
    {"Black Clover" : 52, "url-value" : "Black-Clover-", "name" : "Episode-"},
    {"Elfed Lied" : 13, "url-value" : "Elfed-Lied-", "name" : "Episode-"},
    {"Devilman Crybaby" : 10, "url-value" : "Devilman-Crybaby-", "name" : "Episode-"},
    {"Dragon Ball" : 10, "url-value" : "Devilman-Crybaby-", "name" : "Episode-"}
];
//  
function generateEpisodeDivs(selectedImageName) {
    // Find the matching anime object
    const anime = episodeCount.find(item => item[selectedImageName]);

    // If the anime is not found, exit the function
    if (!anime) {
        console.error("Anime not found:", selectedImageName);
        return;
    }

    // Extract necessary details
    const episodeTotal = anime[selectedImageName];
    const urlValue = anime["url-value"];
    const episodeName = anime["name"];

    // Select the container div
    const container = document.getElementById("append");
    container.innerHTML = ""; // Clear any previous divs

    // Loop to create divs for each episode
    for (let i = 1; i <= episodeTotal; i++) {
        const episodeDiv = document.createElement("div");

        // Set div attributes
        episodeDiv.classList.add("episode");
        episodeDiv.innerText = `${episodeName}${i}`;
        episodeDiv.dataset.url = `${urlValue}${i}`; // Store URL dynamically
        episodeDiv.id = `episode-${i}`; // Unique ID

        // Add click event to open backend server URL
        episodeDiv.onclick = () => {
            const videoUrl = `http://10.20.135.3:5000/stream-video?filename=${episodeDiv.dataset.url}`;
            window.location.href = videoUrl; // Redirect to backend video
        };

        // Append the div to the container
        container.appendChild(episodeDiv);
    }
}

// Example call: Pass the anime name from the selected image
const value = localStorage.getItem("selectedImageName");
generateEpisodeDivs(value);

// const buttons = document.querySelectorAll(".episode");
// buttons.forEach(button => {
//     button.addEventListener("click", (e) => {
//         const filename = e.target.getAttribute("data-url");
//         if (filename) {
//             const baseURL = window.location.origin;
//             window.location.href = `${baseURL}/player.html?video=${encodeURIComponent(filename)}`;
//         }
//     });
// });