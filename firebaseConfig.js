// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdphzLeqWYsWqKgrM1RWOojVVIixoq4Qo",
  authDomain: "app-mlp-4fc3e.firebaseapp.com",
  projectId: "app-mlp-4fc3e",
  storageBucket: "app-mlp-4fc3e.appspot.com",
  messagingSenderId: "720156579933",
  appId: "1:720156579933:web:89d6dc1ced245e2e7c55b4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const auth = getAuth(FIREBASE_APP);