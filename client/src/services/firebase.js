import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-dOKoHBLC1VEpJDNzt22raubJBfc2u9U",
  authDomain: "brance-dev.firebaseapp.com",
  projectId: "brance-dev",
  storageBucket: "brance-dev.appspot.com",
  messagingSenderId: "674533390838",
  appId: "1:674533390838:web:bcb7accc26504276146fd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage };
