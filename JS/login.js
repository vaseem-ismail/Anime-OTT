

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
      window.location.href="home.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});