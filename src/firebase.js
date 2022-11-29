// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXVqL_w64IVqFqKhSSAtTPxjO9VyVKJYY",
  authDomain: "sell3r.firebaseapp.com",
  projectId: "sell3r",
  storageBucket: "sell3r.appspot.com",
  messagingSenderId: "193239112680",
  appId: "1:193239112680:web:dac6963b39bc329994e25d",
  measurementId: "G-YPJZ85EK1W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);