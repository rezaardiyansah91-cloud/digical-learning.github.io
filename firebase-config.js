// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDgCFxMkWpEigaiTw5YQVoCfpV-S4RV5o4",
    authDomain: "digical-learning.firebaseapp.com",
    projectId: "digical-learning",
    storageBucket: "digical-learning.firebasestorage.app",
    messagingSenderId: "920371103734",
    appId: "1:920371103734:web:4f877923bd0acdf65729d7",
    measurementId: "G-RSXKH4N38F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);