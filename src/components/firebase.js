// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8WmykL0j6CXhYdP3Wh2-u-QmTow3XbjY",
  authDomain: "img-trip.firebaseapp.com",
  projectId: "img-trip",
  storageBucket: "img-trip.appspot.com",
  messagingSenderId: "759507487126",
  appId: "1:759507487126:web:e76f6f6ebf1dd7a7feb5b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);