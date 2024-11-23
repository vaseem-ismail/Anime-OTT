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
// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         // Fetch the JSON file from the Backend folder
//         const response = await fetch('../Backend/video_data.json');
//         const data = await response.json();

//         // Decode the base64 video data
//         const base64 = data.base64.split(',')[1]; // Remove "data:video/mp4;base64,"
//         const binary = atob(base64); // Decode base64
//         const bytes = new Uint8Array(binary.length);
//         for (let i = 0; i < binary.length; i++) {
//             bytes[i] = binary.charCodeAt(i);
//         }
//         const blob = new Blob([bytes], { type: 'video/mp4' });
//         const url = URL.createObjectURL(blob);

//         // Create a video element
//         const video = document.createElement('video');
//         video.src = url;
//         video.controls = true;
//         video.width = 640; // Set desired video width
//         video.height = 360; // Set desired video height

//         // Append the video element to the page
//         document.body.appendChild(video);
//     } catch (error) {
//         console.error('Error loading video:', error);
//     }
// });
const butTon = document.getElementById("Episode1");
butTon.addEventListener("click",()=>{
   alert("hai da")

async function loadAnime(animeName, episode) {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_episode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ anime_name: animeName, episode_number: episode })
            
        });

        if (!response.ok) throw new Error("Failed to fetch episode");
        
        const data = await response.json();
        const videoPlayer = document.getElementById('video-player');
        videoPlayer.src = data.episode_url;
        videoPlayer.play();
    } catch (error) {
        console.error('Error:', error);
    }
}
})