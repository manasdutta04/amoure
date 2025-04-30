import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
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
          <div className="bg-white overflow-hidden shadow rounded-lg">
          {/* Profile header */}
          <div className="bg-primary-600 px-4 py-5 sm:px-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-white overflow-hidden border-2 border-white">
                <img 
                  src={userProfile.photos?.[0] || 'https://via.placeholder.com/150'} 
                  alt={`${userProfile.displayName}'s profile`} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-2xl font-bold">{userProfile.displayName}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {userProfile.pronouns && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-200 text-primary-800">
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit Profile
              </button>
            </div>
            
            {/* Matching Preferences Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Matching Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">I'm interested in</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.matchingPreferences?.genderIdentities.includes('all') ? (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
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
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Age Range</h3>
                  <p className="text-sm text-gray-900">
                    {userProfile.matchingPreferences?.ageRange.min} - {userProfile.matchingPreferences?.ageRange.max} years
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Distance</h3>
                  <p className="text-sm text-gray-900">
                    Within {userProfile.matchingPreferences?.distance} miles
                  </p>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Privacy Settings</h2>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Manage Settings
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Profile</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.profileVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.profileVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Location</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.locationVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.locationVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Age</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.ageVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.ageVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Pronouns</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.pronounsVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.pronounsVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Gender Identity</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.genderIdentityVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.genderIdentityVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Sexual Orientation</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.sexualOrientationVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.sexualOrientationVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile body */}
          <div className="px-4 py-5 sm:p-6">
            {/* Safe Space Indicators */}
            {userProfile.safeSpaceIndicators && (
              <div className="mb-6 bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">Safe Space Indicators</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userProfile.safeSpaceIndicators.lgbtqAlly && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      LGBTQ+ Ally
                    </span>
                  )}
                  {userProfile.safeSpaceIndicators.pronounsRespect && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Respects Pronouns
                    </span>
                  )}
                  {userProfile.safeSpaceIndicators.transInclusive && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Trans Inclusive
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* Bio section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-3">About Me</h2>
              <p className="text-gray-700">{userProfile.bio}</p>
            </div>
            
            {/* Details section */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Details</h2>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  {userProfile.genderIdentity && userProfile.visibilitySettings?.genderIdentityVisible && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Gender Identity</dt>
                      <dd className="mt-1 text-sm text-gray-900">{userProfile.genderIdentity}</dd>
                    </div>
                  )}
                  
                  {userProfile.sexualOrientation && userProfile.visibilitySettings?.sexualOrientationVisible && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Sexual Orientation</dt>
                      <dd className="mt-1 text-sm text-gray-900">{userProfile.sexualOrientation}</dd>
                    </div>
                  )}
                  
                  {userProfile.pronouns && userProfile.visibilitySettings?.pronounsVisible && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Pronouns</dt>
                      <dd className="mt-1 text-sm text-gray-900">{userProfile.pronouns}</dd>
                    </div>
                  )}
                  
                  {userProfile.location && userProfile.visibilitySettings?.locationVisible && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-sm text-gray-900">{userProfile.location}</dd>
                    </div>
                  )}
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                    <dd className="mt-1 text-sm text-gray-900">June 2023</dd>
                  </div>
                </dl>
              </div>
              
              {userProfile.interests && userProfile.interests.length > 0 && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-3">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Photos section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-gray-900">Photos</h2>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Add Photos
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {userProfile.photos?.map((photo, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={photo} 
                      alt={`Photo ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {/* Add photo placeholder */}
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center p-4">
                    <svg 
                      className="mx-auto h-8 w-8 text-gray-400" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 4v16m8-8H4" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Matching Preferences Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Matching Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">I'm interested in</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.matchingPreferences?.genderIdentities.includes('all') ? (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
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
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Age Range</h3>
                  <p className="text-sm text-gray-900">
                    {userProfile.matchingPreferences?.ageRange.min} - {userProfile.matchingPreferences?.ageRange.max} years
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Distance</h3>
                  <p className="text-sm text-gray-900">
                    Within {userProfile.matchingPreferences?.distance} miles
                  </p>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Privacy Settings</h2>
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Manage Settings
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Profile</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.profileVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.profileVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Location</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.locationVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.locationVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Age</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.ageVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.ageVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Pronouns</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.pronounsVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.pronounsVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Gender Identity</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.genderIdentityVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.genderIdentityVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Show Sexual Orientation</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${userProfile.visibilitySettings?.sexualOrientationVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userProfile.visibilitySettings?.sexualOrientationVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
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