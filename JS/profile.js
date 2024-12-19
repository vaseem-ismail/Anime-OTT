document.body.style.zoom = "90%";

// Firebase initialization
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8UXjRVjJYFHGa5qQcXxjeGIG-GaxygQk",
  authDomain: "login-cee79.firebaseapp.com",
  projectId: "login-cee79",
  storageBucket: "login-cee79.appspot.com",
  messagingSenderId: "631395607545",
  appId: "1:631395607545:web:45fd2f3293108e30555328"
};


window.addEventListener("click",()=>{

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Retrieve email from localStorage
const userEmail = localStorage.getItem("Username");

if (userEmail) {
  // Query Firestore for user data
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("email", "==", userEmail));

  getDocs(q)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          const userData = docSnapshot.data();
          const userId = docSnapshot.id;

          // Populate fields dynamically
          document.getElementById("email").value = userData.email || "";
          document.getElementById("username").value =
            userData.username || `Unknown_${Date.now()}`;

          // Save Profile Changes
          document
            .getElementById("saveProfileBtn")
            .addEventListener("click", () => saveProfile(userId));

          // Add Watch Later
          document
            .getElementById("addWatchLaterBtn")
            .addEventListener("click", () => addToWatchLater(userId));
        });
      } else {
        alert("User not found!");
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

// Save Profile Changes
async function saveProfile(userId) {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      username: username,
      email: email
    });
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}

// Add to Watch Later
async function addToWatchLater(userId) {
  const item = prompt("Enter item to add to Watch Later:");
  if (item) {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        watchLater: arrayUnion(item)
      });
      alert("Added to Watch Later!");
    } catch (error) {
      console.error("Error adding to Watch Later:", error);
    }
  }
}
    
})