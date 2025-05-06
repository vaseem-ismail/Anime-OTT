//header
// const { decode } = require("jsonwebtoken");
const userName = document.getElementById("id-name");
const userId = document.getElementById("id-img");

const token = localStorage.getItem("token");
let UserName = "";

if (token) {
    try {
        const decoded = jwt_decode(token);
        UserName = decoded.user.username;
    } catch (err) {
        console.error("Invalid token", err);
    }
} else {
    console.warn("No token found in localStorage");
}

//search input
const searchInput = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

//show-Catagories
const show_more = document.getElementsByClassName("show_more");

//Fetching Data to insert
const idImg = document.getElementById("id-img")
const idUser = document.getElementById("id-name");
// const localUser = localStorage.getItem("Username");
// const localName = localStorage.getItem("name");
const firstLetter = UserName.charAt(0); // First letter
const beforeAt = UserName.split(' ')[0];
setInterval(() => {
    if (!localStorage.getItem("token")) {
        localStorage.clear();
        window.location.href = "index.html";
    }
})






document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.querySelector(".image-container");
    let currentIndex = 0;

    // Fetch data from JSON
    fetch('./images.json') // Update path if necessary
        .then(response => response.json())
        .then(data => {
            const allImages = [];

            // Collect all images into a single array
            for (const category in data) {
                allImages.push(...data[category]);
            }

            // Function to shuffle and fetch random images
            const getRandomImages = (images, count) => {
                const shuffled = images.sort(() => 0.5 - Math.random());
                return shuffled.slice(0, count); // Return `count` random images
            };

            // Get 10 random images
            const randomImages = getRandomImages(allImages, 10);

            // Append random images to the carousel
            randomImages.forEach(image => {
                const imgElement = document.createElement("img");
                imgElement.src = image["image-url"];
                imgElement.alt = image.name;
                imgElement.classList.add("carousel-image");
                imgElement.addEventListener('click', () => {
                    localStorage.setItem('selectedImageName', image.name); // Store name in localStorage
                    window.location.href = 'details.html'; // Navigate to details page
                });
                imageContainer.appendChild(imgElement);
            });

            // Initialize the carousel once images are loaded
            initializeCarousel();
        })
        .catch(error => console.error('Error fetching JSON data:', error));

    function initializeCarousel() {
        const images = document.querySelectorAll(".carousel-image");

        // Function to update the carousel
        function updateCarousel() {
            images.forEach((img, index) => {
                img.classList.remove("center", "left", "right");

                if (index === currentIndex) {
                    img.classList.add("center");
                } else if (index === (currentIndex - 1 + images.length) % images.length) {
                    img.classList.add("left");
                } else if (index === (currentIndex + 1) % images.length) {
                    img.classList.add("right");
                }
            });

            // Scroll the carousel
            const offset = -currentIndex * (images[0].offsetWidth + 20); // Adjust for image width + margin
            imageContainer.style.transform = `translateX(${offset}px)`;
        }

        // Function to rotate the carousel
        function rotateCarousel() {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }

        // Set an interval for auto-rotation
        setInterval(rotateCarousel, 3000);

        // Initial setup
        updateCarousel();
    }
});


window.addEventListener("load", () => {
    idUser.textContent = beforeAt;
    idImg.textContent = firstLetter;

})
idImg.addEventListener("click", () => {
    window.location.href = "profile.html";
})

// window.addEventListener("load", () => {

//     // Target container
//     const videoListContainer = document.getElementById("");

