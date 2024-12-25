document.body.style.zoom = "95%";
// // 
// const pattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

async function register() {
  const username = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('sp2');

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = `Success: ${data.message}`;
    } else {
      message.style.color = 'red';
      message.textContent = `Error: ${data.error || 'Failed to register'}`;
    }
  } catch (error) {
    message.style.color = 'red';
    message.textContent = `Error: ${error.message}`;
  }
}

window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    window.location.href = "home.html";
  }
})
// Password toggle
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});