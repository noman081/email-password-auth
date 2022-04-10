// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkiJj27KNygfAiIOTe_6yVVzQZjMizDwg",
    authDomain: "simple-password-auth.firebaseapp.com",
    projectId: "simple-password-auth",
    storageBucket: "simple-password-auth.appspot.com",
    messagingSenderId: "776198446509",
    appId: "1:776198446509:web:3a4b50e2764e9016cd1524"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;