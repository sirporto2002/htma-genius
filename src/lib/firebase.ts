// src/lib/firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig"; // Import the config you created

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// You can add other services here as needed (e.g., getStorage)
// Example:
// import { getStorage, FirebaseStorage } from "firebase/storage";
// export const storage: FirebaseStorage = getStorage(app);

console.log("Firebase initialized successfully!");
