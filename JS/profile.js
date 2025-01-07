document.addEventListener('DOMContentLoaded', () => {
  // Load user information (example data)
  const username = localStorage.getItem('name');  
  const email = localStorage.getItem('Username');
  const joinedDate = 'January 1, 2024';

  document.getElementById('user-username').textContent = username;
  document.getElementById('user-email').textContent = email;
  document.getElementById('user-joined').textContent = joinedDate;


  const user = document.getElementById('username');
  user.textContent = username;
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
    alert('Logging out...');
    // Ensure email is fetched from localStorage
    alert('Email: ' + email);

    const watchLaterList = JSON.parse(localStorage.getItem('watchLaterList')) || []; // Ensure watchLaterList exists

    const storeWatchLaterList = async () => {
      try {
        const email = localStorage.getItem('Username'); // Fetch email from localStorage
        const response = await fetch('https://anime-ott.onrender.com/storeWatchLater', {

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
    };

    // Call the function to store the watchLaterList
    storeWatchLaterList().then(() => {
      localStorage.clear(); // Clear localStorage
      window.location.href = 'index.html'; // Redirect to login page
    });
  });

});
