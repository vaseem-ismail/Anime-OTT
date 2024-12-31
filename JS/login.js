const loginForm = document.getElementById("loginForm");
// const signupForm = document.getElementById("signupForm");
const loginMessage = document.getElementById("loginMessage");
// const signupMessage = document.getElementById("signupMessage");

// Backend API URL
const API_URL = "https://anime-ott.onrender.com";

// Login functionality
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    loginMessage.style.color = "green";
    // loginMessage.textContent = `Login successful! Token: ${data.token}`;
    loginMessage.textContent = `Login successful!`;
    window.location.href = "home.html";
  } else {
    loginMessage.style.color = "red";
    loginMessage.textContent = data.error || "Login failed!";
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


const password = document.getElementById("loginPassword");
const togglePassword = document.getElementById("togglePassword")
togglePassword.addEventListener('click', () => {
  // Toggle password input type
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
})


// const signup = document.getElementById("signup");
// signup.addEventListener("click", () => {
//   window.location.href = "signup.html";
// })


window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    window.location.href = "home.html";
  }
});
