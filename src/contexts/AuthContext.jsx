import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

/**
 * AuthProvider component with mock authentication functionality
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing a secure authentication system for all users
 * - SDG 10 (Reduced Inequalities): By ensuring all users have equal access to app features
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the user is logged in on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setUserProfile({
          ...user,
          pronouns: user.pronouns || 'they/them',
          genderIdentity: user.genderIdentity || 'non-binary',
          sexualOrientation: user.sexualOrientation || 'pansexual',
          age: user.age || 28,
          location: user.location || 'San Francisco, CA',
          bio: user.bio || 'I love hiking, reading sci-fi novels, and attending LGBTQ+ community events. Looking for meaningful connections!',
          interests: user.interests || ['hiking', 'reading', 'cooking', 'activism', 'movies'],
          visibilitySettings: user.visibilitySettings || {
            profileVisible: true,
            locationVisible: true,
            ageVisible: true
          }
        });
      }
      setLoading(false);
    };
    
    // Check auth on mount
    checkAuth();
    
    // Listen for storage changes (for demo purposes)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Mock logout function
  const logout = () => {
    localStorage.removeItem('mockUser');
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Update profile data in context and localStorage
  const updateProfileData = (newProfileData) => {
    if (currentUser) {
      const updatedProfile = {
        ...userProfile,
        ...newProfileData
      };
      setUserProfile(updatedProfile);
      
      // Update localStorage
      localStorage.setItem('mockUser', JSON.stringify({
        ...currentUser,
        ...newProfileData
      }));
    }
  };

  // Values to provide to components using this context
  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    logout,
    updateProfileData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
} 