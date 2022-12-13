//import firebase from "./firebase";

import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

//const functions = require('firebase-functions');
//const admin = require('firebase-admin');

//const {Firestore} = require('@google-cloud/firestore');
//import {Firestore} from 'google-cloud/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

/* const initializeAppIfNecessary = () => {
    try {
      return getApp()
    } catch {
      return initializeApp(firebaseConfig)
    }
  } */
  //console.log('FirebaseOptions',FirebaseOptions);

  //let app = initializeAppIfNecessary()
  const app = initializeApp(firebaseConfig);
//  const clientAuth = getAuth(app)

//const initFirebase = firebase.initializeApp(firebaseConfig);

//admin.initializeApp();

//const initFirebase = initializeAppIfNecessary();

//export const auth = getAuth(initFirebase);

//const db = initFirebase.firestore();
const auth = getAuth(app);
const db = getFirestore(app);//.firestore();



//console.log('FirebaseOptions',FirebaseOptions);

//export default {db, auth};
export const storage = getStorage(app)
export default db;
