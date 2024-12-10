//header
const userName = document.getElementById("id-name");
const userId = document.getElementById("id-img");

//search input
const searchInput = document.getElementById("search-bar");
const searchBtn =document.getElementById("search-btn");

//show-Catagories
const show_more = document.getElementsByClassName("show_more");

//Fetching Data to insert
const idImg = document.getElementById("id-img")
const idUser = document.getElementById("id-name");
const localUser = localStorage.getItem("Username");
const firstLetter = localUser.charAt(0); // First letter
const beforeAt = localUser.split('@')[0]; // Part before '@'

//Footer
const TandC = document.getElementById("link-one");
const PP = document.getElementById("link-two");

const images = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

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

  // Automatically scroll the carousel
  const container = document.querySelector(".image-container");
  const offset = -currentIndex * (images[0].offsetWidth + 20); // width + margin
  container.style.transform = `translateX(${offset}px)`;
}

function rotateCarousel() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

setInterval(rotateCarousel, 3000); // Rotate every 3 seconds

// Initial setup
updateCarousel();

window.addEventListener("load",()=>{
    idUser.textContent = beforeAt;
    idImg.textContent = firstLetter;
})
const logOut = document.getElementById("logout");
let isTextVisible = false;

idImg.addEventListener('click', () => {
  if (isTextVisible) {
    // Hide the text
    logOut.style.display = 'none';
    isTextVisible = false;
  } else {
    // Show the text
    logOut.style.display = 'block';
    isTextVisible = true;
  }
});
logOut.addEventListener("click",()=>{
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
})


const buttons = document.querySelectorAll(".video-btn");
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const filename = e.target.getAttribute("value");
        if (filename) {
            const baseURL = window.location.origin;
            window.location.href = `${baseURL}/player.html?video=${encodeURIComponent(filename)}`;
        }
    });
});


 // Fetch and display grouped images by genre
 fetch("images_by_genre.json")
 .then(response => response.json())
 .then(data => {
     const genresContainer = document.getElementById("genres");

     Object.keys(data).forEach(genre => {
         // Create a section for each genre
         const genreSection = document.createElement("div");
         genreSection.classList.add("genre");

         // Add the genre title
         const genreTitle = document.createElement("div");
         genreTitle.classList.add("genre-title");
         genreTitle.textContent = genre;
         genreSection.appendChild(genreTitle);

         // Add the images
         const imageContainer = document.createElement("div");
         imageContainer.classList.add("image-container");

         data[genre].forEach(image => {
             const imgElement = document.createElement("img");
             imgElement.src = image.imageUrl; // Replace with your image field key
             imgElement.alt = image.name || "Image";
             imageContainer.appendChild(imgElement);
         });

         genreSection.appendChild(imageContainer);
         genresContainer.appendChild(genreSection);
     });
 })
 .catch(err => console.error("Error loading genres:", err));

 window.addEventListener("load",()=>{

 // Target container
const videoListContainer = document.getElementById("");

// Fetch and display the videos
fetch('../images.json') // Path to your JSON file
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(videos => {
        // Filter and sort videos by genre
        const actionVideos = videos
            .filter(video => video.Genre.toLowerCase() === "action")
            .sort((a, b) => a.filename.localeCompare(b.filename)); // Sort alphabetically by filename

        displayVideos(actionVideos);
    })
    .catch(error => {
        console.error("Error fetching video data:", error);
        videoListContainer.innerHTML = "<p>Error loading videos. Please try again later.</p>";
    });

// Function to append videos
function displayVideos(videos) {
    if (videos.length === 0) {
        videoListContainer.innerHTML = "<p>No videos found in the Action genre.</p>";
        return;
    }

    videos.forEach(video => {
        // Create a container for each video
        const videoItem = document.createElement("div");
        videoItem.classList.add("video-item");

        // Add video title and genre
        videoItem.innerHTML = `
            <h3>${video.filename}</h3>
            <p>Genre: ${video.Genre}</p>
            <button onclick="playVideo('${video.data}')">Play</button>
        `;

        // Append to the main container
        videoListContainer.appendChild(videoItem);
    });
}
  
})
window.addEventListener("load",()=>{

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
    fetch('./images.json') // Update the path if necessary
        .then(response => response.json())
        .then(data => {
            const allAnime = [];

            // Collect all anime into a flat array
            for (const category in data) {
                allAnime.push(...data[category]);
            }

            // Function to display search results dynamically
            const displayResults = (query) => {
                resultsContainer.innerHTML = ""; // Clear previous results
                const seenNames = new Set(); // Track seen anime names

                const matches = allAnime.filter(anime =>
                    anime.name.toLowerCase().includes(query.toLowerCase())
                );

                if (matches.length > 0) {
                    matches.forEach(match => {
                        // Skip if this anime name is already displayed
                        if (seenNames.has(match.name)) return;
                        seenNames.add(match.name); // Mark this name as seen

                        const resultItem = document.createElement("div");
                        resultItem.classList.add("result-item");

                        const animeImg = document.createElement("img");
                        animeImg.src = match["image-url"];
                        animeImg.alt = match.name;
                        animeImg.addEventListener('click', () => {
                            localStorage.setItem('selectedImageName', match.name); // Store name in localStorage
                            window.location.href = 'details.html'; // Navigate to details page
                        }); 
                        const animeName = document.createElement("p");
                        animeName.textContent = match.name;

                        resultItem.appendChild(animeImg);
                        resultItem.appendChild(animeName);
                        resultsContainer.appendChild(resultItem);
                    });
                } else {
                    // Show a message if no results found
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
