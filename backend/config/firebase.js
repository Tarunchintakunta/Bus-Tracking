// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import additional Firebase SDKs as needed
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzo4FpMm1AnPj1jm7GHraaN2NOqJQnWD0",
  authDomain: "buzz-9d34a.firebaseapp.com",
  projectId: "buzz-9d34a",
  storageBucket: "buzz-9d34a.appspot.com",
  messagingSenderId: "392604809072",
  appId: "1:392604809072:web:2cfe03facc058b3b3281b5",
  measurementId: "G-HQKRJJ3E3Q"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Additional Firebase SDKs
const auth = getAuth(app); // Firebase Authentication
const firestore = getFirestore(app); // Cloud Firestore


export default app;