// firebaseConfig.js or similar file
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // for authentication of users to log in with their email
import { getFirestore } from "firebase/firestore";

// Importing environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER,
  appId: import.meta.env.VITE_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // for authentication of users to log in with their email
const db = getFirestore(app); // to use Firestore as the Firebase app instance

// Export the initialized instances
export { app, auth, db };
