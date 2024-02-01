// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sahandestate.firebaseapp.com",
  projectId: "sahandestate",
  storageBucket: "sahandestate.appspot.com",
  messagingSenderId: "174091600005",
  appId: "1:174091600005:web:e7694e2167444b694f29ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);