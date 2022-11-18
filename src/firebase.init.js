// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-WyO2D08cxYoivNiIgwA0aT-lNN_u8Jw",
    authDomain: "rokomari-bcf14.firebaseapp.com",
    projectId: "rokomari-bcf14",
    storageBucket: "rokomari-bcf14.appspot.com",
    messagingSenderId: "636168728258",
    appId: "1:636168728258:web:18b166353c5d987d9b955b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);