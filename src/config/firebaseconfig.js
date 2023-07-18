// Import the functions you need from the SDKs you need
import { initializeApp,} from "firebase/app";
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAprtbcGF2Jh1iSR4GeTDOqSgHwigWqMM",
  authDomain: "app-mlp.firebaseapp.com",
  projectId: "app-mlp",
  storageBucket: "app-mlp.appspot.com",
  messagingSenderId: "829901441559",
  appId: "1:829901441559:web:d696ef5c93dd44af766a52",
  measurementId: "G-MMXSZNDL84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app