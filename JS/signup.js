window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    window.location.href = "home.html";
  }
})
// Password toggle
const API_URL = "https://anime-ott.onrender.com";
const passwordInput = document.getElementById("signupPassword");
const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", () => {
  const text = togglePassword.textContent === "SHOW" ? "HIDE" : "SHOW";
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.textContent = text;
});


const signupMessage = document.getElementById("signupMessage");
const signupForm = document.getElementById("signupForm");
// Signup functionality
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const username = document.getElementById("name").value;

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password , email}),
  });

  const data = await response.json();
  if (response.ok) {
    signupMessage.style.color = "green";
    signupMessage.textContent = "Signup successful! Redirecting to Home page...";
    window.location.href = "home.html";
    localStorage.setItem("Username", email);
    localStorage.setItem("name", username);
  } else {
    signupMessage.style.color = "red";
    signupMessage.textContent = data.error || "Signup failed!";
  }
});