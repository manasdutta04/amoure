import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

/**
 * SwipeCard component for the modern dating app swipe interface
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By representing all gender identities equally
 * - SDG 10 (Reduced Inequalities): By showcasing LGBTQ+ identities with pride
 * 
 * @param {Object} props - Component props
 * @param {Object} props.profile - Profile data
 * @param {Function} props.onSwipeLeft - Function to call when swiped left
 * @param {Function} props.onSwipeRight - Function to call when swiped right
 * @param {Function} props.onSuperLike - Function to call when super liked
 * @returns {React.Component} - SwipeCard component
 */
const SwipeCard = ({ profile, onSwipeLeft, onSwipeRight, onSuperLike }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  // Navigation through photos
  const nextPhoto = (e) => {
    e.stopPropagation();
    if (currentPhotoIndex < profile.photoURLs.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  // Handle drag end for manual swiping
  const handleDragEnd = (e, info) => {
    if (info.offset.x > 100) {
      setDirection('right');
      onSwipeRight(profile.id);
    } else if (info.offset.x < -100) {
      setDirection('left');
      onSwipeLeft(profile.id);
    }
  };

  // Get badge colors based on gender identity and orientation
  const getBadgeColor = (type) => {
    // Map identities to pride flag colors for better LGBTQ+ representation
    switch(type.toLowerCase()) {
      case 'lesbian':
        return 'bg-[#D52D00] text-white';
      case 'gay':
        return 'bg-[#078D70] text-white';
      case 'bisexual':
        return 'bg-[#9B4F96] text-white';
      case 'transgender':
      case 'transgender woman':
      case 'transgender man':
        return 'bg-pride-trans-blue text-white';
      case 'queer':
        return 'bg-pride-purple text-white';
      case 'non-binary':
        return 'bg-[#FCF434] text-black';
      case 'genderfluid':
      case 'genderqueer':
        return 'bg-[#BE18D6] text-white';
      case 'pansexual':
        return 'bg-[#FF1B8D] text-white';
      case 'cisgender man':
        return 'bg-[#078D70] text-white';
      default:
        return 'rainbow-badge text-white';
    }
  };

  return (
    <motion.div
      className="swipe-card-container"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0.5 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: 0,
        x: direction === 'left' ? -600 : direction === 'right' ? 600 : 0,
      }}
      exit={{
        x: direction === 'left' ? -600 : direction === 'right' ? 600 : 0,
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3 }
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ cursor: "grabbing" }}
    >
      <div className="swipe-card">
        {/* Photo Carousel */}
        <div className="h-full w-full relative">
          {profile.photoURLs.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentPhotoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={photo}
                alt={`${profile.displayName} photo ${index + 1}`}
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>
          ))}

          {/* Photo Navigation Indicators */}
          <div className="absolute top-3 left-0 right-0 z-20 flex justify-center">
            <div className="flex space-x-1">
              {profile.photoURLs.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Left/Right Navigation Buttons */}
          {profile.photoURLs.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                disabled={currentPhotoIndex === 0}
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/30 flex items-center justify-center ${
                  currentPhotoIndex === 0 ? 'opacity-30' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextPhoto}
                disabled={currentPhotoIndex === profile.photoURLs.length - 1}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/30 flex items-center justify-center ${
                  currentPhotoIndex === profile.photoURLs.length - 1
                    ? 'opacity-30'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black z-10"></div>

          {/* Swipe Indicators */}
          <div className={`absolute top-4 right-4 z-30 transition-opacity duration-200 ${direction === 'right' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="rounded-full bg-green-500 p-2 transform rotate-12">
              <HeartIconSolid className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className={`absolute top-4 left-4 z-30 transition-opacity duration-200 ${direction === 'left' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="rounded-full bg-red-500 p-2 transform -rotate-12">
              <XMarkIcon className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <div className="flex flex-col">
              <div className="flex items-end">
                <h2 className="text-3xl font-bold mr-2">{profile.displayName}</h2>
                <span className="text-2xl font-light">{profile.age}</span>
              </div>

              {/* Location with colorful pin */}
              <div className="flex items-center mt-1 mb-3">
                <div className="pride-gradient h-3 w-3 rounded-full mr-2"></div>
                <p className="text-white/90">{profile.location}</p>
              </div>

              {/* Identity badges with LGBTQ+ themed colors */}
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.pronouns && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/20 text-white">
                    {profile.pronouns}
                  </span>
                )}
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getBadgeColor(profile.genderIdentity)}`}>
                  {profile.genderIdentity}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getBadgeColor(profile.sexualOrientation)}`}>
                  {profile.sexualOrientation}
                </span>
              </div>

              {/* Bio - truncated */}
              <p className="text-white/90 line-clamp-2 mb-2">{profile.bio}</p>

              {/* Interests */}
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard; 