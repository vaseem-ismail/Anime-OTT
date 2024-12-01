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
