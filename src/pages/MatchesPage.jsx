import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

/**
 * Matches page showing potential matches for the user
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By showing diverse matches regardless of gender identity
 * - SDG 10 (Reduced Inequalities): By creating an inclusive matching experience
 */
const MatchesPage = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch matches
    setTimeout(() => {
      // Mock data for matches (people who have already matched with the user)
      const mockMatches = [
        {
          id: '1',
          displayName: 'Alex Rivera',
          age: 26,
          pronouns: 'they/them',
          genderIdentity: 'non-binary',
          sexualOrientation: 'pansexual',
          location: 'New York, NY',
          bio: 'Art lover, coffee enthusiast, and amateur photographer. Looking for connections with open-minded people.',
          interests: ['art', 'photography', 'coffee', 'hiking'],
          photoURL: 'https://via.placeholder.com/400x400?text=Alex'
        },
        {
          id: '2',
          displayName: 'Jordan Lee',
          age: 29,
          pronouns: 'she/her',
          genderIdentity: 'transgender woman',
          sexualOrientation: 'lesbian',
          location: 'San Francisco, CA',
          bio: 'Software engineer by day, musician by night. Looking for someone to share adventures with.',
          interests: ['music', 'coding', 'hiking', 'travel'],
          photoURL: 'https://via.placeholder.com/400x400?text=Jordan'
        }
      ];

      // Mock data for potential matches (people who haven't matched with the user yet)
      const mockPotentialMatches = [
        {
          id: '3',
          displayName: 'Sam Johnson',
          age: 31,
          pronouns: 'he/him',
          genderIdentity: 'cisgender man',
          sexualOrientation: 'gay',
          location: 'Los Angeles, CA',
          bio: 'Fitness trainer who loves cooking, movies, and beach days. Looking for genuine connections.',
          interests: ['fitness', 'cooking', 'movies', 'beach'],
          photoURL: 'https://via.placeholder.com/400x400?text=Sam'
        },
        {
          id: '4',
          displayName: 'Taylor Wilson',
          age: 27,
          pronouns: 'they/them',
          genderIdentity: 'genderfluid',
          sexualOrientation: 'bisexual',
          location: 'Chicago, IL',
          bio: 'Bookworm, plant parent, and part-time DJ. Looking for someone who appreciates both quiet nights and adventures.',
          interests: ['reading', 'music', 'plants', 'dancing'],
          photoURL: 'https://via.placeholder.com/400x400?text=Taylor'
        },
        {
          id: '5',
          displayName: 'Jamie Chen',
          age: 24,
          pronouns: 'he/they',
          genderIdentity: 'non-binary',
          sexualOrientation: 'queer',
          location: 'Seattle, WA',
          bio: 'Graphic designer, tea enthusiast, and board game collector. Seeking connections with creative souls.',
          interests: ['design', 'board games', 'tea', 'art'],
          photoURL: 'https://via.placeholder.com/400x400?text=Jamie'
        }
      ];

      setMatches(mockMatches);
      setPotentialMatches(mockPotentialMatches);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle liking a profile
  const handleLike = (id) => {
    // Move from potential matches to matches for demo purposes
    const matchedProfile = potentialMatches.find(profile => profile.id === id);
    
    if (matchedProfile) {
      // Remove from potential matches
      setPotentialMatches(prevMatches => 
        prevMatches.filter(profile => profile.id !== id)
      );
      
      // Add to matches
      setMatches(prevMatches => [...prevMatches, matchedProfile]);
      
      // Show a success message
      alert(`You matched with ${matchedProfile.displayName}!`);
    }
  };
  
  // Handle passing on a profile
  const handlePass = (id) => {
    // Remove from potential matches
    setPotentialMatches(prevMatches => 
      prevMatches.filter(profile => profile.id !== id)
    );
  };
  
  // Handle messaging a match
  const handleMessage = (id) => {
    // This would navigate to a chat page in a real app
    alert('This feature is not available in the demo.');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-full flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Finding matches...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Matches
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Discover new connections and potential relationships
          </p>
        </div>
        
        {/* Current Matches */}
        {matches.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">People You've Matched With</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {matches.map(profile => (
                <div key={profile.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="w-full h-64 bg-gray-200 relative">
                    <img 
                      src={profile.photoURL} 
                      alt={`${profile.displayName}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {profile.displayName}, {profile.age}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {profile.pronouns && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              {profile.pronouns}
                            </span>
                          )}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {profile.genderIdentity}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button
                        onClick={() => handleMessage(profile.id)}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Potential Matches */}
        {potentialMatches.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Potential Matches</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {potentialMatches.map(profile => (
                <div key={profile.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="w-full h-64 bg-gray-200 relative">
                    <img 
                      src={profile.photoURL} 
                      alt={`${profile.displayName}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {profile.displayName}, {profile.age}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {profile.pronouns && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              {profile.pronouns}
                            </span>
                          )}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {profile.genderIdentity}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-500 line-clamp-3">{profile.bio}</p>
                    
                    {/* Interests */}
                    {profile.interests && profile.interests.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {profile.interests.slice(0, 3).map((interest, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {interest}
                            </span>
                          ))}
                          {profile.interests.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{profile.interests.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => handlePass(profile.id)}
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => handleLike(profile.id)}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No more potential matches</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for new matches!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MatchesPage; 