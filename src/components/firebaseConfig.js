// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAwC989QOz8SH1tvMrISPVcUgBt3aPDPEY",
  authDomain: "login-signin-6dd4c.firebaseapp.com",
  projectId: "login-signin-6dd4c",
  storageBucket: "login-signin-6dd4c.firebasestorage.app",
  messagingSenderId: "210982346484",
  appId: "1:210982346484:web:fe39d2fa751b627544c8a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

export { auth };