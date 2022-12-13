// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-YN_LfP2yA44MeXOYl0HdG0ZI5X9OgpA",
  authDomain: "natter-9205b.firebaseapp.com",
  projectId: "natter-9205b",
  storageBucket: "natter-9205b.appspot.com",
  messagingSenderId: "805675701457",
  appId: "1:805675701457:web:9e0e41250ecf3de53461f0",
  measurementId: "G-8BK026DKHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
