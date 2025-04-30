import React, { useState } from 'react';

/**
 * Matching preferences form component for setting dating preferences
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing inclusive gender identity matching options
 * - SDG 10 (Reduced Inequalities): By creating an inclusive matching experience
 */
const MatchingPreferencesForm = ({ preferences, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ...preferences
  });

  // Gender identity options for matching
  const genderIdentityOptions = [
    { value: 'all', label: 'All Gender Identities' },
    { value: 'cisgender man', label: 'Cisgender Men' },
    { value: 'cisgender woman', label: 'Cisgender Women' },
    { value: 'transgender man', label: 'Transgender Men' },
    { value: 'transgender woman', label: 'Transgender Women' },
    { value: 'non-binary', label: 'Non-binary People' },
    { value: 'genderqueer', label: 'Genderqueer People' },
    { value: 'genderfluid', label: 'Genderfluid People' },
    { value: 'agender', label: 'Agender People' }
  ];

  // Sexual orientation options for matching
  const sexualOrientationOptions = [
    { value: 'all', label: 'All Sexual Orientations' },
    { value: 'straight', label: 'Straight/Heterosexual' },
    { value: 'gay', label: 'Gay' },
    { value: 'lesbian', label: 'Lesbian' },
    { value: 'bisexual', label: 'Bisexual' },
    { value: 'pansexual', label: 'Pansexual' },
    { value: 'asexual', label: 'Asexual' },
    { value: 'queer', label: 'Queer' }
  ];

  // Handle checkbox changes for gender identities
  const handleGenderIdentityChange = (value) => {
    let updatedGenderIdentities;
    
    if (value === 'all') {
      // If 'all' is selected, clear other selections
      updatedGenderIdentities = ['all'];
    } else {
      // If current selection includes 'all', remove it
      const withoutAll = formData.genderIdentities.filter(g => g !== 'all');
      
      // Check if the value is already selected
      if (withoutAll.includes(value)) {
        // Remove the value if it's already selected
        updatedGenderIdentities = withoutAll.filter(g => g !== value);
      } else {
        // Add the value if it's not already selected
        updatedGenderIdentities = [...withoutAll, value];
      }
      
      // If nothing is selected, default to 'all'
      if (updatedGenderIdentities.length === 0) {
        updatedGenderIdentities = ['all'];
      }
    }
    
    setFormData({
      ...formData,
      genderIdentities: updatedGenderIdentities
    });
  };

  // Handle checkbox changes for sexual orientations
  const handleSexualOrientationChange = (value) => {
    let updatedSexualOrientations;
    
    if (value === 'all') {
      // If 'all' is selected, clear other selections
      updatedSexualOrientations = ['all'];
    } else {
      // If current selection includes 'all', remove it
      const withoutAll = formData.sexualOrientations.filter(o => o !== 'all');
      
      // Check if the value is already selected
      if (withoutAll.includes(value)) {
        // Remove the value if it's already selected
        updatedSexualOrientations = withoutAll.filter(o => o !== value);
      } else {
        // Add the value if it's not already selected
        updatedSexualOrientations = [...withoutAll, value];
      }
      
      // If nothing is selected, default to 'all'
      if (updatedSexualOrientations.length === 0) {
        updatedSexualOrientations = ['all'];
      }
    }
    
    setFormData({
      ...formData,
      sexualOrientations: updatedSexualOrientations
    });
  };

  // Handle age range changes
  const handleAgeRangeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      ageRange: {
        ...formData.ageRange,
        [name]: parseInt(value, 10)
      }
    });
  };

  // Handle distance change
  const handleDistanceChange = (e) => {
    setFormData({
      ...formData,
      distance: parseInt(e.target.value, 10)
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
        <h3 className="text-lg leading-6 font-medium">Matching Preferences</h3>
        <p className="mt-1 max-w-2xl text-sm">Set your preferences for potential matches</p>
      </div>
      
      <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
        {/* Gender Identity Preferences */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Gender Identity Preferences</h4>
          <p className="text-sm text-gray-500 mb-4">Select the gender identities you're interested in matching with.</p>
          
          <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {genderIdentityOptions.map((option) => (
              <div key={option.value} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`gender-${option.value}`}
                    name={`gender-${option.value}`}
                    type="checkbox"
                    checked={formData.genderIdentities.includes(option.value)}
                    onChange={() => handleGenderIdentityChange(option.value)}
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`gender-${option.value}`} className="font-medium text-gray-700">{option.label}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sexual Orientation Preferences */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Sexual Orientation Preferences</h4>
          <p className="text-sm text-gray-500 mb-4">Select the sexual orientations you're interested in matching with.</p>
          
          <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {sexualOrientationOptions.map((option) => (
              <div key={option.value} className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`orientation-${option.value}`}
                    name={`orientation-${option.value}`}
                    type="checkbox"
                    checked={formData.sexualOrientations.includes(option.value)}
                    onChange={() => handleSexualOrientationChange(option.value)}
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`orientation-${option.value}`} className="font-medium text-gray-700">{option.label}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Age Range Preferences */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Age Range Preferences</h4>
          <p className="text-sm text-gray-500 mb-4">Select the age range you're interested in matching with.</p>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="min" className="block text-sm font-medium text-gray-700">Minimum Age</label>
              <input
                type="number"
                name="min"
                id="min"
                min="18"
                max="120"
                value={formData.ageRange.min}
                onChange={handleAgeRangeChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="max" className="block text-sm font-medium text-gray-700">Maximum Age</label>
              <input
                type="number"
                name="max"
                id="max"
                min="18"
                max="120"
                value={formData.ageRange.max}
                onChange={handleAgeRangeChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          {formData.ageRange.min > formData.ageRange.max && (
            <p className="mt-2 text-sm text-red-600">Minimum age cannot be greater than maximum age.</p>
          )}
        </div>
        
        {/* Distance Preferences */}
        <div className="mb-8 border-t border-gray-200 pt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Distance Preferences</h4>
          <p className="text-sm text-gray-500 mb-4">Set the maximum distance for potential matches.</p>
          
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Maximum Distance (miles)</label>
            <input
              type="range"
              name="distance"
              id="distance"
              min="5"
              max="500"
              step="5"
              value={formData.distance}
              onChange={handleDistanceChange}
              className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 px-2 mt-1">
              <span>5 miles</span>
              <span>{formData.distance} miles</span>
              <span>500 miles</span>
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

export default MatchingPreferencesForm;