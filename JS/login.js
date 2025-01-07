const loginForm = document.getElementById("loginForm");
// const signupForm = document.getElementById("signupForm");
const loginMessage = document.getElementById("loginMessage");
// const signupMessage = document.getElementById("signupMessage");

// Backend API URL
// const API_URL = "https://anime-ott.onrender.com";
const API_URL = "http://localhost:5000";

// Login functionality
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      // Save Watch Later list in localStorage
      localStorage.setItem('watchLaterList', JSON.stringify(result.watchLaterList || []));

      // // Save the JWT token in localStorage (optional for session management)
      // localStorage.setItem('jwtToken', result.token);

      // Redirect to profile page
      window.location.href = 'home.html';
      loginMessage.style.color = "green";
      loginMessage.textContent = `Login successful!`;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("Username", email);
      localStorage.setItem("Password", password);
    } else {
      errorMessage.textContent = result.error || 'Login failed. Please try again.';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    errorMessage.textContent = 'An error occurred. Please try again later.';
    errorMessage.style.display = 'block';
    console.error('Login error:', error);
  }

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
  const text = togglePassword.textContent === 'SHOW' ? 'HIDE' : 'SHOW';
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  togglePassword.textContent = text;
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
