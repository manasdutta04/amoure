import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

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
            ageVisible: true
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
            ageVisible: true
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Profile body */}
          <div className="px-4 py-5 sm:p-6">
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
                  {userProfile.genderIdentity && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Gender Identity</dt>
                      <dd className="mt-1 text-sm text-gray-900">{userProfile.genderIdentity}</dd>
                    </div>
                  )}
                  
                  {userProfile.sexualOrientation && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Sexual Orientation</dt>
                      <dd className="mt-1 text-sm text-gray-900">{userProfile.sexualOrientation}</dd>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 