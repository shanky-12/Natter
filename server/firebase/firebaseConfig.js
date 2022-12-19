// import initializeApp from 'firebase/app';
// import getFirestore from 'firebase/firestore';
// // import getAuth from 'firebase/auth';
// import getStorage from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwW5MAaZnlKbS1Dco56phNfzyCdzHtKqs",
  authDomain: "reddit-clone-e7b5e.firebaseapp.com",
  projectId: "reddit-clone-e7b5e",
  storageBucket: "reddit-clone-e7b5e.appspot.com",
  messagingSenderId: "531880462982",
  appId: "1:531880462982:web:80d17d2c40e8800e271f07",
  measurementId: "G-e7b5e"
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
console.log(firebaseConfig.apiKey)

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app)

// const auth = getAuth(app);
const db = getFirestore(app);//.firestore();



//console.log('FirebaseOptions',FirebaseOptions);

//export default {db, auth};
// export const storage = storage1;
// export default db;

export default app;
export { db, firebaseStorage};