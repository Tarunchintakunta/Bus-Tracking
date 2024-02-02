// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import additional Firebase SDKs as needed
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Replace Your firebaseConfig below in order
const firebaseConfig = {
  apiKey: "Your apikey",
  authDomain: "your authdomain",
  projectId: "Your projectid",
  storageBucket: "Your storageBucket",
  messagingSenderId: "Your messagingSenderId",
  appId: "Your appId",
  measurementId: "Your measurement ID"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Additional Firebase SDKs
const auth = getAuth(app); // Firebase Authentication
const firestore = getFirestore(app); // Cloud Firestore


export default app;
