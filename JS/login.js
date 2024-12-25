document.body.style.zoom = "95%";
const API_URL = "https://anime-ott.onrender.com";

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('sp2');

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = `Success: ${data.message}`;
      window.location.href = 'home.html';
    } else {
      message.style.color = 'red';
      message.textContent = `Error: ${data.error || 'Failed to login'}`;
    }
  } catch (error) {
    message.style.color = 'red';
    message.textContent = `Error: ${error.message}`;
  }
}



const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword")
togglePassword.addEventListener('click', () => {
  // Toggle password input type
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
})


const signup = document.getElementById("signup");
signup.addEventListener("click", () => {
  window.location.href = "signup.html";
})


window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    window.location.href = "home.html";
  }
});
