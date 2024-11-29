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


//Changed
function playVideo() {
    const filename = document.getElementById("filename").value.trim();
    if (!filename) {
        alert("Please enter a filename.");
        return;
    }

    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");

    // Backend URL
    const serverURL = "http://192.168.50.120:5000/stream-video";
    videoSource.src = `${serverURL}?filename=${encodeURIComponent(filename)}`;
    videoPlayer.load();
}

// // Setup episode buttons to redirect to player.html
// const buttons = document.querySelectorAll(".video-btn");
// buttons.forEach(button => {
//     button.addEventListener("click", (e) => {
//         const filename = e.target.getAttribute("value");
//         if (filename) {
//             // Redirect to player.html with filename as a query parameter
//             window.location.href = `player.html?video=${encodeURIComponent(filename)}`;
//         }
//     });
// });

// Player page logic
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get('video');

    if (filename) {
        const videoPlayer = document.getElementById("videoPlayer");
        const videoSource = document.getElementById("videoSource");

        // Replace with your public backend URL
        const serverURL = "http://192.168.50.120:5000/stream-video";
        videoSource.src = `${serverURL}?filename=${encodeURIComponent(filename)}`;
        videoPlayer.load();
    } else {
        alert("No video selected!");
    }
};

