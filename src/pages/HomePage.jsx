import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline';

/**
 * Homepage component with hero section and feature highlights
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By promoting inclusive gender representation
 * - SDG 10 (Reduced Inequalities): By emphasizing accessibility and inclusivity for LGBTQ+ community
 */
const HomePage = () => {
  const { currentUser } = useAuth();
  
  // Features section data
  const features = [
    {
      name: 'Inclusive Matching',
      description: 'Find connections based on shared interests, gender identity, and sexual orientation in a respectful environment.',
      icon: HeartIcon,
    },
    {
      name: 'Secure Messaging',
      description: 'Chat with matches through our secure messaging system with privacy controls and moderation features.',
      icon: ChatBubbleBottomCenterTextIcon,
    },
    {
      name: 'Safety First',
      description: 'Your safety is our priority with robust reporting tools and privacy settings that put you in control.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Supportive Community',
      description: 'Join a welcoming community that celebrates all gender identities and sexual orientations.',
      icon: UsersIcon,
    },
  ];
  
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="mt-16 sm:mt-24">
            <div className="mx-auto max-w-7xl">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                  <div>
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Connect with the</span>
                      <span className="block text-primary-600">
                        LGBTQ+ Community
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Amouré fosters safe, inclusive connections for the LGBTQ+ community, 
                      reducing social inequalities and empowering diverse identities. Find meaningful 
                      relationships in a secure and supportive environment.
                    </p>
                    <div className="mt-8 sm:mt-12">
                      {currentUser ? (
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                          <Link
                            to="/matches"
                            className="btn btn-primary text-center px-8 py-3 text-base font-medium rounded-md shadow-sm"
                          >
                            Find Matches
                          </Link>
                          <Link
                            to="/profile"
                            className="btn btn-secondary text-center px-8 py-3 text-base font-medium rounded-md"
                          >
                            View Profile
                          </Link>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                          <Link
                            to="/register"
                            className="btn btn-primary text-center px-8 py-3 text-base font-medium rounded-md shadow-sm"
                          >
                            Join Now
                          </Link>
                          <Link
                            to="/login"
                            className="btn btn-secondary text-center px-8 py-3 text-base font-medium rounded-md"
                          >
                            Sign In
                          </Link>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 sm:mt-10">
                      <p className="text-sm text-gray-500">
                        Amouré is committed to the UN Sustainable Development Goals of 
                        Gender Equality (SDG 5) and Reduced Inequalities (SDG 10).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                  <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-xl sm:overflow-hidden shadow-lg bg-gradient-to-br from-primary-100 to-white">
                    <div className="px-4 py-8 sm:px-10">
                      <div className="w-full h-64 bg-gradient-to-r from-pride-red via-pride-yellow to-pride-purple rounded-lg flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">Amouré</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              A better way to connect
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Amouré is designed to create a positive, affirming space where you can be yourself.
            </p>
          </div>
          
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-primary-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to find your connection?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-100">
            Join thousands of LGBTQ+ individuals finding community, friendship, and love on Amouré.
          </p>
          <div className="mt-8 flex justify-center">
            {currentUser ? (
              <Link
                to="/matches"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Find Matches
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Join Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 