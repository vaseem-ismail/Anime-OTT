// const button = document.getElementById('show');
// const seasonsBar = document.getElementById('seasons-bar');

// button.addEventListener('click', () => {
//     seasonsBar.classList.toggle('collapsed');
//     if (seasonsBar.classList.contains('collapsed')) {
//         button.textContent = 'S';
//     } else {
//         button.textContent = 'SEASONS';
//     }
// });
// window.addEventListener("load", () => {
//     seasonsBar.classList.toggle('collapsed');
// })
// window.onload = function () {
//     // Get the video player elements
//     // const videoPlayer = document.getElementById("videoPlayer");
//     const videoSource = document.getElementById("videoSource");

//     // Extract the video filename from the URL query parameter
//     const urlParams = new URLSearchParams(window.location.search);
//     const filename = urlParams.get("video");

//     if (!filename) {
//         alert("No video selected! Please return to the homepage and select a video.");
//         return;
//     }


//     // Construct the video URL from the backend
//     // const serverURL = "http://video.fetch:5000/stream-video";
//     // const videoURL = `${serverURL}?filename=${encodeURIComponent(filename)}`;
//     // window.open(`http://10.20.135.22:5000/stream-video?filename=${encodeURIComponent(filename)}`);
//     // const videoURL = `http://10.20.135.5:5000/stream-video?filename=${encodeURIComponent(filename)}`;
//     // window.location.href = `http://10.20.135.5:5000/stream-video?filename=${encodeURIComponent(filename)}`;


//     const backendURL = `http://${window.location.hostname}:5000/stream-video`;
// const videoURL = `${backendURL}?filename=${encodeURIComponent(filename)}`;
// window.open(`http://${window.location.hostname}:5000/stream-video?filename=${encodeURIComponent(filename)}`)

//     // Update the video source and load the video
//     videoSource.src = videoURL;
//     videoSource.load();

//     // Play the video automatically
//     videoSource.play().catch((error) => {
//         console.error("Error playing video:", error);
//         alert("Unable to play the video. Please check the connection or try again later.");
//     });
// };
// async function getBackendURL() {
//     try {
//         // Fetch the backend IP from the discovery endpoint
//         const response = await fetch('http://your-initial-backend-ip:5000/discover-backend');
//         const data = await response.json();
//         return `http://${data.ip}:${data.port}`;
//     } catch (error) {
//         console.error('Error fetching backend IP:', error);
//         alert('Unable to connect to the backend. Please check your connection.');
//     }
// }

// window.onload = async function () {
//     const videoSource = document.getElementById("videoSource");
//     const urlParams = new URLSearchParams(window.location.search);
//     const filename = urlParams.get("video");

//     if (!filename) {
//         alert("No video selected! Please return to the homepage and select a video.");
//         return;
//     }

//     const backendURL = await getBackendURL();
//     const videoURL = `${backendURL}/stream-video?filename=${encodeURIComponent(filename)}`;

//     if (videoSource) {
//         videoSource.src = videoURL;
//         videoSource.load();
//         videoSource.play().catch((error) => {
//             console.error("Error playing video:", error);
//             alert("Unable to play the video. Please check the connection or try again later.");
//         });
//     } else {
//         window.open(videoURL, '_blank');
//     }
// };

const button = document.getElementById('show');
const seasonsBar = document.getElementById('seasons-bar');

// Toggle seasons bar visibility
button.addEventListener('click', () => {
    seasonsBar.classList.toggle('collapsed');
    button.textContent = seasonsBar.classList.contains('collapsed') ? 'S' : 'SEASONS';
});

// Collapse seasons bar on initial load
window.addEventListener("load", () => {
    seasonsBar.classList.toggle('collapsed');
});

// Fetch backend IP and port dynamically
async function getBackendURL() {
    try {
        const response = await fetch('http://127.0.0.1:5000/discover-backend');
        if (!response.ok) {
            throw new Error(`Failed to fetch backend details: ${response.statusText}`);
        }
        const data = await response.json();
        return `http://${data.ip}:${data.port}`;
    } catch (error) {
        console.error('Error fetching backend IP:', error);
        alert('Unable to connect to the backend. Please check your connection.');
        throw error; // Ensure the error is re-thrown to prevent execution of further code
    }
}

// Set up video player
async function setupVideoPlayer() {
    try {
        // Fetch video filename from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const filename = urlParams.get("video");

        if (!filename) {
            alert("No video selected! Please return to the homepage and select a video.");
            return;
        }

        // Get backend URL dynamically
        const backendURL = await getBackendURL();

        // Construct video URL
        const videoURL = `${backendURL}/stream-video?filename=${encodeURIComponent(filename)}`;

        // Update video source and play
        const videoSource = document.getElementById("videoSource");
        const videoPlayer = document.getElementById("videoPlayer");

        if (videoSource) {
            videoSource.src = videoURL;
            videoPlayer.load();
            videoPlayer.play().catch((error) => {
                console.error("Error playing video:", error);
                alert("Unable to play the video. Please check the connection or try again later.");
            });
        } else {
            // If videoSource is not found, open in a new tab as a fallback
            window.open(videoURL, '_blank');
        }
    } catch (error) {
        console.error("Error setting up the video player:", error);
    }
}

// Execute setup on window load
window.addEventListener('load', setupVideoPlayer);
