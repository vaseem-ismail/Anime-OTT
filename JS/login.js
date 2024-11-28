

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyC8UXjRVjJYFHGa5qQcXxjeGIG-GaxygQk",
  authDomain: "login-cee79.firebaseapp.com",
  projectId: "login-cee79",
  storageBucket: "login-cee79.appspot.com",
  messagingSenderId: "631395607545",
  appId: "1:631395607545:web:45fd2f3293108e30555328"
};


const app = initializeApp(firebaseConfig);
//submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault() //please understand what this line of code means..
  const auth = getAuth();
  //inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      window.location.href = "home.html";
      localStorage.setItem("Username", email);
      localStorage.setItem("Password", password);
      localStorage.setItem("isLoggedIn", "true");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });


  // Get values from localStorage
  const localEmail = localStorage.getItem("Username");
  const localPass = localStorage.getItem("Password");

  // Validation
  const span1 = document.getElementById("sp1");
  const span2 = document.getElementById("sp2");
 

  // Ensure localStorage contains valid data
  if (localEmail && localPass) {
    if (email !== localEmail) {
      span1.textContent = "Please Enter a Correct Email";
      span1.style.display = "block";
      span1.style.color = "red";
    }
    else if (password !== localPass) {
      span2.textContent = "Please enter correct Password";
      span2.style.display = "block";
      span2.style.color = "red";
    }
    else {
      span1.textContent = "Email verified Successfully";
      span1.style.display = "block";
      span1.style.color = "green";

      span2.textContent = "Password Verified Successfully";
      span2.style.display = "block";
      span2.style.color = "green";
    }
  } else {
    span1.textContent = "No stored data found, please sign up.";
    span1.style.display = "block";
    span1.style.color = "red";
  }


});
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
