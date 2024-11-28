const button = document.getElementById('show');
const seasonsBar = document.getElementById('seasons-bar');

button.addEventListener('click', () => {
    seasonsBar.classList.toggle('collapsed');
    if (seasonsBar.classList.contains('collapsed')) {
        button.textContent = 'S';
    } else {
        button.textContent = 'SEASONS';
    }
});
window.addEventListener("load", () => {
    seasonsBar.classList.toggle('collapsed');
})
window.addEventListener("load", () => {
    const showSeasonsButton = document.getElementById("show-seasons");
    const seasonsContainer = document.getElementById("seasons");
    const videoPlayer = document.getElementById("video-player");
    const videoSource = document.getElementById("video-source");
    const episodes = document.querySelectorAll(".episode");

    // Toggle season list visibility
    showSeasonsButton.addEventListener("click", () => {
        seasonsContainer.classList.toggle("hidden");
    });

    // Add functionality to select episodes
    episodes.forEach(episode => {
        episode.addEventListener("click", () => {
            const episodeNumber = episode.dataset.episode;
            const seasonNumber = "1"; // Hardcoded for now, can be dynamic
            const videoURL = `videos/season${seasonNumber}/episode${episodeNumber}.mp4`;
            videoSource.src = videoURL;
            videoPlayer.load();
            videoPlayer.play();
        });
    });
});
 // Get the video filename from the URL query parameters
 const urlParams = new URLSearchParams(window.location.search);
        const filename = urlParams.get("video");

        if (filename) {
            // Set the video player source to stream from the backend
            const videoPlayer = document.getElementById("videoPlayer");
            videoPlayer.src = `http://127.0.0.1:5000/stream-video?filename=${encodeURIComponent(filename)}`;
            videoPlayer.load();
        } else {
            alert("No video specified.");
        }


//setup pannanum //set for episode divs
const buttons = document.querySelectorAll(".video-btn");
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        // Get filename from the clicked image's value attribute
        const filename = e.target.getAttribute("value");

        if (filename) {
            // Navigate to the player page with the filename as a query parameter
            window.location.href = `player.html?video=${encodeURIComponent(filename)}`;
        }
    });
});