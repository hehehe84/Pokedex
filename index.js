// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVymZMun_l26fae8Gt9u1otdQX-EGX-hY",
    authDomain: "pokedex-97f6b.firebaseapp.com",
    projectId: "pokedex-97f6b",
    storageBucket: "pokedex-97f6b.appspot.com",
    messagingSenderId: "907641663703",
    appId: "1:907641663703:web:e757b3c82a6b70b68e4092",
    measurementId: "G-D7NBDN4RNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);