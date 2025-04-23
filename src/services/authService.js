// Import Firebase services
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { setDoc, getDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, googleProvider, db, storage } from './firebase';

/**
 * Authentication and user profile services for PridePulse
 * 
 * These services support:
 * - SDG 5 (Gender Equality): By allowing inclusive user registration with diverse gender identities and pronouns
 * - SDG 10 (Reduced Inequalities): By creating a safe digital space for LGBTQ+ communities
 */

// Register a new user with email and password
export const registerWithEmail = async (email, password, profileData) => {
  try {
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Set the display name
    await updateProfile(user, {
      displayName: profileData.displayName
    });
    
    // Create user profile document in Firestore
    await createUserProfile(user.uid, profileData);
    
    return { user };
  } catch (error) {
    return { error };
  }
};

// Login with email and password
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    return { error };
  }
};

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Check if the user profile exists, if not create it
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
    if (!userDoc.exists()) {
      // Create a basic profile for Google sign-in users
      const profileData = {
        displayName: result.user.displayName || '',
        email: result.user.email,
        photoURL: result.user.photoURL || '',
        // Default values for required fields
        pronouns: '',
        genderIdentity: '',
        sexualOrientation: '',
        age: null,
        location: '',
        interests: [],
        bio: '',
        visibilitySettings: {
          profileVisible: true,
          locationVisible: false,
          ageVisible: true
        }
      };
      
      await createUserProfile(result.user.uid, profileData);
    }
    
    return { user: result.user };
  } catch (error) {
    return { error };
  }
};

// Logout the current user
export const logout = async () => {
  console.log('User logged out (mock implementation)');
  return { success: true };
};

// Create a user profile in Firestore
export const createUserProfile = async (userId, profileData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      displayName: profileData.displayName || '',
      email: profileData.email || '',
      photoURL: profileData.photoURL || '',
      pronouns: profileData.pronouns || '',
      genderIdentity: profileData.genderIdentity || '',
      sexualOrientation: profileData.sexualOrientation || '',
      age: profileData.age || null,
      location: profileData.location || '',
      interests: profileData.interests || [],
      bio: profileData.bio || '',
      visibilitySettings: profileData.visibilitySettings || {
        profileVisible: true,
        locationVisible: false,
        ageVisible: true
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Get the current user's profile
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      return { profile: userDoc.data() };
    } else {
      return { error: 'Profile not found' };
    }
  } catch (error) {
    return { error };
  }
};

// Update a user's profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...profileData,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Upload a profile photo
export const uploadProfilePhoto = async (userId, photoFile) => {
  try {
    // Create a reference to the photo storage location
    const photoRef = ref(storage, `profile_photos/${userId}`);
    
    // Upload the file
    await uploadBytes(photoRef, photoFile);
    
    // Get the download URL
    const photoURL = await getDownloadURL(photoRef);
    
    // Update the user profile with the photo URL
    await updateDoc(doc(db, 'users', userId), {
      photoURL,
      updatedAt: serverTimestamp()
    });
    
    // Also update the auth profile
    await updateProfile(auth.currentUser, {
      photoURL
    });
    
    return { photoURL };
  } catch (error) {
    return { error };
  }
};

// Send a password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
}; 