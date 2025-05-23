document.addEventListener('DOMContentLoaded', async () => {
    const selectedImageName = localStorage.getItem('selectedImageName');
    if (!selectedImageName) {
        document.body.innerHTML = '<p>No image selected. Please go back and select an image.</p>';
        return;
    }

    try {
        const response = await fetch('../images.json');
        const data = await response.json();

        const categories = Object.values(data); 
        let imageDetails = null;

        for (const category of categories) {
            imageDetails = category.find(item => item.name === selectedImageName);
            if (imageDetails) break;
        }

        if (imageDetails) {

            const container = document.getElementById('details-container');
            container.innerHTML += `
                <img src="${imageDetails['image-url']}" alt="${imageDetails.name}" class="img">
                <h1>${imageDetails.name}</h1>
                <h4 id="val1"><strong>Genre :</strong></h4><p id="genre">${imageDetails.genre}</p>
                <h4 id="val2"><strong>Total Seasons :</strong></h4><p id="description">${imageDetails.description}</p>
                <h4 id="val3"><strong>Released Year :</strong></h4><p id="season">${imageDetails['total-seasons']}</p>
                <h4 id="val4"><strong>Description :</strong></h4><p id="year">${imageDetails['released-year']}</p>
                <p id="available">${imageDetails['availability']}</p>
            `;


            if (imageDetails['voice-actors']) {
                const voiceActorsContainer = document.createElement('div');
                voiceActorsContainer.className = "voice-actors-container";
                voiceActorsContainer.innerHTML = `<h4><strong>Voice Actors:</strong></h4>`;
                for (const [character, voiceActor] of Object.entries(imageDetails['voice-actors'])) {
                    voiceActorsContainer.innerHTML += `
                    
                        <div class="voice-actor">
                            <div>
                                <h5>${character}</h5>
                                <p>${voiceActor.name}</p>
                            </div>
                            <img src="${voiceActor.img}" alt="${voiceActor.name}" class="voice-actor-img draggable="false">
                        </div>
                    `;
                }
                container.appendChild(voiceActorsContainer);
            }

            // Display trailer if available
            if (imageDetails['trailer']) {
                container.innerHTML += `
                    <button id="trailer-btn"><strong>Watch</strong></button>
                `;
                // const exitButton = document.getElementById("exit");
                // exitButton.addEventListener("click", () => {
                //     const videoTrailer = document.querySelector(".video-trailer");
                //     exitButton.style.display = "none";
                //     videoTrailer.style.display = "none";
                // });
                const trailerBtn = document.getElementById("trailer-btn");
                trailerBtn.addEventListener("click", () => {
                    window.location.href = "../trailer.html";  
                });
            }

            // Styling for availability status
            const available = document.getElementById("available");
            if (available.innerText === "Available") {
                available.style.color = "green";
            } else {
                available.style.color = "red";
            }
        } else {
            document.body.innerHTML = '<p>Details not found for the selected image.</p>';
        }
    } catch (error) {
        console.error('Error fetching or processing JSON data:', error);
        document.body.innerHTML = '<p>Error loading details. Please try again later.</p>';
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const watchLaterButton = document.getElementById("watch-later");
    const selectedImageName = localStorage.getItem('selectedImageName');
    let watchLaterList = JSON.parse(localStorage.getItem('watchLaterList')) || [];

    // Update button text if anime is already in list
    if (selectedImageName && watchLaterList.includes(selectedImageName)) {
        watchLaterButton.textContent = "Remove from Watch Later";
    }

    if (watchLaterButton) {
        watchLaterButton.addEventListener('click', () => {
            if (!selectedImageName) {
                alert('No anime or movie selected!');
                return;
            }

            if (watchLaterList.includes(selectedImageName)) {
                // Remove from list
                watchLaterList = watchLaterList.filter(item => item !== selectedImageName);
                watchLaterButton.textContent = "Add to Watch Later";
                showMessage(`${selectedImageName} has been removed from your Watch Later list!`);
            } else {
                // Add to list
                watchLaterList.push(selectedImageName);
                watchLaterButton.textContent = "Remove from Watch Later";
                showMessage(`${selectedImageName} has been added to your Watch Later list!`);
            }

            // Save updated list
            localStorage.setItem('watchLaterList', JSON.stringify(watchLaterList));
        });
    } else {
        console.error("Watch Later button not found in the DOM.");
    }
});







// Notification function
const showMessage = (message, type = 'success') => {
    const messageContainer = document.createElement('div');
    messageContainer.textContent = message;
    messageContainer.style.background = type === 'success' ? 'green' : 'red';
    messageContainer.style.color = 'white';
    messageContainer.style.padding = '10px';
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '250px';
    messageContainer.style.right = '40px';
    messageContainer.style.zIndex = '1000';
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        messageContainer.style.display = "none";

    }, 3000);
};



