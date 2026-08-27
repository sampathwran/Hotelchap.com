import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiuLmkscXaDJ2gBtOvKMnqhvcnOmWqRsM",
  authDomain: "auth.hotelchap.com",
  projectId: "hotelchap-8926a",
  storageBucket: "hotelchap-8926a.firebasestorage.app",
  messagingSenderId: "649987888032",
  appId: "1:649987888032:web:bfb040f6ef19844bf6cac5",
  measurementId: "G-TQ9GZ94KWZ"
};

// Initialize Firebase (Check if already initialized to prevent Next.js HMR errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
