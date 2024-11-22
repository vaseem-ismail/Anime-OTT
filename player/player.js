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
document.addEventListener("DOMContentLoaded", () => {
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
