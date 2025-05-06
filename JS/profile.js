// const { decode } = require("jsonwebtoken");
// const API_URL = "https://anime-ott.onrender.com"
const API_URL = "http://127.0.0.1:5000"

document.addEventListener('DOMContentLoaded', () => {
  let Username = "";
  let Email = ""
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwt_decode(token);
      console.log(decoded);
      Username = decoded.user.username;
      Email = decoded.user.email;
    } catch (err) {
      console.error("Invalid token", err);
    }
  } else {
    console.warn("No token found in localStorage");
  }

  document.getElementById('user-username').textContent = Username;
  document.getElementById('user-email').textContent = Email;


  const user = document.getElementById('username');
  user.textContent = Username;
  // Load Watch Later list from localStorage
  const watchLaterList = JSON.parse(localStorage.getItem('watchLaterList')) || [];
  const watchLaterListContainer = document.getElementById('watch-later-list');
  const noWatchLaterMessage = document.getElementById('no-watch-later');

  if (watchLaterList.length === 0) {
    noWatchLaterMessage.style.display = 'block';
  } else {
    noWatchLaterMessage.style.display = 'none';

    watchLaterList.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;

      // Add a "Remove" button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = "remove-btn";
      removeButton.onclick = () => {
        const index = watchLaterList.indexOf(item);
        if (index > -1) {
          watchLaterList.splice(index, 1);
          localStorage.setItem('watchLaterList', JSON.stringify(watchLaterList));
          listItem.remove();
          if (watchLaterList.length === 0) {
            noWatchLaterMessage.style.display = 'block';
          }
        }
      };

      // Add a "Watch Now" button
      const watchNowButton = document.createElement('button');
      watchNowButton.textContent = 'Watch Now';
      watchNowButton.classList.add('watch-now-btn');
      watchNowButton.onclick = () => {
        localStorage.setItem('selectedImageName', item);
        window.location.href = 'details.html';
      };

      listItem.appendChild(removeButton);
      listItem.appendChild(watchNowButton); // Add "Watch Now" button
      watchLaterListContainer.appendChild(listItem);
    });

  }

  document.getElementById('logout-button').addEventListener('click', () => {
    // Ensure email is fetched from localStorage

    const watchLaterList = JSON.parse(localStorage.getItem('watchLaterList')) || []; // Ensure watchLaterList exists

    const storeWatchLaterList = async () => {
      try {
        const email = localStorage.getItem('Username'); // Fetch email from localStorage
        const response = await fetch(`${API_URL}/storeWatchLater`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            watchLaterList: watchLaterList,
          }),
        });

        if (response.ok) {
          console.log('Watch Later list stored successfully.');
        } else {
          console.error('Failed to store Watch Later list.');
        }
      } catch (error) {
        console.error('Error storing Watch Later list:', error);
      }
      // localStorage.clear(); // Clear localStorage
      // window.location.href = 'index.html'; // Redirect to
    };

    // Call the function to store the watchLaterList
    storeWatchLaterList()
    localStorage.removeItem("isLoggedIn"); // Clear localStorage
    window.location.href = 'index.html'; // Redirect to login page

    // storeWatchLaterList();
  });

});

const forgotPass = document.getElementById("forgotPass");

forgotPass.addEventListener("click", () => {
  window.location.href = "change.html";
})
