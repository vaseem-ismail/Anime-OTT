window.addEventListener("load",()=>{

    // Target container
   const videoListContainer = document.getElementById("anime1");
   
   // Fetch and display the videos
   fetch('images.json') // Path to your JSON file
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
   
   // Play video function
   function playVideo(data) {
       alert("Playing video with data: " + data);
       // Alternatively, use the data to set the source of a video player
       // Example:
       // document.getElementById('videoPlayer').src = 'data:video/mp4;base64,' + data;
   }
     
   })