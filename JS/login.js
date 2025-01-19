const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const loadingSpinner = document.getElementById("loadingSpinner");

// Backend API URL
const API_URL = "https://anime-ott.onrender.com";

// Login functionality
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Show the loading spinner
    loadingSpinner.style.display = "flex";

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // Save Watch Later list in localStorage
            localStorage.setItem("watchLaterList", JSON.stringify(result.watchLaterList || []));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("Username", email);
            localStorage.setItem("Password", password);
            localStorage.setItem("name", result.name);

            // Redirect to home page
            loginMessage.style.color = "green";
            loginMessage.textContent = `Login successful! Redirecting...`;
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1000);
        } else {
            loginMessage.textContent = result.error || "Login failed. Please try again.";
            loginMessage.style.color = "red";
        }
    } catch (error) {
        loginMessage.textContent = "An error occurred. Please try again later.";
        loginMessage.style.color = "red";
        console.error("Login error:", error);
    } finally {
        // Hide the loading spinner
        loadingSpinner.style.display = "none";
    }
});

const password = document.getElementById("loginPassword");
const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", () => {
    // Toggle password input type
    const text = togglePassword.textContent === "SHOW" ? "HIDE" : "SHOW";
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    togglePassword.textContent = text;
});

window.addEventListener("load", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        window.location.href = "home.html";
    }
});




// // Signup functionality
// signupForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const username = document.getElementById("signupUsername").value;
//   const password = document.getElementById("signupPassword").value;

//   const response = await fetch(`${API_URL}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   });

//   const data = await response.json();
//   if (response.ok) {
//     signupMessage.style.color = "green";
//     signupMessage.textContent = "Signup successful! Please login.";
//   } else {
//     signupMessage.style.color = "red";
//     signupMessage.textContent = data.error || "Signup failed!";
//   }
// });



  // const response = await fetch(`${API_URL}/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });

  // const data = await response.json();
  // if (response.ok) {
  //   loginMessage.style.color = "green";
  //   // loginMessage.textContent = `Login successful! Token: ${data.token}`;
  //   loginMessage.textContent = `Login successful!`;
  //   localStorage.setItem("isLoggedIn", "true");
  //   localStorage.setItem("Username", email);
  //   localStorage.setItem("Password", password);
  //   window.location.href = "home.html";
  // } else {
  //   loginMessage.style.color = "red";
  //   loginMessage.textContent = data.error || "Login failed!";
  // }


  
// const signup = document.getElementById("signup");
// signup.addEventListener("click", () => {
//   window.location.href = "signup.html";
// })

