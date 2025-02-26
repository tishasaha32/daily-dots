import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdG5mnnbnIcSSKVMGKatrd7NfSHFoJg9c",
  authDomain: "daily-dots-db5a0.firebaseapp.com",
  projectId: "daily-dots-db5a0",
  storageBucket: "daily-dots-db5a0.firebasestorage.app",
  messagingSenderId: "12279697443",
  appId: "1:12279697443:web:05435a50cca196fa05a196",
  measurementId: "G-E5DYXTJGSD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
