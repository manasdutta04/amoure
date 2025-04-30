import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { HeartIcon, UserGroupIcon, GlobeAltIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

/**
 * About page explaining the app's mission and commitment to UN SDGs
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By highlighting our commitment to gender equality
 * - SDG 10 (Reduced Inequalities): By explaining how the app aims to reduce inequalities for LGBTQ+ community
 */
const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Pride-themed styling */}
        <div className="text-center relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-br from-white via-gray-50 to-purple-50 p-8 shadow-lg">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-pride-purple rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-pride-blue rounded-full opacity-10 animate-pulse"></div>
          
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pride-red to-pride-purple rounded-full flex items-center justify-center mb-4 shadow-lg">
            <HeartIcon className="h-8 w-8 text-white animated-heart" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Amouré
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Creating meaningful connections in the LGBTQ+ community.
          </p>
        </div>
        
        {/* Our Mission */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-pride-purple opacity-20"></div>
            <h2 className="text-2xl font-bold text-gray-900 px-4">Our Mission</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pride-purple to-transparent opacity-20"></div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 border-t-4 border-pride-gradient">
            <div className="px-6 py-8 relative">
              {/* Background decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pride-yellow opacity-5 rounded-full"></div>
              
              <div className="relative">
                <p className="text-gray-700 mb-4">
                  Amouré was created with a clear mission: to provide a safe, inclusive, and affirming space for the LGBTQ+ community to 
                  connect and form meaningful relationships. In a world where dating apps often fail to address the unique needs and 
                  experiences of LGBTQ+ individuals, we set out to create a platform that celebrates diversity in gender identity, 
                  expression, and sexual orientation.
                </p>
                <p className="text-gray-700 mb-4">
                  We believe that everyone deserves to find connection, whether that's friendship, romance, or community, in an environment 
                  that respects and validates their identity. Amouré is more than just a dating app—it's a community built on respect, 
                  inclusivity, and genuine human connection.
                </p>
                <p className="text-gray-700">
                  Our team is committed to continuous improvement and growth, always listening to our community's needs and evolving 
                  to better serve them. We strive to be not just a platform, but a positive force in the lives of LGBTQ+ individuals 
                  around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* UN SDG Commitment */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-pride-blue opacity-20"></div>
            <h2 className="text-2xl font-bold text-gray-900 px-4">Our Commitment to UN SDGs</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pride-blue to-transparent opacity-20"></div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-2 w-full bg-gradient-to-r from-pride-red to-pride-orange"></div>
              <div className="px-6 py-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pride-red to-pride-orange rounded-full flex items-center justify-center flex-shrink-0 mr-4 shadow-md">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Gender Equality (SDG 5)</h3>
                </div>
                <div className="ml-16">
                  <p className="text-gray-700 mb-4">
                    We are committed to promoting gender equality by:
                  </p>
                  <ul className="space-y-3">
                    {['Creating an inclusive platform that recognizes and respects all gender identities',
                      'Providing users with the ability to express their gender in a way that\'s authentic to them',
                      'Implementing policies that prevent harassment and discrimination based on gender',
                      'Ensuring our user interface and experience is designed with gender inclusivity in mind'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-pride-red to-pride-orange flex items-center justify-center mr-2 mt-0.5 text-white">
                          <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
            
            <div className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-2 w-full bg-gradient-to-r from-pride-purple to-pride-blue"></div>
              <div className="px-6 py-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pride-purple to-pride-blue rounded-full flex items-center justify-center flex-shrink-0 mr-4 shadow-md">
                    <span className="text-white font-bold">10</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Reduced Inequalities (SDG 10)</h3>
                </div>
                <div className="ml-16">
                  <p className="text-gray-700 mb-4">
                    We actively work to reduce inequalities by:
                  </p>
                  <ul className="space-y-3">
                    {['Creating a platform that addresses the specific needs of the LGBTQ+ community',
                      'Developing features that prioritize safety and security for vulnerable users',
                      'Making our platform accessible to users with diverse abilities and needs',
                      'Providing resources and support for LGBTQ+ individuals facing discrimination',
                      'Building community connections that help reduce social isolation'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-pride-purple to-pride-blue flex items-center justify-center mr-2 mt-0.5 text-white">
                          <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-pride-green opacity-20"></div>
            <h2 className="text-2xl font-bold text-gray-900 px-4">Our Team</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pride-green to-transparent opacity-20"></div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="h-2 w-full bg-gradient-to-r from-pride-green to-pride-blue"></div>
            <div className="px-6 py-6 relative">
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-pride-blue opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-pride-green to-pride-blue rounded-full flex items-center justify-center mr-4 shadow-md">
                  <UserGroupIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">A Diverse Team of Creators</h3>
              </div>
              
              <p className="text-gray-700 mb-4 relative">
                Amouré was developed by a diverse team of developers, designers, and community advocates who are passionate 
                about creating technology that makes a positive impact. Our team members come from various backgrounds and include 
                members of the LGBTQ+ community, allies, and experts in digital safety and community building.
              </p>
              <p className="text-gray-700 relative">
                This project was created for the GNEC Hackathon 2025 Spring, focusing on technology solutions that advance the UN 
                Sustainable Development Goals. We're proud to contribute to the important work of achieving gender equality and 
                reducing inequalities through innovative technology.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact and Feedback */}
        <div>
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-pride-red opacity-20"></div>
            <h2 className="text-2xl font-bold text-gray-900 px-4">Get in Touch</h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-pride-red to-transparent opacity-20"></div>
          </div>
          
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
                    <EnvelopeIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">We'd Love to Hear From You</h3>
                </div>
                
                <p className="text-white/90 mb-6 max-w-3xl">
                  We value your feedback and suggestions. If you have ideas for how we can improve Amouré or questions about our 
                  mission and values, we'd love to hear from you. Your input helps us create an even better experience for the LGBTQ+ community.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:feedback@amoure.com" 
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transform transition-transform hover:scale-105"
                  >
                    Send Feedback
                  </a>
                  <Link 
                    to="/safety" 
                    className="inline-flex items-center justify-center px-5 py-3 border border-white rounded-full shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transform transition-transform hover:scale-105"
                  >
                    Visit Safety Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 