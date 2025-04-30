import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getSupportResources, getSafetyGuidelines } from '../services/safetyService';
import { ShieldCheckIcon, HeartIcon, UserGroupIcon, LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

/**
 * Safety page with resources and guidelines for safe online dating
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing safety resources that address gender-based concerns
 * - SDG 10 (Reduced Inequalities): By making safety information accessible to all users
 */
const SafetyPage = () => {
  const [resources, setResources] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Fetch safety resources and guidelines
  useEffect(() => {
    // Get support resources
    const resourceData = getSupportResources();
    setResources(resourceData.resources);
    
    // Get safety guidelines
    const guidelinesData = getSafetyGuidelines();
    setGuidelines(guidelinesData.guidelines);
  }, []);
  
  // Filter resources by category
  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);
  
  // Get unique categories
  const categories = ['all', ...new Set(resources.map(resource => resource.category))];

  // Icon mapping for safety guidelines
  const guidelineIcons = {
    'Profile Safety': <UserGroupIcon className="h-6 w-6" />,
    'Messaging Safety': <HeartIcon className="h-6 w-6" />,
    'Meeting In Person': <UserGroupIcon className="h-6 w-6" />,
    'Online Privacy': <LockClosedIcon className="h-6 w-6" />,
    'Reporting Issues': <ExclamationCircleIcon className="h-6 w-6" />
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="text-center relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-br from-white via-gray-50 to-purple-50 p-8 shadow-lg">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-pride-purple rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-pride-blue rounded-full opacity-10 animate-pulse"></div>
          
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pride-blue to-pride-purple rounded-full flex items-center justify-center mb-4 shadow-lg">
            <ShieldCheckIcon className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            LGBTQ+ Safety Center
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Your safety is our top priority. Find resources, tips, and guidelines to stay safe while using Amouré.
          </p>
        </div>
        
        {/* Safety Guidelines Section */}
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-pride-purple opacity-20"></div>
            <h2 className="text-2xl font-bold text-gray-900 px-4">Safety Guidelines</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pride-purple to-transparent opacity-20"></div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {guidelines.map((guideline, index) => (
              <div 
                key={index} 
                className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 border-t-4 border-pride-gradient"
              >
                <div className="px-6 py-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pride-blue to-pride-purple flex items-center justify-center mr-4">
                      {guidelineIcons[guideline.title] || <ShieldCheckIcon className="h-5 w-5 text-white" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{guideline.title}</h3>
                  </div>
                  <div className="mt-4">
                    <ul className="space-y-3">
                      {guideline.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mr-2 mt-0.5">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Support Resources Section */}
        <div className="mt-16">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-pride-purple opacity-20"></div>
            <h2 className="text-2xl font-bold text-gray-900 px-4">LGBTQ+ Support Resources</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pride-purple to-transparent opacity-20"></div>
          </div>
          
          {/* Category filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => {
                // Different colors for each category button
                const gradients = [
                  'from-pride-red to-pride-orange',
                  'from-pride-orange to-pride-yellow',
                  'from-pride-yellow to-pride-green',
                  'from-pride-green to-pride-blue',
                  'from-pride-blue to-pride-purple',
                  'from-pride-purple to-pride-red'
                ];
                
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm ${
                      activeCategory === category
                        ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-md`
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Resources grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="h-2 w-full pride-gradient"></div>
                <div className="px-6 py-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">{resource.name}</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{resource.description}</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {resource.phone && (
                      <p className="text-sm flex items-center">
                        <svg className="h-4 w-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${resource.phone}`} className="text-primary-600 hover:text-primary-500 font-medium" aria-label={`Call ${resource.name}`}>
                          {resource.phone}
                        </a>
                      </p>
                    )}
                    {resource.website && (
                      <p className="text-sm flex items-center">
                        <svg className="h-4 w-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <a 
                          href={resource.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary-600 hover:text-primary-500 font-medium"
                          aria-label={`Visit ${resource.name} website`}
                        >
                          Visit Website
                        </a>
                      </p>
                    )}
                    {resource.chatUrl && (
                      <p className="text-sm flex items-center">
                        <svg className="h-4 w-4 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <a 
                          href={resource.chatUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary-600 hover:text-primary-500 font-medium"
                          aria-label={`Chat with ${resource.name}`}
                        >
                          Live Chat Support
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Report Issues Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl overflow-hidden shadow-lg text-white">
            <div className="relative px-6 py-8">
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <ExclamationCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Need to Report an Issue?</h2>
                </div>
                
                <p className="text-white/90 mb-6 max-w-3xl">
                  If you encounter harassment, inappropriate content, or any concerns while using Amouré, 
                  please report it immediately. We take all reports seriously and will respond promptly.
                  Your safety and well-being are our top priorities.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:support@amoure.com" 
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transform transition-transform hover:scale-105"
                  >
                    Report via Email
                  </a>
                  <button 
                    type="button"
                    onClick={() => window.alert('This feature is not available in the MVP. Please contact us via email.')}
                    className="inline-flex items-center justify-center px-5 py-3 border border-white rounded-full shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transform transition-transform hover:scale-105"
                  >
                    In-App Reporting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyPage; 