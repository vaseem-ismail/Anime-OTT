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


    // async function getServerIP() {
    //     const response = await fetch('http://your-backend-host:5000/get-ip');
    //     const data = await response.json();
    //     return data.ip;
    // }
    
    // async function getVideoURL(filename) {
    //     const ip = await getServerIP();
    //     return `http://${ip}:5000/stream-video?filename=${encodeURIComponent(filename)}`;
    // }
    
    // // Example usage:
    // getVideoURL('example.mp4').then((videoURL) => {
    //     console.log(videoURL);
    //     // Use the videoURL as needed
    // });
    


    // Construct the video URL from the backend
    const serverURL = "http://video.fetch:5000/stream-video";
    // const videoURL = `${serverURL}?filename=${encodeURIComponent(filename)}`;
    // window.open(`http://10.20.135.22:5000/stream-video?filename=${encodeURIComponent(filename)}`);
    const videoURL = `http://192.168.203.120:5000/stream-video?filename=${encodeURIComponent(filename)}`;
    // window.location.href = `http://192.168.203.120:5000/stream-video?filename=${encodeURIComponent(filename)}`;

    // Update the video source and load the video
    videoSource.src = videoURL;
    videoPlayer.load();

    // Play the video automatically
    videoPlayer.play().catch((error) => {
        console.error("Error playing video:", error);
        alert("Unable to play the video. Please check the connection or try again later.");
    });
};


document.addEventListener("load", () => {
    const videoTag = document.getElementById("videoSource");
  
    // Video source URL
    const videoURL = "http://127.0.0.1/:5000/stream-video?filename=Naruto_Ship_1";
  
    // Set the source dynamically
    const sourceTag = videoTag.querySelector("source");
    sourceTag.src = videoURL;
  
    // Refresh the video player to load the new source
    const player = videojs(videoTag);
    player.src({ src: videoURL, type: "video/mp4" });
    player.play();
  });