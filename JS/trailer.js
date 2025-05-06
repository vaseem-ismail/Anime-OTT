const Suggestions = document.getElementById("Suggestions");
const VideoPlayer = document.getElementById("videoPlayer");
const HeaderH1 = document.getElementById("headin");
const Random = document.getElementById("random");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("../images.json");
        const data = await response.json();
        const selectedImageName = localStorage.getItem("selectedImageName");
        const categories = Object.values(data);

        let imageDetails = null;

        // Step 1: Find the selected anime from all categories
        for (const category of categories) {
            const found = category.find(item => item.name === selectedImageName);
            if (found) {
                imageDetails = found;
                break;
            }
        }

        if (!imageDetails) throw new Error("Selected anime not found");

        // Step 2: Show the main trailer
        if (imageDetails["trailer"]) {
            VideoPlayer.innerHTML = `
                <video class="video-trailer" controls>
                    <source src="${imageDetails["trailer"]}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div id="infos">
                    <p>Genre : ${imageDetails["genre"]}</p>
                    <p>Released Year : ${imageDetails["released-year"]}</p>
                    <p>Total Seasons : ${imageDetails["total-seasons"]}</p>
                </div>
                <p class="description">${imageDetails["description"]}</p>
            `;
            HeaderH1.textContent = imageDetails["name"];
        }

        // Step 3: Get suggestions from same genre, exclude the current one
        const genre = imageDetails.genre;
        const suggestions = [];

        for (const category of categories) {
            category.forEach(item => {
                if (item.genre === genre && item.name !== selectedImageName && item.trailer) {
                    suggestions.push(item);
                }
            });
        }

        // Optional: Shuffle suggestions
        suggestions.sort(() => Math.random() - 0.5);

        // Step 4: Render suggestions (limit to 3)
        Suggestions.innerHTML = "";
        suggestions.slice(0, 3).forEach(sug => {
            Suggestions.innerHTML += `
            <div class="elements" data-name="${sug.name}">
                <img class="inner-sug" src="${sug["image-url"]}" alt="suggestedimg"/>
                <p class="title">${sug["name"]}</p>
            </div>
            `;
        });

        document.querySelectorAll(".elements").forEach(element => {
            element.addEventListener("click", () => {
                const animeName = element.getAttribute("data-name");
                localStorage.setItem("selectedImageName", animeName);
                location.reload(); // reload to play the clicked suggestion
            });
        });
        const RandomSuggest = []
        Random.innerHTML = "";

        for (const category of categories) {
            category.forEach(item => {
                if (item.name !== selectedImageName && item.trailer) {
                    RandomSuggest.push(item);
                }
            });
        }
        RandomSuggest.forEach(sug => {
            Random.innerHTML += `
            <div class="elements" data-name="${sug.name}">
                <img class="inner-sug" src="${sug["image-url"]}" alt="suggestedimg"/>
                <p class="title">${sug["name"]}</p>
            </div>
            `
        })

        document.querySelectorAll(".elements").forEach(element => {
            element.addEventListener("click", () => {
                const animeName = element.getAttribute("data-name");
                localStorage.setItem("selectedImageName", animeName);
                location.reload(); // reload to play the clicked suggestion
            });
        });

    } catch (error) {
        console.error('Error fetching or processing JSON data:', error);
        document.body.innerHTML = '<p>Error loading details. Please try again later.</p>';
    }
});

