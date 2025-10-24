// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN-k26xP7PhH7AVhzBRKpqIHA23_wUKHg",
  authDomain: "htma-genius.firebaseapp.com",
  projectId: "htma-genius",
  storageBucket: "htma-genius.firebasestorage.app",
  messagingSenderId: "240444522493",
  appId: "1:240444522493:web:a9946b9e85e5bb0f482394",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize individual services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Export the Firebase app instance (optional, but useful)
export default app;
