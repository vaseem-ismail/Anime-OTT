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

// // Play video function
// function playVideo(data) {
//     alert("Playing video with data: " + data);
//     // Alternatively, use the data to set the source of a video player
//     // Example:
//     // document.getElementById('videoPlayer').src = 'data:video/mp4;base64,' + data;
// }
  
})
// document.addEventListener("DOMContentLoaded", function() {
//     fetch('../images.json')
//         .then(response => response.json())
//         .then(data => {
//             const categories = {
//                 cat1: document.getElementById('cat1'),
//                 cat2: document.getElementById('cat2'),
//                 cat3: document.getElementById('cat3'),
//                 cat4: document.getElementById('cat4'),
//                 cat5: document.getElementById('cat5'),
//                 cat6: document.getElementById('cat6')
//             };

//             for (const category in data) {
//                 data[category].forEach(image => {
//                     const imgElement = document.createElement('img');
//                     imgElement.src = image['image-url'];
//                     imgElement.alt = image.name;
//                     imgElement.title = image.name;
//                     imgElement.style.margin = "10px";
//                     imgElement.style.width = "200px";

//                     categories[category].appendChild(imgElement);
//                 });
//             }
//         })
//         .catch(error => console.error('Error loading images:', error));
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const cat1Container = document.getElementById('cat1');

//     // Fetch the "greatest_ever" movie data from the JSON file
//     fetch('image.json?timestamp=' + Date.now()) // Cache busting
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch movie data: ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Fetched data:', data); // Debugging

//             const greatestMovies = data.Greatest;

//             // Loop through the "greatest_ever" category and append each movie
//             greatestMovies.forEach(movie => {
//                 const movieCard = document.createElement('div');
//                 movieCard.classList.add('movie-card');
                
//                 movieCard.innerHTML = `
//                     <img class="movie-image" 
//                          src="${movie['image-url']}" 
//                          alt="${movie.name}" 
//                          loading="lazy">
//                     <p class="movie-title">${movie.name}</p>
//                     <p class="movie-genre">${movie.genre}</p>
//                     <p class="movie-released-year">Released Year: ${movie.released-year}</p>
//                     <p class="movie-description">${movie.description}</p>
//                 `;

//                 cat1Container.appendChild(movieCard);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching categories:', error);
//             cat1Container.innerHTML = '<p>Failed to load categories. Please try again later.</p>';
//         });
// });
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