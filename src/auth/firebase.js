// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4yIA77plU5QfqwOemNXScBvsUZguwL3Q",
  authDomain: "royalpoker-84b7b.firebaseapp.com",
  projectId: "royalpoker-84b7b",
  storageBucket: "royalpoker-84b7b.appspot.com",
  messagingSenderId: "261361531652",
  appId: "1:261361531652:web:027824f9204832cd13ee51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);