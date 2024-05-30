// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQfbXyoedma3sYNXABT6vNgDwqapVflUk",
  authDomain: "finance-tracker-65472.firebaseapp.com",
  projectId: "finance-tracker-65472",
  storageBucket: "finance-tracker-65472.appspot.com",
  messagingSenderId: "710433632229",
  appId: "1:710433632229:web:d1054d574c673e1e53090c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };

