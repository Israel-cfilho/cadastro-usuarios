import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtSSlQ4eJWsACD8IIPuMPr3Cg6MfPIV3w",
    authDomain: "curso-b886e.firebaseapp.com",
    projectId: "curso-b886e",
    storageBucket: "curso-b886e.firebasestorage.app",
    messagingSenderId: "135589599667",
    appId: "1:135589599667:web:350adbed10f0dd0104d3c6",
    measurementId: "G-42GQ7VT8D5"
  };


  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


export { db };