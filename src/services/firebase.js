// Import the Firebase SDK packages
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
// Note: In a production environment, these values should be stored in environment variables
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "pridepulse.firebaseapp.com",
  projectId: "pridepulse",
  storageBucket: "pridepulse.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const analytics = getAnalytics(app);

// Configure Google Auth provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Export the initialized services
export {
  auth,
  googleProvider,
  db,
  storage,
  functions,
  analytics
};

/**
 * Firebase Authentication functions for PridePulse
 * 
 * These functions support SDG 5 (Gender Equality) and SDG 10 (Reduced Inequalities)
 * by providing secure and inclusive login options for all users regardless of gender 
 * identity or sexual orientation.
 */

// Additional security and helper functions can be added here 