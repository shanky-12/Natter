
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

//Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
const firebaseStorage = getStorage(app)

const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { db, auth, firebaseStorage};