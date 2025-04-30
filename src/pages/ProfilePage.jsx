import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ShieldCheckIcon, HeartIcon, StarIcon, PhotoIcon } from '@heroicons/react/24/solid';
import ProfileEditForm from '../components/ProfileEditForm';

/**
 * User profile page component
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By allowing diverse gender expressions
 * - SDG 10 (Reduced Inequalities): By creating an inclusive profile experience
 */
const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  
  useEffect(() => {
    // Simulate API call to get user profile
    setTimeout(() => {
      // Check if we have a mock user in localStorage
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const mockUser = JSON.parse(storedUser);
        
        // Create a mock profile with more details
        setUserProfile({
          ...mockUser,
          pronouns: 'they/them',
          genderIdentity: 'non-binary',
          sexualOrientation: 'pansexual',
          age: 28,
          location: 'San Francisco, CA',
          bio: 'I love hiking, reading sci-fi novels, and attending LGBTQ+ community events. Looking for meaningful connections!',
          interests: ['hiking', 'reading', 'cooking', 'activism', 'movies'],
          photos: [
            'https://via.placeholder.com/400x400?text=Profile+Photo'
          ],
          visibilitySettings: {
            profileVisible: true,
            locationVisible: true,
            ageVisible: true,
            pronounsVisible: true,
            genderIdentityVisible: true,
            sexualOrientationVisible: true
          },
          matchingPreferences: {
            genderIdentities: ['all'],
            sexualOrientations: ['all'],
            ageRange: { min: 21, max: 45 },
            distance: 50
          },
          safeSpaceIndicators: {
            lgbtqAlly: true,
            pronounsRespect: true,
            transInclusive: true
          }
        });
      } else {
        // Create a default mock profile
        setUserProfile({
          uid: '123456',
          displayName: 'Alex Johnson',
          email: 'alex@example.com',
          pronouns: 'they/them',
          genderIdentity: 'non-binary',
          sexualOrientation: 'pansexual',
          age: 28,
          location: 'San Francisco, CA',
          bio: 'I love hiking, reading sci-fi novels, and attending LGBTQ+ community events. Looking for meaningful connections!',
          interests: ['hiking', 'reading', 'cooking', 'activism', 'movies'],
          photos: [
            'https://via.placeholder.com/400x400?text=Profile+Photo'
          ],
          visibilitySettings: {
            profileVisible: true,
            locationVisible: true,
            ageVisible: true,
            pronounsVisible: true,
            genderIdentityVisible: true,
            sexualOrientationVisible: true
          },
          matchingPreferences: {
            genderIdentities: ['all'],
            sexualOrientations: ['all'],
            ageRange: { min: 21, max: 45 },
            distance: 50
          },
          safeSpaceIndicators: {
            lgbtqAlly: true,
            pronounsRespect: true,
            transInclusive: true
          }
        });
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-full flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isEditing ? (
          <ProfileEditForm 
            profile={userProfile} 
            onSave={handleSaveProfile} 
            onCancel={handleCancelEdit} 
          />
        ) : (
          <div className="bg-white overflow-hidden shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl">
            {/* Profile header with pride gradient background */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pride-red via-pride-orange to-pride-yellow opacity-20"></div>
              <div className="relative px-4 py-5 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-white overflow-hidden border-2 border-white shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <img 
                      src={userProfile.photos?.[0] || 'https://via.placeholder.com/150'} 
                      alt={`${userProfile.displayName}'s profile`} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 text-white">
                    <h1 className="text-2xl font-bold drop-shadow-lg">{userProfile.displayName}</h1>
                    <div className="flex items-center space-x-2 mt-1">
                      {userProfile.pronouns && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-200 text-primary-800 animate-pulse-slow">
                          {userProfile.pronouns}
                        </span>
                      )}
                      {userProfile.age && userProfile.visibilitySettings?.ageVisible && (
                        <span className="text-primary-100">
                          {userProfile.age} years old
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true);
                      setEditedProfile({...userProfile});
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform transition-transform duration-300 hover:scale-105"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Photo Gallery Section */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <PhotoIcon className="h-5 w-5 mr-2 text-primary-600" />
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userProfile.photos?.map((photo, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
                  >
                    <img 
                      src={photo} 
                      alt={`${userProfile.displayName}'s photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <button className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors duration-300">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Bio Section */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed">{userProfile.bio}</p>
            </div>

            {/* Safe Space Indicators */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-500" />
                Safe Space Indicators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userProfile.safeSpaceIndicators?.lgbtqAlly && (
                  <div className="flex items-center p-3 bg-green-50 rounded-lg transform transition-transform duration-300 hover:scale-105">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">LGBTQ+ Ally</span>
                  </div>
                )}
                {userProfile.safeSpaceIndicators?.pronounsRespect && (
                  <div className="flex items-center p-3 bg-green-50 rounded-lg transform transition-transform duration-300 hover:scale-105">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Pronouns Respect</span>
                  </div>
                )}
                {userProfile.safeSpaceIndicators?.transInclusive && (
                  <div className="flex items-center p-3 bg-green-50 rounded-lg transform transition-transform duration-300 hover:scale-105">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Trans Inclusive</span>
                  </div>
                )}
              </div>
            </div>

            {/* Matching Preferences Section */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <HeartIcon className="h-5 w-5 mr-2 text-primary-600" />
                Matching Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">I'm interested in</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.matchingPreferences?.genderIdentities.includes('all') ? (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 animate-pulse-slow">
                        All Gender Identities
                      </span>
                    ) : (
                      userProfile.matchingPreferences?.genderIdentities.map((gender, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                        >
                          {gender}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Age Range</h3>
                  <p className="text-sm text-gray-900">
                    {userProfile.matchingPreferences?.ageRange.min} - {userProfile.matchingPreferences?.ageRange.max} years
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg transform transition-transform duration-300 hover:scale-105">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Distance</h3>
                  <p className="text-sm text-gray-900">
                    Within {userProfile.matchingPreferences?.distance} miles
                  </p>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings Section */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <StarIcon className="h-5 w-5 mr-2 text-primary-600" />
                  Privacy Settings
                </h2>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 transform transition-transform duration-300 hover:scale-105"
                >
                  Manage Settings
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform transition-transform duration-300 hover:scale-105">
                  <span className="text-sm text-gray-700">Show Profile</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.profileVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.profileVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform transition-transform duration-300 hover:scale-105">
                  <span className="text-sm text-gray-700">Show Location</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.locationVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.locationVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform transition-transform duration-300 hover:scale-105">
                  <span className="text-sm text-gray-700">Show Age</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.ageVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.ageVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform transition-transform duration-300 hover:scale-105">
                  <span className="text-sm text-gray-700">Show Pronouns</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.pronounsVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.pronounsVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;