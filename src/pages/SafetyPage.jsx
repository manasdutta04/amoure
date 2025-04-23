import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getSupportResources, getSafetyGuidelines } from '../services/safetyService';

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
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Safety Center
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Your safety is our top priority. Find resources, tips, and guidelines to stay safe while using PridePulse.
          </p>
        </div>
        
        {/* Safety Guidelines Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety Guidelines</h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {guidelines.map((guideline, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{guideline.title}</h3>
                  <div className="mt-4">
                    <ul className="space-y-3">
                      {guideline.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex">
                          <svg className="flex-shrink-0 h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 text-gray-700">{item}</span>
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
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">LGBTQ+ Support Resources</h2>
          
          {/* Category filter */}
          <div className="mb-6">
            <div className="sm:flex sm:flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    activeCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Resources grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{resource.name}</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{resource.description}</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {resource.phone && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Phone: </span>
                        <a href={`tel:${resource.phone}`} className="text-primary-600 hover:text-primary-500" aria-label={`Call ${resource.name}`}>
                          {resource.phone}
                        </a>
                      </p>
                    )}
                    {resource.website && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Website: </span>
                        <a 
                          href={resource.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary-600 hover:text-primary-500"
                          aria-label={`Visit ${resource.name} website`}
                        >
                          Visit Website
                        </a>
                      </p>
                    )}
                    {resource.chatUrl && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">Chat: </span>
                        <a 
                          href={resource.chatUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary-600 hover:text-primary-500"
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
        <div className="mt-12 bg-primary-50 rounded-lg overflow-hidden shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Need to Report an Issue?</h2>
            <p className="text-gray-700 mb-4">
              If you encounter harassment, inappropriate content, or any concerns while using PridePulse, 
              please report it immediately. We take all reports seriously and will respond promptly.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a 
                href="mailto:support@pridepulse.com" 
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto"
              >
                Report via Email
              </a>
              <button 
                type="button"
                onClick={() => window.alert('This feature is not available in the MVP. Please contact us via email.')}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto"
              >
                In-App Reporting
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyPage; 