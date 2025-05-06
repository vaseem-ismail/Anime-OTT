const newPass = document.getElementById("new-password");
const confirmPass = document.getElementById("confirm-new-password");

// const API_URL = "https://anime-ott.onrender.com"
const API_URL = "http://127.0.0.1:5000"

const message = document.getElementById("message");

let UserName = "";


if (token) {
    try {
        const decoded = jwt_decode(token);
        UserName = decoded.username;
    } catch (err) {
        console.error("Invalid token", err);
    }
} else {
    console.warn("No token found in localStorage");
}


document.addEventListener('DOMContentLoaded', () => {
    const changeBtn = document.getElementById("change-btn");

    changeBtn.addEventListener("click", async () => {
        async function GetData() {
            const currentPass = document.getElementById("current-password").value;
            const newPass = document.getElementById("new-password").value;
            const confirmPass = document.getElementById("confirm-new-password").value;

            if( currentPass == newPass){
                alert("New password cannot be the same as the current password.");
                message.textContent = "New password cannot be the same as the current password.";
                return;
            }
            if( newPass !== confirmPass) {
                alert("New password and confirmation do not match.");
                message.textContent = "New password and confirmation do not match.";
                return;
            }
            

            const fetch = await fetch(`${API_URL}/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": {},
                    "newPassword": newPass
                })
            });
            const response = await fetch.json();
            console.log(response);
            if (response.status == "success") {
                message.textContent = response.message;
                // alert("Password changed successfully!");
            } else if (response.status == "error") {
                message.textContent = response.message;
                // alert(res ponse.message);
            } else {
                message.textContent = "An unexpected error occurred. Please try again later.";
                // alert("An unexpected error occurred. Please try again later.");
            }
        }
        GetData();
    })
})