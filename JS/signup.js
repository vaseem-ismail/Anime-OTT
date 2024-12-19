document.body.style.zoom = "100%";


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8UXjRVjJYFHGa5qQcXxjeGIG-GaxygQk",
  authDomain: "login-cee79.firebaseapp.com",
  projectId: "login-cee79",
  storageBucket: "login-cee79.appspot.com",
  messagingSenderId: "631395607545",
  appId: "1:631395607545:web:45fd2f3293108e30555328"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);



// 
const pattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

  // Elements
  const submitBtn = document.getElementById("submit");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const span1 = document.getElementById("sp1");
  const span2 = document.getElementById("sp2");

  // Password toggle
  const togglePassword = document.getElementById("togglePassword");
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });

  // Submit button click event
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    console.log("Starting validation..."); // Debugging checkpoint

    // Validation
    if (!email) {
      span1.textContent = "Please enter your email.";
      span1.style.color = "red";
      span1.style.display = "block";
      return;
    }

    if (!password) {
      span2.textContent = "Please enter your password.";
      span2.style.color = "red";
      span2.style.display = "block";
      return;
    }

    if (password.length < 8) {
      span2.textContent = "Password must be at least 8 characters";
      span2.style.color = "red";
      span2.style.display = "block";
      return;
    }
    if(!pattern.test(password)){
      span2.textContent = "Pass must contain one special character";
      span2.style.color = "red";
      span2.style.display = "block";
      return;
    }

    console.log("Validation passed. Proceeding to Firebase..."); // Debugging checkpoint

    // Firebase authentication
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Firebase success:", userCredential); // Debugging checkpoint

        const user = userCredential.user;
        span1.textContent = "Signup Successful!";
        span1.style.color = "green";
        span1.style.display = "block";
        localStorage.setItem("isLoggedIn", "true");
        span2.textContent = "Redirecting to Anime-Galaxy...";
        span2.style.color = "green";
        span2.style.display = "block";

        setTimeout(() => {
          window.location.href = "home.html";
        }, 2000); // Delay for user feedback
      })
      .catch((error) => {
        console.log("Firebase error:", error); // Debugging checkpoint

        if (error.code === "auth/email-already-in-use") {
          span1.textContent = "Email already in use.";
          span1.style.color = "red";
          span1.style.display = "block";

          span2.textContent = "Please use a different email.";
          span2.style.color = "red";
          span2.style.display = "block";
        } else {
          span1.textContent = "An error occurred.";
          span1.style.color = "red";
          span1.style.display = "block";

          span2.textContent = error.message;
          span2.style.color = "red";
          span2.style.display = "block";
        }
      });
  });
  window.addEventListener("load", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      window.location.href = "home.html";
    }
  });
  