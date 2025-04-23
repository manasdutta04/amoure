// Import Firebase services
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  serverTimestamp, 
  deleteDoc, 
  arrayUnion, 
  arrayRemove,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Matching services for PridePulse
 * 
 * These services support:
 * - SDG 5 (Gender Equality): By providing inclusive matching that respects diverse gender identities
 * - SDG 10 (Reduced Inequalities): By helping connect marginalized LGBTQ+ individuals within a safe environment
 */

// Get potential matches for a user based on preferences
export const getPotentialMatches = async (userId, preferences = {}, lastVisible = null, matchesLimit = 10) => {
  try {
    // Get the user's profile
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return { error: 'User not found' };
    }
    
    const userData = userDoc.data();
    
    // Build the query based on the user's preferences
    let matchQuery = query(collection(db, 'users'));
    const queryFilters = [];
    
    // Filter out the current user
    queryFilters.push(where('__name__', '!=', userId));
    
    // Apply age filter if provided
    if (preferences.minAge && preferences.maxAge) {
      queryFilters.push(where('age', '>=', preferences.minAge));
      queryFilters.push(where('age', '<=', preferences.maxAge));
    }
    
    // Apply gender identity filter if provided
    if (preferences.genderIdentities && preferences.genderIdentities.length > 0) {
      queryFilters.push(where('genderIdentity', 'in', preferences.genderIdentities));
    }
    
    // Apply sexual orientation filter if provided
    if (preferences.sexualOrientations && preferences.sexualOrientations.length > 0) {
      queryFilters.push(where('sexualOrientation', 'in', preferences.sexualOrientations));
    }
    
    // Apply location filter if provided
    if (preferences.location) {
      queryFilters.push(where('location', '==', preferences.location));
    }
    
    // Filter out users who have blocked or been blocked by the current user
    const blockedUsers = userData.blockedUsers || [];
    
    // Apply pagination
    if (lastVisible) {
      matchQuery = query(
        collection(db, 'users'),
        ...queryFilters,
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(matchesLimit)
      );
    } else {
      matchQuery = query(
        collection(db, 'users'),
        ...queryFilters,
        orderBy('createdAt', 'desc'),
        limit(matchesLimit)
      );
    }
    
    const querySnapshot = await getDocs(matchQuery);
    
    // Process results
    const matches = [];
    let newLastVisible = null;
    
    querySnapshot.forEach((doc) => {
      const matchData = doc.data();
      
      // Skip users who are blocked or have blocked the current user
      if (blockedUsers.includes(doc.id) || (matchData.blockedUsers && matchData.blockedUsers.includes(userId))) {
        return;
      }
      
      // Skip users who are not visible
      if (matchData.visibilitySettings && matchData.visibilitySettings.profileVisible === false) {
        return;
      }
      
      // Add to matches array, filtering out sensitive information
      matches.push({
        id: doc.id,
        displayName: matchData.displayName,
        photoURL: matchData.photoURL,
        pronouns: matchData.pronouns,
        genderIdentity: matchData.genderIdentity,
        sexualOrientation: matchData.sexualOrientation,
        age: matchData.visibilitySettings?.ageVisible ? matchData.age : null,
        location: matchData.visibilitySettings?.locationVisible ? matchData.location : null,
        interests: matchData.interests,
        bio: matchData.bio
      });
      
      // Update the last visible for pagination
      newLastVisible = doc;
    });
    
    return { 
      matches, 
      lastVisible: newLastVisible
    };
  } catch (error) {
    return { error };
  }
};

// Express interest in another user
export const expressInterest = async (currentUserId, targetUserId) => {
  try {
    // Add an interest document
    await addDoc(collection(db, 'interests'), {
      fromUserId: currentUserId,
      toUserId: targetUserId,
      timestamp: serverTimestamp(),
      status: 'pending' // pending, matched, rejected
    });
    
    // Check if the target user has already expressed interest
    const checkQuery = query(
      collection(db, 'interests'),
      where('fromUserId', '==', targetUserId),
      where('toUserId', '==', currentUserId),
      where('status', '==', 'pending')
    );
    
    const querySnapshot = await getDocs(checkQuery);
    
    // If mutual interest, create a match
    if (!querySnapshot.empty) {
      const interestDoc = querySnapshot.docs[0];
      
      // Update the other user's interest to 'matched'
      await updateDoc(doc(db, 'interests', interestDoc.id), {
        status: 'matched'
      });
      
      // Create a match document
      const matchRef = await addDoc(collection(db, 'matches'), {
        users: [currentUserId, targetUserId],
        timestamp: serverTimestamp()
      });
      
      // Update both user profiles with the match
      await updateDoc(doc(db, 'users', currentUserId), {
        matches: arrayUnion(targetUserId)
      });
      
      await updateDoc(doc(db, 'users', targetUserId), {
        matches: arrayUnion(currentUserId)
      });
      
      return { 
        success: true, 
        matched: true, 
        matchId: matchRef.id 
      };
    }
    
    return { success: true, matched: false };
  } catch (error) {
    return { error };
  }
};

// Save or update user preferences
export const saveUserPreferences = async (userId, preferences) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      matchPreferences: preferences,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Get user's matching preferences
export const getUserPreferences = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return { error: 'User not found' };
    }
    
    return { preferences: userDoc.data().matchPreferences || {} };
  } catch (error) {
    return { error };
  }
};

// Get all matches for a user
export const getUserMatches = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return { error: 'User not found' };
    }
    
    const userData = userDoc.data();
    const matchedUserIds = userData.matches || [];
    
    const matches = [];
    
    // Get information for each matched user
    if (matchedUserIds.length > 0) {
      const promises = matchedUserIds.map(matchedId => getDoc(doc(db, 'users', matchedId)));
      const results = await Promise.all(promises);
      
      results.forEach((matchDoc) => {
        if (matchDoc.exists()) {
          const matchData = matchDoc.data();
          
          matches.push({
            id: matchDoc.id,
            displayName: matchData.displayName,
            photoURL: matchData.photoURL,
            pronouns: matchData.pronouns,
            genderIdentity: matchData.genderIdentity,
            sexualOrientation: matchData.sexualOrientation,
            age: matchData.visibilitySettings?.ageVisible ? matchData.age : null,
            location: matchData.visibilitySettings?.locationVisible ? matchData.location : null,
            interests: matchData.interests,
            bio: matchData.bio
          });
        }
      });
    }
    
    return { matches };
  } catch (error) {
    return { error };
  }
};

// Unmatch from a user
export const unmatchUser = async (currentUserId, targetUserId) => {
  try {
    // Remove the match from both user profiles
    await updateDoc(doc(db, 'users', currentUserId), {
      matches: arrayRemove(targetUserId)
    });
    
    await updateDoc(doc(db, 'users', targetUserId), {
      matches: arrayRemove(currentUserId)
    });
    
    // Find and delete the match document
    const matchQuery = query(
      collection(db, 'matches'),
      where('users', 'array-contains', currentUserId)
    );
    
    const querySnapshot = await getDocs(matchQuery);
    let matchId = null;
    
    querySnapshot.forEach((doc) => {
      const matchData = doc.data();
      if (matchData.users.includes(targetUserId)) {
        matchId = doc.id;
      }
    });
    
    if (matchId) {
      await deleteDoc(doc(db, 'matches', matchId));
    }
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Pass on a potential match (don't show again)
export const passOnUser = async (currentUserId, targetUserId) => {
  try {
    await updateDoc(doc(db, 'users', currentUserId), {
      passed: arrayUnion(targetUserId)
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
}; 