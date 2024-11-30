// Header
const userName = document.getElementById("id-name");
const userId = document.getElementById("id-img");

// Search Input
const searchInput = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

// Show Categories
const show_more = document.getElementsByClassName("show_more");

// Fetching Data to Insert
const localUser = localStorage.getItem("Username") || "Guest@domain.com";
const firstLetter = localUser.charAt(0); // First letter
const beforeAt = localUser.split('@')[0]; // Part before '@'

// Footer
const TandC = document.getElementById("link-one");
const PP = document.getElementById("link-two");

// Carousel
const images = document.querySelectorAll(".carousel-image");
const container = document.querySelector(".image-container");
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

    // Adjust carousel offset
    const offset = -currentIndex * (images[0].clientWidth + parseInt(getComputedStyle(images[0]).marginRight));
    container.style.transform = `translateX(${offset}px)`;
}

function rotateCarousel() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

setInterval(rotateCarousel, 3000); // Rotate every 3 seconds

// Initial Setup
window.addEventListener("load", () => {
    const idUser = document.getElementById("id-name");
    const idImg = document.getElementById("id-img");
    idUser.textContent = beforeAt;
    idImg.textContent = firstLetter;

    updateCarousel();
});

// Logout
const logOut = document.getElementById("logout");
let isTextVisible = false;

idImg.addEventListener('click', () => {
    logOut.style.display = isTextVisible ? 'none' : 'block';
    isTextVisible = !isTextVisible;
});

logOut.addEventListener("click", () => {
    localStorage.removeItem('isLoggedIn');
    const baseURL = window.location.origin;
    window.location.href = `${baseURL}/index.html`;
});

// Video Button Setup
const buttons = document.querySelectorAll(".video-btn");
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const filename = e.target.getAttribute("value");

        if (filename) {
            // Navigate to the player page with the filename as a query parameter
            const baseURL = window.location.origin;
            window.location.href = `${baseURL}/player.html?video=${encodeURIComponent(filename)}`;
        } else {
            console.error("No filename attribute found on the clicked button.");
        }
    });
});