//     // Fetch and display the videos
//     fetch('../images.json') // Path to your JSON file
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(videos => {
//             // Filter and sort videos by genre
//             const actionVideos = videos
//                 .filter(video => video.Genre.toLowerCase() === "action")
//                 .sort((a, b) => a.filename.localeCompare(b.filename)); // Sort alphabetically by filename

//             displayVideos(actionVideos);
//         })
//         .catch(error => {
//             console.error("Error fetching video data:", error);
//             videoListContainer.innerHTML = "<p>Error loading videos. Please try again later.</p>";
//         });

//     // Function to append videos
//     function displayVideos(videos) {
//         if (videos.length === 0) {
//             videoListContainer.innerHTML = "<p>No videos found in the Action genre.</p>";
//             return;
//         }

//         videos.forEach(video => {
//             // Create a container for each video
//             const videoItem = document.createElement("div");
//             videoItem.classList.add("video-item");

//             // Add video title and genre
//             videoItem.innerHTML = `
//             <h3>${video.filename}</h3>
//             <p>Genre: ${video.Genre}</p>
//             <button onclick="playVideo('${video.data}')">Play</button>
//         `;

//             // Append to the main container
//             videoListContainer.appendChild(videoItem);
//         });
//     }

// })
window.addEventListener("load", () => {

    // Fetch JSON data and append images to corresponding categories
    fetch('../images.json') // Correct relative path to the JSON file
        .then(response => response.json())
        .then(data => {
            // Function to append images to a category
            const appendImages = (categoryId, items) => {
                const container = document.getElementById(categoryId);
                items.forEach(item => {
                    const img = document.createElement('img');
                    img.src = item['image-url'];
                    img.alt = item.name;
                    img.draggable = "false";
                    img.classList.add('video-btn'); // Add a class for styling

                    img.addEventListener('click', () => {
                        localStorage.setItem('selectedImageName', item.name); // Store name in localStorage
                        window.location.href = 'details.html'; // Navigate to details page
                    });
                    container.appendChild(img);
                });
            };

            // Append images for each category based on JSON data
            appendImages('cat1', data['Greatest']);
            appendImages('cat2', data['Action']);
            appendImages('cat3', data['Love-Story']);
            appendImages('cat4', data['Sci-Fi']);
            appendImages('cat5', data['Horror']);
            appendImages('cat6', data['Sports']);
        })
        .catch(error => console.error('Error fetching or processing JSON data:', error));

})
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const resultsContainer = document.getElementById("search-results");

    // Fetch data from JSON
    fetch('./images.json')
        .then(response => response.json())
        .then(data => {
            const allAnime = [];

            // Collect all anime into a flat array
            for (const category in data) {
                allAnime.push(...data[category]);
                console.log(category, "+", data[category]);
            }

            // Function to display search results dynamically
            const displayResults = (query) => {
                resultsContainer.innerHTML = "";
                const seenNames = new Set();

                const matches = allAnime.filter(anime =>
                    anime.name.toLowerCase().includes(query.toLowerCase())
                );
                console.log("matches", matches);
                if (matches.length > 0) {
                    matches.forEach(match => {
                        console.log("match + " + [match.name]);
                        console.log(seenNames.has(match.name), "m   m", seenNames);
                        if (seenNames.has(match.name)) return;

                        seenNames.add(match.name);


                        const resultItem = document.createElement("div");
                        resultItem.classList.add("result-item");

                        const animeImg = document.createElement("img");
                        animeImg.src = match["image-url"];
                        animeImg.alt = match.name;
                        animeImg.addEventListener('click', () => {
                            localStorage.setItem('selectedImageName', match.name);
                            window.location.href = 'details.html';
                        });
                        const animeName = document.createElement("p");
                        animeName.textContent = match.name;

                        resultItem.appendChild(animeImg);
                        resultItem.appendChild(animeName);
                        resultsContainer.appendChild(resultItem);
                    });
                } else {
                    const noResults = document.createElement("p");
                    noResults.textContent = "No anime found. Try a different search.";
                    noResults.style.textAlign = "center";
                    noResults.style.color = "red";
                    resultsContainer.appendChild(noResults);
                }
            };

            // Add event listener for live search
            searchBar.addEventListener("input", () => {
                const query = searchBar.value.trim();
                if (query) {
                    displayResults(query);
                } else {
                    resultsContainer.innerHTML = ""; // Clear results if the query is empty
                }
            });
        })
        .catch(error => console.error('Error fetching anime data:', error));
});

// Generate sparkles dynamically
const sparklesContainer = document.querySelector(".sparkles");
for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 5 + "s";
    sparklesContainer.appendChild(sparkle);
}