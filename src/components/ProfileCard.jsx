import React from 'react';
import { HeartIcon, ChatBubbleLeftRightIcon, XMarkIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

/**
 * ProfileCard component to display user profiles
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By displaying diverse gender identities and pronouns with equal prominence
 * - SDG 10 (Reduced Inequalities): By providing a standardized, accessible profile format for all users
 * 
 * @param {Object} props - Component props
 * @param {Object} props.profile - User profile data
 * @param {string} props.profile.id - User ID
 * @param {string} props.profile.displayName - User display name
 * @param {string} [props.profile.photoURL] - User profile photo URL
 * @param {string} [props.profile.pronouns] - User pronouns
 * @param {string} [props.profile.genderIdentity] - User gender identity
 * @param {string} [props.profile.sexualOrientation] - User sexual orientation
 * @param {number} [props.profile.age] - User age
 * @param {string} [props.profile.location] - User location
 * @param {string} [props.profile.bio] - User bio
 * @param {Array} [props.profile.interests] - User interests
 * @param {string} [props.variant='default'] - Card variant (default, compact)
 * @param {boolean} [props.showActions=true] - Whether to show action buttons
 * @param {boolean} [props.matched=false] - Whether the user is already matched
 * @param {Function} [props.onLike] - Like button click handler
 * @param {Function} [props.onPass] - Pass button click handler
 * @param {Function} [props.onMessage] - Message button click handler
 * @param {Function} [props.onReport] - Report button click handler
 * @returns {React.Component} ProfileCard component
 */
const ProfileCard = ({ 
  profile,
  variant = 'default',
  showActions = true,
  matched = false,
  onLike,
  onPass,
  onMessage,
  onReport
}) => {
  const isCompact = variant === 'compact';
  
  // Default photo if none provided
  const photoURL = profile.photoURL || 'https://via.placeholder.com/150?text=No+Photo';
  
  return (
    <div className={`card ${isCompact ? 'max-w-xs' : 'max-w-2xl'} w-full mx-auto`}>
      <div className={`${isCompact ? 'flex items-center p-4' : ''}`}>
        {/* Profile Photo */}
        <div className={`${isCompact ? 'flex-shrink-0 mr-4' : 'relative'}`}>
          <img 
            src={photoURL} 
            alt={`${profile.displayName}'s profile`}
            className={`
              ${isCompact ? 'h-16 w-16' : 'w-full h-64 object-cover'}
              rounded-${isCompact ? 'full' : 'none rounded-t-xl'}
            `}
          />
          
          {!isCompact && matched && (
            <div className="absolute top-3 right-3 bg-pride-green text-white px-3 py-1 rounded-full text-xs font-semibold">
              Matched
            </div>
          )}
        </div>
        
        <div className={`${isCompact ? 'flex-1' : 'p-6'}`}>
          {/* Basic Info */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {profile.displayName}
                {profile.age && (
                  <span className="ml-2 text-gray-600">{profile.age}</span>
                )}
              </h3>
              
              <div className="mt-1 flex flex-wrap gap-2">
                {profile.pronouns && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {profile.pronouns}
                  </span>
                )}
                
                {profile.genderIdentity && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pride-blue bg-opacity-10 text-pride-blue">
                    {profile.genderIdentity}
                  </span>
                )}
                
                {profile.sexualOrientation && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pride-purple bg-opacity-10 text-pride-purple">
                    {profile.sexualOrientation}
                  </span>
                )}
              </div>
              
              {profile.location && (
                <p className="mt-1 text-sm text-gray-500">{profile.location}</p>
              )}
            </div>
            
            {isCompact && matched && (
              <span className="bg-pride-green text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                Matched
              </span>
            )}
          </div>
          
          {/* Bio - Show only in default variant */}
          {!isCompact && profile.bio && (
            <p className="mt-4 text-base text-gray-600">{profile.bio}</p>
          )}
          
          {/* Interests - Show only in default variant */}
          {!isCompact && profile.interests && profile.interests.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Interests</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span 
                    key={interest}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          {showActions && (
            <div className={`${isCompact ? 'mt-2' : 'mt-6'} flex ${isCompact ? 'justify-end' : 'justify-between'} items-center`}>
              {onReport && (
                <button
                  type="button"
                  onClick={() => onReport(profile.id)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label={`Report ${profile.displayName}`}
                >
                  <ShieldExclamationIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
              
              <div className={`flex ${isCompact ? 'space-x-2' : 'space-x-4'}`}>
                {onPass && !matched && (
                  <button
                    type="button"
                    onClick={() => onPass(profile.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    aria-label={`Pass on ${profile.displayName}`}
                  >
                    <XMarkIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
                    {!isCompact && <span>Pass</span>}
                  </button>
                )}
                
                {onLike && !matched && (
                  <button
                    type="button"
                    onClick={() => onLike(profile.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    aria-label={`Like ${profile.displayName}`}
                  >
                    <HeartIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
                    {!isCompact && <span>Like</span>}
                  </button>
                )}
                
                {onMessage && matched && (
                  <button
                    type="button"
                    onClick={() => onMessage(profile.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    aria-label={`Message ${profile.displayName}`}
                  >
                    <ChatBubbleLeftRightIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
                    {!isCompact && <span>Message</span>}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 