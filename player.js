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
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");
    const episodes = document.querySelectorAll(".episode");

    // Toggle season list visibility
    showSeasonsButton.addEventListener("click", () => {
        seasonsContainer.classList.toggle("hidden");
    });

    // Add functionality to select episodes
    episodes.forEach(episode => {
        episode.addEventListener("click", () => {
            const filename = episode.dataset.filename;
            if (!filename) {
                alert("Episode not available.");
                return;
            }

            const serverURL = "http://192.168.50.120:5000/stream-video";
            videoSource.src = `${serverURL}?filename=${encodeURIComponent(filename)}`;
            videoPlayer.load();
            videoPlayer.play();
        });
    });
});

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get('video');

    if (filename) {
        const videoPlayer = document.getElementById("videoPlayer");
        const videoSource = document.getElementById("videoSource");

        const serverURL = "http://192.168.50.120:5000/stream-video";
        videoSource.src = `${serverURL}?filename=${encodeURIComponent(filename)}`;
        videoPlayer.load();
        videoPlayer.play();
    } else {
        alert("No video selected!");
    }
};
