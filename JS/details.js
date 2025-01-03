document.body.style.zoom = "95%";

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
    {"Naruto : classic" : 220, "url-value" : "Naruto-Classic-", "name" : "Episode-"},
    {"Attack on Titan" : 59, "url-value" : "Attack-on-Titan-", "name" : "Episode-"},
    {"Jujutsu Kaisen" : 47, "url-value" : "Jujutsu-Kaisen-", "name" : "Episode-"},
    {"Demon Slayer" : 63, "url-value" : "Demon-Slayer-", "name" : "Episode-"},
    {"Death Note" : 37, "url-value" : "DN", "name" : "Episode-"},
    {"Solo Leveling" : 12, "url-value" : "Solo-Leveling-", "name" : "Episode-"},
    {"Kaiju No-8" : 12, "url-value" : "Kaiju-no8-", "name" : "Episode-"},
    {"Blue Lock" : 29, "url-value" : "Blue-Lock-", "name" : "Episode-"},
    {"My Dressup Darling" : 12, "url-value" : "My-Dressup-Darling-", "name" : "Episode-"},
    {"Dandadan" : 8, "url-value" : "Dandadan-", "name" : "Episode-"},
    {"Black Clover" : 52, "url-value" : "Black-Clover-", "name" : "Episode-"},
    {"Elfed Lied" : 13, "url-value" : "Elfed-Lied-", "name" : "Episode-"},
    {"Devilman CryBaby" : 10, "url-value" : "Devilman-Crybaby-", "name" : "Episode-"},
    {"Dragon Ball" : 153, "url-value" : "Devilman-Crybaby-", "name" : "Episode-"},
    {"CyberPunk" : 10, "url-value" : "Not Available", "name" : "Episode-"},
    {"Tokyo Revengers" : 36, "url-value" : "Not Available", "name" : "Episode-"},
    {"Bleach" : 366, "url-value" : "Not Available", "name" : "Episode-"},
    {"One Punch Man" : 24, "url-value" : "Not Available", "name" : "Episode-"},
    {"CyberPunk" : 10, "url-value" : "Not Available", "name" : "Episode-"},
    {"Pokemon" : 1200, "url-value" : "Not Available", "name" : "Episode-"},
    {"Fullmetal Alchemist" : 51, "url-value" : "Not Available", "name" : "Episode-"},
    {"Gintama" : 367, "url-value" : "Not Available", "name" : "Episode-"},
    {"Cowboy Bebop" : 26, "url-value" : "Not Available", "name" : "Episode-"},
    {"Psycho Pass" : 22, "url-value" : "Not Available", "name" : "Episode-"},
    {"Shiki" : 22, "url-value" : "Not Available", "name" : "Episode-"},
    {"Another" : 12, "url-value" : "Not Available", "name" : "Episode-"},
    {"Hell Sing" : 13, "url-value" : "Not Available", "name" : "Episode-"},
    {"Paranoic Agent" : 13, "url-value" : "Not Available", "name" : "Episode-"},
    {"Tokyo Ghoul" : 12, "url-value" : "Not Available", "name" : "Episode-"},
    {"Haikyuu" : 85, "url-value" : "Haikyuu-", "name" : "Episode-"},
    {"Ace of the Diamond" : 178, "url-value" : "Not Available", "name" : "Episode-"},
    {"Kuroko's Basket" : 75, "url-value" : "Not Available", "name" : "Episode-"},
    {"Major" : 204, "url-value" : "Not Available", "name" : "Episode-"},
    {"The Prince of Tennis" : 178, "url-value" : "Not Available", "name" : "Episode-"},
    {"Run with the Wind" : 23, "url-value" : "Not Available", "name" : "Episode-"},
    {"One Piece" : 1083, "url-value" : "Not Available", "name" : "Episode-"},
    {"Hunter X Hunter" : 148, "url-value" : "Not Available", "name" : "Episode-"},
    {"Vinland Saga" : 48, "url-value" : "Not Available", "name" : "Episode-"},
    {"Ouran High School Host Club" : 26, "url-value" : "Not Available", "name" : "Episode-"},
    {"Great Teacher Onizuka" : 43, "url-value" : "Not Available", "name" : "Episode-"},
    {"Spy x Family" : 25, "url-value" : "Not Available", "name" : "Episode-"},
    {"Toradora!" : 25, "url-value" : "Not Available", "name" : "Episode-"},
    {"Kaguya-sama: Love is War" : 50, "url-value" : "Not Available", "name" : "Episode-"},
    {"KonoSuba: God's Blessing on This Wonderful World!" : 43, "url-value" : "Not Available", "name" : "Episode-"},
    {"The Devil is a Part-Timer!" : 25, "url-value" : "Not Available", "name" : "Episode-"},
    {"Asobi Asobase" : 12   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Clannad: After Story" : 24, "url-value" : "Not Available", "name" : "Episode-"},
    {"Your Lie in April" : 22   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Violet Evergarden" : 13  , "url-value" : "Not Available", "name" : "Episode-"},
    {"Anohana: The Flower We Saw That Day" : 11   , "url-value" : "Not Available", "name" : "Episode-"},
    {"March Comes in Like a Lion" : 44   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Erased" : 12   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Re:Zero - Starting Life in Another World" : 62   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Sword Art Online" : 62   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Made in Abyss" : 25   , "url-value" : "Not Available", "name" : "Episode-"},
    {"The Rising of the Shield Hero" : 50   , "url-value" : "Not Available", "name" : "Episode-"},
    {"No Game No Life" : 12   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Psycho-Pass" : 42   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Steins;Gate" : 47   , "url-value" : "Not Available", "name" : "Episode-"},
    {"The Promised Neverland" : 23   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Monster" : 74   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Higurashi When They Cry" : 98   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Barakamon" : 12   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Nichijou" : 26   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Honey and Clever" : 36   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Little Busters!" : 39   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Natsume's Book of Friends" : 74   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Blue Exorcist" : 37   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Mob Psycho 100" : 37   , "url-value" : "Not Available", "name" : "Episode-"},
    {"The Ancient Magus' Bride" : 39   , "url-value" : "Not Available", "name" : "Episode-"},
    {"The Seven Deadly Sins" : 124   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Noragami" : 29   , "url-value" : "Not Available", "name" : "Episode-"},
    {"Boruto : Naruto Next Generations" : 293   , "url-value" : "Not Available", "name" : "Episode-"},
    {"My Dressup Darling" : 12   , "url-value" : "My-Dressup-Darling-", "name" : "Episode-"}
];

const movies = [
    {"Suzume" : 1, "url-value" : "Suzume_NT", "name" : "Suzume"},
    {"The Tunnel to Summer" : 1, "url-value" : "Tunnel_to_Summer", "name" : "Tunnel to the Summer"},
    {"5 Centimeter Per Second" : 1, "url-value" : "5-centimeter-per-second", "name" : "5 Centimeter per Second"},
    {"Your Name" : 1, "url-value" : "Your_Name", "name" : "Your Name"},
    {"Jujutsu Kaisen 0 Movie" : 1, "url-value" : "JJK_0_MOVIE", "name" : "Jujutsu Kaisen 0 Movie"},
    {"Jujutsu Kaisen 0 Movie" : 1, "url-value" : "JJK_0_MOVIE", "name" : "Jujutsu Kaisen 0 Movie"},
    {"I Want to Eat Your Pancreas" :1, "url-value" : "Not Available", "name" : "I Want to Eat your Pancreas"},
    {"Tamako Love Story" :1, "url-value" : "Not Available", "name" : "Tamako Love Story"},
    {"A Silent Voice" :1, "url-value" : "Not Available", "name" : "A Silent Voice"},
    {"I Want to Eat Your Pancreas" :1, "url-value" : "Not Available", "name" : ""},
]
// Function to generate divs for episodes or movies
function generateEpisodeDivs(selectedImageName) {
    let anime = episodeCount.find(item => item[selectedImageName]);
    let movie = movies.find(item => item[selectedImageName]);

    const container = document.getElementById("append");
    container.innerHTML = ""; // Clear any previous divs

    if (anime) {
        // Handling the anime (episodes)
        const episodeTotal = anime[selectedImageName];
        const urlValue = anime["url-value"];
        const episodeName = anime["name"];

        for (let i = 1; i <= episodeTotal; i++) {
            const episodeDiv = document.createElement("div");
            episodeDiv.classList.add("episode");
            episodeDiv.innerText = `${episodeName}${i}`;
            episodeDiv.dataset.url = `${urlValue}${i}`; // Store URL dynamically
            episodeDiv.id = `episode-${i}`; // Unique ID

            episodeDiv.onclick = () => {
                const videoUrl = `http://10.20.135.0:5000/stream-video?filename=${episodeDiv.dataset.url}`;
                window.location.href = videoUrl; // Redirect to backend video
            };

            container.appendChild(episodeDiv);
        }
    } else if (movie) {
        // Handling the movie (only one item)
        const movieName = movie["name"];
        const urlValue = movie["url-value"];
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerText = movieName;
        movieDiv.dataset.url = urlValue; // Store URL dynamically
        movieDiv.id = `movie-${selectedImageName}`; // Unique ID for the movie

        movieDiv.onclick = () => {
            const videoUrl = `http://10.20.135.0:5000/stream-video?filename=${movieDiv.dataset.url}`;
            window.location.href = videoUrl; // Redirect to backend video
        };

        container.appendChild(movieDiv);
    } else {
        console.error("Anime or Movie not found:", selectedImageName);
    }
}

// Example call: Pass the anime or movie name from the selected image
const value = localStorage.getItem("selectedImageName");
generateEpisodeDivs(value);

