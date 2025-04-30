import React, { useState } from 'react';

/**
 * Profile edit form component for updating user profile information
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing inclusive gender identity and pronoun options
 * - SDG 10 (Reduced Inequalities): By creating an inclusive profile editing experience
 */
const ProfileEditForm = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ...profile,
  });

  // Gender identity options - expanded to be more inclusive
  const genderIdentityOptions = [
    'cisgender man',
    'cisgender woman',
    'transgender man',
    'transgender woman',
    'non-binary',
    'genderqueer',
    'genderfluid',
    'agender',
    'questioning',
    'two-spirit',
    'prefer not to say',
    'other'
  ];

  // Sexual orientation options - expanded to be more inclusive
  const sexualOrientationOptions = [
    'straight/heterosexual',
    'gay',
    'lesbian',
    'bisexual',
    'pansexual',
    'asexual',
    'queer',
    'questioning',
    'demisexual',
    'prefer not to say',
    'other'
  ];

  // Pronoun options
  const pronounOptions = [
    'he/him',
    'she/her',
    'they/them',
    'he/they',
    'she/they',
    'ze/zir',
    'xe/xem',
    'prefer not to say',
    'other'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox changes for safe space indicators
  const handleSafeSpaceChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      safeSpaceIndicators: {
        ...formData.safeSpaceIndicators,
        [name]: checked
      }
    });
  };

  // Handle visibility settings changes
  const handleVisibilityChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      visibilitySettings: {
        ...formData.visibilitySettings,
        [name]: checked
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 bg-primary-600 text-white">
        <h3 className="text-lg leading-6 font-medium">Edit Profile</h3>
        <p className="mt-1 max-w-2xl text-sm">Update your profile information</p>
      </div>
      
      <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
        {/* Basic Information */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                min="18"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        {/* Identity Information */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Identity Information</h4>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700">Pronouns</label>
              <select
                name="pronouns"
                id="pronouns"
                value={formData.pronouns || ''}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Select your pronouns</option>
                {pronounOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="genderIdentity" className="block text-sm font-medium text-gray-700">Gender Identity</label>
              <select
                name="genderIdentity"
                id="genderIdentity"
                value={formData.genderIdentity || ''}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Select your gender identity</option>
                {genderIdentityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="sexualOrientation" className="block text-sm font-medium text-gray-700">Sexual Orientation</label>
              <select
                name="sexualOrientation"
                id="sexualOrientation"
                value={formData.sexualOrientation || ''}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value="">Select your sexual orientation</option>
                {sexualOrientationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Bio */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">About Me</h4>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              id="bio"
              rows="4"
              value={formData.bio || ''}
              onChange={handleChange}
              className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Tell others about yourself..."
            />
            <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
          </div>
        </div>
        
        {/* Safe Space Indicators */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Safe Space Indicators</h4>
          <p className="text-sm text-gray-500 mb-4">These indicators help others know that you're committed to creating a safe and inclusive environment.</p>
          
          <div className="space-y-4">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="lgbtqAlly"
                  name="lgbtqAlly"
                  type="checkbox"
                  checked={formData.safeSpaceIndicators?.lgbtqAlly || false}
                  onChange={handleSafeSpaceChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="lgbtqAlly" className="font-medium text-gray-700">LGBTQ+ Ally</label>
                <p className="text-gray-500">I support and advocate for the LGBTQ+ community.</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="pronounsRespect"
                  name="pronounsRespect"
                  type="checkbox"
                  checked={formData.safeSpaceIndicators?.pronounsRespect || false}
                  onChange={handleSafeSpaceChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="pronounsRespect" className="font-medium text-gray-700">Respects Pronouns</label>
                <p className="text-gray-500">I respect and use people's correct pronouns.</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="transInclusive"
                  name="transInclusive"
                  type="checkbox"
                  checked={formData.safeSpaceIndicators?.transInclusive || false}
                  onChange={handleSafeSpaceChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="transInclusive" className="font-medium text-gray-700">Trans Inclusive</label>
                <p className="text-gray-500">I support and respect transgender and non-binary individuals.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Visibility Settings */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Visibility Settings</h4>
          <p className="text-sm text-gray-500 mb-4">Control what information is visible to others on your profile.</p>
          
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="profileVisible"
                  name="profileVisible"
                  type="checkbox"
                  checked={formData.visibilitySettings?.profileVisible || false}
                  onChange={handleVisibilityChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="profileVisible" className="font-medium text-gray-700">Show Profile</label>
                <p className="text-gray-500">Your profile will be visible to others.</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="locationVisible"
                  name="locationVisible"
                  type="checkbox"
                  checked={formData.visibilitySettings?.locationVisible || false}
                  onChange={handleVisibilityChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="locationVisible" className="font-medium text-gray-700">Show Location</label>
                <p className="text-gray-500">Your location will be visible on your profile.</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="ageVisible"
                  name="ageVisible"
                  type="checkbox"
                  checked={formData.visibilitySettings?.ageVisible || false}
                  onChange={handleVisibilityChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="ageVisible" className="font-medium text-gray-700">Show Age</label>
                <p className="text-gray-500">Your age will be visible on your profile.</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="pronounsVisible"
                  name="pronounsVisible"
                  type="checkbox"
                  checked={formData.visibilitySettings?.pronounsVisible || false}
                  onChange={handleVisibilityChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="pronounsVisible" className="font-medium text-gray-700">Show Pronouns</label>
                <p className="text-gray-500">Your pronouns will be visible on your profile.</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="genderIdentityVisible"
                  name="genderIdentityVisible"
                  type="checkbox"
                  checked={formData.visibilitySettings?.genderIdentityVisible || false}
                  onChange={handleVisibilityChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="genderIdentityVisible" className="font-medium text-gray-700">Show Gender Identity</label>
                <p className="text-gray-500">Your gender identity will be visible on your profile.</p>
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="sexualOrientationVisible"
                  name="sexualOrientationVisible"
                  type="checkbox"
                  checked={formData.visibilitySettings?.sexualOrientationVisible || false}
                  onChange={handleVisibilityChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="sexualOrientationVisible" className="font-medium text-gray-700">Show Sexual Orientation</label>
                <p className="text-gray-500">Your sexual orientation will be visible on your profile.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="pt-5 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;