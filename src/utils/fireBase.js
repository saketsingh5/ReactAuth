// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtItp6hF-1MquY5zDK5cFMdPUxJE70o4w",
  authDomain: "netflixgpt-cd09d.firebaseapp.com",
  projectId: "netflixgpt-cd09d",
  storageBucket: "netflixgpt-cd09d.appspot.com",
  messagingSenderId: "41090870650",
  appId: "1:41090870650:web:031880b97728ffd2fafac3",
  measurementId: "G-22GKHSZ168"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
