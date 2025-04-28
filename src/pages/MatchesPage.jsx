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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [viewMode, setViewMode] = useState('discover'); // discover, matches
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedPerson, setMatchedPerson] = useState(null);
  const [viewedProfile, setViewedProfile] = useState(null);
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
          photoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
          photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
          photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
          photoURL: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
          photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
          photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        },
        {
          id: '7',
          displayName: 'Morgan Davis',
          age: 30,
          pronouns: 'she/her',
          genderIdentity: 'transgender woman',
          sexualOrientation: 'pansexual',
          location: 'Portland, OR',
          bio: 'Software engineer, avid hiker, and amateur astronomer. Looking for someone to explore the outdoors and stargaze with.',
          interests: ['coding', 'hiking', 'astronomy', 'photography'],
          photoURL: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1487412840181-f5c21f5507c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        },
        {
          id: '8',
          displayName: 'Kai Reynolds',
          age: 26,
          pronouns: 'they/them',
          genderIdentity: 'non-binary',
          sexualOrientation: 'queer',
          location: 'Denver, CO',
          bio: 'Environmental scientist, rock climber, and craft beer enthusiast. Seeking connections with eco-conscious individuals.',
          interests: ['environment', 'climbing', 'beer', 'sustainability'],
          photoURL: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1530645298377-82c8416d3f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        },
        {
          id: '9',
          displayName: 'Zoe Mitchell',
          age: 25,
          pronouns: 'she/her',
          genderIdentity: 'cisgender woman',
          sexualOrientation: 'lesbian',
          location: 'Boston, MA',
          bio: 'Art therapist, jazz lover, and amateur baker. Looking for someone to share cozy evenings and deep conversations.',
          interests: ['art', 'jazz', 'baking', 'psychology'],
          photoURL: 'https://images.unsplash.com/photo-1551292831-023188e78222?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1551292831-023188e78222?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        },
        {
          id: '10',
          displayName: 'Emerson Lopez',
          age: 32,
          pronouns: 'he/they',
          genderIdentity: 'genderfluid',
          sexualOrientation: 'bisexual',
          location: 'Miami, FL',
          bio: 'Marine biologist, salsa dancer, and poetry enthusiast. Looking for partners who appreciate the ocean as much as I do.',
          interests: ['marine life', 'dancing', 'poetry', 'scuba diving'],
          photoURL: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        },
        {
          id: '11',
          displayName: 'Avery Kim',
          age: 29,
          pronouns: 'ze/zir',
          genderIdentity: 'non-binary',
          sexualOrientation: 'pansexual',
          location: 'Minneapolis, MN',
          bio: 'Video game developer, winter sports enthusiast, and cat lover. Looking for genuine connections with open-minded individuals.',
          interests: ['gaming', 'snowboarding', 'cats', 'tech'],
          photoURL: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        }
      ];

      // Ensure there are no duplicates between matches and potential matches
      const matchedIds = new Set(mockMatches.map(match => match.id));
      const filteredPotentialMatches = mockPotentialMatches.filter(profile => !matchedIds.has(profile.id));

      setMatches(mockMatches);
      setPotentialMatches(filteredPotentialMatches);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Utility function to check if a profile is already matched
  const isProfileMatched = (profileId) => {
    return matches.some(match => match.id === profileId);
  };

  // Handle swiping right (like)
  const handleSwipeRight = (id) => {
    const matchedProfile = potentialMatches[currentIndex];
    
    // Check if this profile is already in matches to prevent duplicates
    const isAlreadyMatched = isProfileMatched(matchedProfile.id);
    
    if (!isAlreadyMatched) {
      // Add to matches only if not already matched
      setMatches(prevMatches => [...prevMatches, matchedProfile]);
      
      // Show match animation
      setMatchedPerson(matchedProfile);
      setShowMatchAnimation(true);
    }
    
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
    
    // Check if this profile is already in matches to prevent duplicates
    const isAlreadyMatched = isProfileMatched(matchedProfile.id);
    
    if (!isAlreadyMatched) {
      // Add to matches with special flag only if not already matched
      setMatches(prevMatches => [
        ...prevMatches, 
        {...matchedProfile, superLiked: true}
      ]);
      
      // Show super like animation with special message
      setMatchedPerson({...matchedProfile, superLiked: true});
      setShowMatchAnimation(true);
    }
    
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

  // Function to simulate loading more profiles
  const loadMoreProfiles = () => {
    setIsLoadingMore(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Additional mock profiles that would "load" on refresh
      const additionalProfiles = [
        {
          id: '12',
          displayName: 'Phoenix Wright',
          age: 33,
          pronouns: 'they/them',
          genderIdentity: 'non-binary',
          sexualOrientation: 'queer',
          location: 'Phoenix, AZ',
          bio: 'Legal advocate by day, amateur chef by night. Looking for someone to share culinary adventures and meaningful conversations.',
          interests: ['cooking', 'law', 'social justice', 'hiking'],
          photoURL: 'https://images.unsplash.com/photo-1504199367641-aba8151af406?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1504199367641-aba8151af406?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        },
        {
          id: '13',
          displayName: 'Blake Jordan',
          age: 27,
          pronouns: 'he/him',
          genderIdentity: 'transgender man',
          sexualOrientation: 'pansexual',
          location: 'Nashville, TN',
          bio: 'Musician, songwriter, and coffee shop owner. Looking to connect with creative individuals who value authenticity and passion.',
          interests: ['music', 'songwriting', 'coffee', 'entrepreneurship'],
          photoURL: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        },
        {
          id: '14',
          displayName: 'Sierra Nguyen',
          age: 30,
          pronouns: 'she/her',
          genderIdentity: 'cisgender woman',
          sexualOrientation: 'bisexual',
          location: 'Montreal, QC',
          bio: 'Digital artist, snowboarder, and multilingual traveler. Looking for adventurous souls to explore life with.',
          interests: ['digital art', 'snowboarding', 'languages', 'travel'],
          photoURL: 'https://images.unsplash.com/photo-1499651681375-8afc5a4db253?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          photoURLs: [
            'https://images.unsplash.com/photo-1499651681375-8afc5a4db253?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1564923630403-2284b87c0041?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          ]
        }
      ];
      
      // Add new profiles to the potential matches (append instead of replace)
      setPotentialMatches(prevProfiles => [...prevProfiles, ...additionalProfiles]);
      
      // Keep the current index where it was
      // This will show the new profiles after the user swipes through the remaining ones
      
      setIsLoadingMore(false);
    }, 2000);
  };

  // Add a function to handle viewing a profile
  const handleViewProfile = (profile) => {
    setViewedProfile(profile);
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
      {/* Match Animation Overlay */}
      {showMatchAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4 sm:px-0">
          <div className="text-center p-6 sm:p-8 max-w-lg animate-bounce-slow bg-black/30 backdrop-blur-lg rounded-3xl">
            <div className="h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-4 sm:mb-6 pride-gradient rounded-full flex items-center justify-center">
              {matchedPerson?.superLiked ? (
                <StarIcon className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              ) : (
                <HeartIconSolid className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
              {matchedPerson?.superLiked ? "Super Match!" : "It's a Match!"}
            </h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">
              {matchedPerson?.superLiked 
                ? `You super liked ${matchedPerson?.displayName} and they liked you back!` 
                : `You and ${matchedPerson?.displayName} liked each other!`}
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
              <button
                onClick={() => setShowMatchAnimation(false)}
                className="py-2 px-6 bg-white text-primary-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Keep Swiping
              </button>
              <button
                onClick={() => {
                  setShowMatchAnimation(false);
                  handleMessage(matchedPerson?.id);
                }}
                className="py-2 px-6 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
              >
                Message Now
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Detail Modal */}
      {viewedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center px-4 sm:px-0 overflow-y-auto" onClick={() => setViewedProfile(null)}>
          <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => setViewedProfile(null)}
              className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full z-10 hover:bg-gray-200 transition-colors"
              aria-label="Close details"
            >
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
            
            {/* Profile Images Carousel */}
            <div className="relative w-full h-80 sm:h-96">
              <img 
                src={viewedProfile.photoURLs[0]} 
                alt={`${viewedProfile.displayName}'s profile`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
            </div>
            
            {/* Profile Info */}
            <div className="p-6">
              <div className="flex items-end mb-4">
                <h2 className="text-3xl font-bold text-gray-900 mr-2">{viewedProfile.displayName}</h2>
                <span className="text-2xl font-light text-gray-700">{viewedProfile.age}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="pride-gradient h-4 w-4 rounded-full mr-2"></div>
                <p className="text-gray-700">{viewedProfile.location}</p>
              </div>
              
              {/* Identity Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {viewedProfile.pronouns}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium rainbow-badge text-white">
                  {viewedProfile.sexualOrientation}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {viewedProfile.genderIdentity}
                </span>
              </div>
              
              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{viewedProfile.bio}</p>
              </div>
              
              {/* Interests */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {viewedProfile.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Message Button */}
              <button
                onClick={() => {
                  setViewedProfile(null);
                  handleMessage(viewedProfile.id);
                }}
                className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-pride-purple to-pride-blue rounded-xl shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition hover:shadow-lg"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Message {viewedProfile.displayName}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-1.5 shadow-md">
            <div className="flex">
              <button
                onClick={() => setViewMode('discover')}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
                  viewMode === 'discover' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Discover
              </button>
              <button
                onClick={() => setViewMode('matches')}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
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
          <div className="relative min-h-[500px] h-[calc(100vh-220px)] max-h-[700px] flex flex-col items-center justify-center">
            {isLoadingMore ? (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4">
                  <div className="pride-gradient w-20 h-20 rounded-full flex items-center justify-center animate-pulse">
                    <HeartIconSolid className="h-10 w-10 text-white animate-bounce" />
                  </div>
                </div>
                <p className="mt-4 text-xl font-medium text-gray-800">Finding new matches for you...</p>
                <p className="mt-2 text-sm text-gray-500">Based on your preferences and interests</p>
              </div>
            ) : potentialMatches.length > currentIndex ? (
              <div className="relative h-full w-full max-w-[360px] flex flex-col items-center justify-center">
                <div className="w-full h-full relative">
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
                
                {/* Action Buttons */}
                <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
                  <button
                    onClick={() => { handleSwipeLeft(); }}
                    className="action-button action-button-pass"
                    aria-label="Pass"
                  >
                    <XMarkIcon className="h-9 w-9" />
                  </button>
                  <button
                    onClick={() => handleSuperLike(potentialMatches[currentIndex].id)}
                    className="action-button action-button-superlike"
                    aria-label="Super Like"
                  >
                    <StarIcon className="h-9 w-9" />
                  </button>
                  <button
                    onClick={() => { handleSwipeRight(potentialMatches[currentIndex].id); }}
                    className="action-button action-button-like"
                    aria-label="Like"
                  >
                    <HeartIcon className="h-9 w-9" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 bg-white rounded-2xl shadow-md max-w-sm sm:max-w-md w-full px-4 sm:px-8 mx-auto">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 pride-gradient rounded-full flex items-center justify-center animate-pulse">
                  <HeartIconSolid className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Hang on tight!</h3>
                <p className="text-lg text-gray-600 mb-8">We are finding matches for You!</p>
                <div className="border-t pt-6">
                  <div className="flex justify-center items-center mb-4">
                    <div className="pride-gradient w-10 h-10 rounded-full flex items-center justify-center animate-spin">
                      <div className="h-7 w-7 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <button
                    onClick={loadMoreProfiles}
                    disabled={isLoadingMore}
                    className="px-8 py-3 bg-primary-600 text-white text-base rounded-full font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    {isLoadingMore ? 'Loading...' : 'Find More Matches'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Matches View */}
        {viewMode === 'matches' && (
          <div className="mt-4 pb-6">
            {matches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {matches.map(profile => (
                  <div 
                    key={profile.id} 
                    className="bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:scale-[1.02] cursor-pointer"
                    onClick={() => handleViewProfile(profile)}
                  >
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
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
                    
                    <div className="p-4 sm:p-6 relative -mt-10 sm:-mt-14">
                      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                              {profile.displayName}, {profile.age}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                {profile.pronouns}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium rainbow-badge">
                                {profile.sexualOrientation}
                              </span>
                            </div>
                            <p className="mt-1 text-xs sm:text-sm text-gray-500">{profile.location}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 sm:mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the parent onClick
                              handleMessage(profile.id);
                            }}
                            className="w-full flex justify-center items-center py-1.5 sm:py-2 px-3 sm:px-4 bg-gradient-to-r from-pride-purple to-pride-blue rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition transform hover:translate-y-[-2px]"
                          >
                            <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white rounded-2xl shadow-md">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 pride-gradient rounded-full flex items-center justify-center">
                  <HeartIcon className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No matches yet</h3>
                <p className="text-gray-600 max-w-md text-center mb-4 sm:mb-6 px-4">
                  Start swiping to discover people in your area and make your first match!
                </p>
                <button
                  onClick={() => setViewMode('discover')}
                  className="px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
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