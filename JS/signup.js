
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



//submit button
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
    event.preventDefault() //please understand what this line of code means..
    
    //inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const span1= document.getElementById("sp1");
            const span2= document.getElementById("sp2");
            window.location.href = "home.html";
            span1.textContent = "Signup Successfully Successful";
            span1.style.color = "green";
            span2.textContent = "Redirecting to Anime-Galaxy...";
            span2.style.color = "green";
            span1.style.display = "block";
            span2.style.display = "block";
        })
        .catch((error) => {
            const span1= document.getElementById("sp1");
            const span2= document.getElementById("sp2");
            span1.textContent = "Email already in use";
            span1.style.color = "red";
            span1.style.display = "block";
            span2.textContent = "Please Use Different Email";
            span2.style.color = "red";
            span2.style.display = "block";
        });
});

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword")
togglePassword.addEventListener('click', () => {
  // Toggle password input type
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
})