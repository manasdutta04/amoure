import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import SwipeCard from '../components/SwipeCard';
import { 
  HeartIcon, 
  XMarkIcon, 
  StarIcon, 
  ChatBubbleLeftRightIcon,
  FlagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

/**
 * Modernized Matches page with swipe functionality for a dating app experience
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By showing diverse matches regardless of gender identity
 * - SDG 10 (Reduced Inequalities): By creating an inclusive matching experience with LGBTQ+ focused design
 */
const MatchesPage = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [viewMode, setViewMode] = useState('discover'); // discover, matches
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedPerson, setMatchedPerson] = useState(null);
  const swipeRef = useRef(null);

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
          photoURL: 'https://via.placeholder.com/400x400?text=Alex',
          photoURLs: [
            'https://via.placeholder.com/400x600?text=Alex+Photo+1',
            'https://via.placeholder.com/400x600?text=Alex+Photo+2',
            'https://via.placeholder.com/400x600?text=Alex+Photo+3',
          ]
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
          photoURL: 'https://via.placeholder.com/400x400?text=Jordan',
          photoURLs: [
            'https://via.placeholder.com/400x600?text=Jordan+Photo+1',
            'https://via.placeholder.com/400x600?text=Jordan+Photo+2',
          ]
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
          photoURL: 'https://via.placeholder.com/400x400?text=Sam',
          photoURLs: [
            'https://via.placeholder.com/400x600?text=Sam+Photo+1',
            'https://via.placeholder.com/400x600?text=Sam+Photo+2',
            'https://via.placeholder.com/400x600?text=Sam+Photo+3',
          ]
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
          photoURL: 'https://via.placeholder.com/400x400?text=Taylor',
          photoURLs: [
            'https://via.placeholder.com/400x600?text=Taylor+Photo+1',
            'https://via.placeholder.com/400x600?text=Taylor+Photo+2',
          ]
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
          photoURL: 'https://via.placeholder.com/400x400?text=Jamie',
          photoURLs: [
            'https://via.placeholder.com/400x600?text=Jamie+Photo+1',
            'https://via.placeholder.com/400x600?text=Jamie+Photo+2',
            'https://via.placeholder.com/400x600?text=Jamie+Photo+3',
          ]
        },
        {
          id: '6',
          displayName: 'Riley Martinez',
          age: 28,
          pronouns: 'she/they',
          genderIdentity: 'genderqueer',
          sexualOrientation: 'pansexual',
          location: 'Austin, TX',
          bio: 'Music producer, vintage fashion enthusiast, and foodie. Looking for someone who appreciates authenticity and creativity.',
          interests: ['music production', 'vintage fashion', 'food', 'concerts'],
          photoURL: 'https://via.placeholder.com/400x400?text=Riley',
          photoURLs: [
            'https://via.placeholder.com/400x600?text=Riley+Photo+1',
            'https://via.placeholder.com/400x600?text=Riley+Photo+2',
          ]
        }
      ];

      setMatches(mockMatches);
      setPotentialMatches(mockPotentialMatches);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle swiping right (like)
  const handleSwipeRight = (id) => {
    const matchedProfile = potentialMatches[currentIndex];
    
    // Add to matches
    setMatches(prevMatches => [...prevMatches, matchedProfile]);
    
    // Show match animation
    setMatchedPerson(matchedProfile);
    setShowMatchAnimation(true);
    
    // Advance to next potential match
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Handle swiping left (pass)
  const handleSwipeLeft = () => {
    // Advance to next potential match
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Handle super like
  const handleSuperLike = (id) => {
    const matchedProfile = potentialMatches[currentIndex];
    
    // Add to matches with special flag
    setMatches(prevMatches => [
      ...prevMatches, 
      {...matchedProfile, superLiked: true}
    ]);
    
    // Show super like animation with special message
    setMatchedPerson({...matchedProfile, superLiked: true});
    setShowMatchAnimation(true);
    
    // Advance to next potential match
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle messaging a match
  const handleMessage = (id) => {
    // This would navigate to a chat page in a real app
    alert('This feature is not available in the demo.');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4">
              <div className="pride-gradient w-20 h-20 rounded-full flex items-center justify-center animate-pulse">
                <HeartIconSolid className="h-10 w-10 text-white animate-bounce" />
              </div>
            </div>
            <p className="mt-4 text-xl font-medium text-gray-800">Finding your matches...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Match Animation Overlay */}
        {showMatchAnimation && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="text-center p-8 max-w-lg animate-bounce-slow">
              <div className="h-24 w-24 mx-auto mb-6 pride-gradient rounded-full flex items-center justify-center">
                {matchedPerson?.superLiked ? (
                  <StarIcon className="h-12 w-12 text-white" />
                ) : (
                  <HeartIconSolid className="h-12 w-12 text-white" />
                )}
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                {matchedPerson?.superLiked ? "Super Match!" : "It's a Match!"}
              </h2>
              <p className="text-xl text-white mb-6">
                {matchedPerson?.superLiked 
                  ? `You super liked ${matchedPerson?.displayName} and they liked you back!` 
                  : `You and ${matchedPerson?.displayName} liked each other!`}
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setShowMatchAnimation(false)}
                  className="py-2 px-6 bg-white text-primary-600 rounded-full font-medium"
                >
                  Keep Swiping
                </button>
                <button
                  onClick={() => {
                    setShowMatchAnimation(false);
                    handleMessage(matchedPerson?.id);
                  }}
                  className="py-2 px-6 bg-primary-600 text-white rounded-full font-medium"
                >
                  Message Now
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-full p-1 shadow-md">
            <div className="flex">
              <button
                onClick={() => setViewMode('discover')}
                className={`px-6 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  viewMode === 'discover' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setViewMode('matches')}
                className={`px-6 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  viewMode === 'matches' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Matches {matches.length > 0 && <span className="ml-1 bg-pride-red text-white rounded-full px-2 py-0.5 text-xs">{matches.length}</span>}
              </button>
            </div>
          </div>
        </div>
        
        {/* Discover View (Swipe Cards) */}
        {viewMode === 'discover' && (
          <div className="relative h-[80vh] max-h-[700px] flex flex-col items-center justify-center">
            {potentialMatches.length > currentIndex ? (
              <>
                <div className="relative w-full max-w-md">
                  <AnimatePresence>
                    <SwipeCard
                      key={potentialMatches[currentIndex].id}
                      profile={potentialMatches[currentIndex]}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                      onSuperLike={handleSuperLike}
                    />
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-md max-w-md w-full px-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="h-12 w-12 text-gray-400"
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
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No more profiles</h3>
                <p className="text-gray-600 mb-6">We're searching for more amazing people near you. Check back soon!</p>
                <div className="border-t pt-6">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary-600 text-white rounded-full font-medium"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Matches View */}
        {viewMode === 'matches' && (
          <div className="mt-4">
            {matches.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matches.map(profile => (
                  <div key={profile.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:scale-[1.02]">
                    <div className="relative w-full h-64">
                      <img 
                        src={profile.photoURLs[0]} 
                        alt={`${profile.displayName}'s profile`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {profile.superLiked ? "Super Match!" : "New Match"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
                    </div>
                    
                    <div className="p-6 relative -mt-14">
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {profile.displayName}, {profile.age}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                {profile.pronouns}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium rainbow-badge">
                                {profile.sexualOrientation}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <button
                            onClick={() => handleMessage(profile.id)}
                            className="w-full flex justify-center items-center py-2 px-4 bg-gradient-to-r from-pride-purple to-pride-blue rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition transform hover:translate-y-[-2px]"
                          >
                            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-md">
                <div className="w-24 h-24 mb-6 pride-gradient rounded-full flex items-center justify-center">
                  <HeartIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No matches yet</h3>
                <p className="text-gray-600 max-w-md text-center mb-6">
                  Start swiping to discover people in your area and make your first match!
                </p>
                <button
                  onClick={() => setViewMode('discover')}
                  className="px-6 py-2 bg-primary-600 text-white rounded-full font-medium"
                >
                  Start Discovering
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MatchesPage; 