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
window.onload = function () {
    // Get the video player elements
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");

    // Extract the video filename from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get("video");

    if (!filename) {
        alert("No video selected! Please return to the homepage and select a video.");
        return;
    }

    // Construct the video URL from the backend
    const serverURL = "http://video.fetch:5000/stream-video";
    // const videoURL = `${serverURL}?filename=${encodeURIComponent(filename)}`;
    window.open(`http://10.20.135.22:5000/stream-video?filename=${encodeURIComponent(filename)}`);
    const videoURL = `http://10.20.135.22:5000/stream-video?filename=${encodeURIComponent(filename)}`;

    // Update the video source and load the video
    videoSource.src = videoURL;
    videoPlayer.load();

    // Play the video automatically
    videoPlayer.play().catch((error) => {
        console.error("Error playing video:", error);
        alert("Unable to play the video. Please check the connection or try again later.");
    });
};
