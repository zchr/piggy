import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9hM-oSWTc3oXreGPSN0e7T4vKV22xCG4",
    authDomain: "piggy-17d8c.firebaseapp.com",
    projectId: "piggy-17d8c",
    storageBucket: "piggy-17d8c.appspot.com",
    messagingSenderId: "469740290881",
    appId: "1:469740290881:web:acdb15231211e3f29b17c0",
    measurementId: "G-0F7S2MSP04"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;