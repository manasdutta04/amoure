import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  UserGroupIcon,
  HandRaisedIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import '../styles/IdentityAnimations.css';

/**
 * Homepage component with hero section and feature highlights
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By promoting inclusive gender representation
 * - SDG 10 (Reduced Inequalities): By emphasizing accessibility and inclusivity for LGBTQ+ community
 */
const HomePage = () => {
  const { currentUser } = useAuth();
  
  // LGBTQ+ Identities 
  const identities = [
    "Gay", "Lesbian", "Bisexual", "Transgender", "Queer", "Non-Binary", 
    "Pansexual", "Asexual", "Intersex", "Questioning", "Allies"
  ];
  
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
  
  // LGBTQ+ community benefits
  const communityBenefits = [
    {
      name: 'Authentic Connections',
      description: 'Connect with people who understand and share your experiences as part of the LGBTQ+ community.',
      icon: UserGroupIcon,
    },
    {
      name: 'Safe Environment',
      description: 'Our platform is designed with the unique safety and privacy needs of LGBTQ+ individuals in mind.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Inclusive Features',
      description: 'Customizable profiles with comprehensive gender identity and sexual orientation options.',
      icon: HandRaisedIcon,
    },
    {
      name: 'Global Community',
      description: 'Connect with LGBTQ+ individuals and allies from around the world.',
      icon: GlobeAltIcon,
    },
  ];
  
  return (
    <Layout>
      {/* Hero section with Pride flag background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 w-full">
        {/* Pride flag background - desktop only */}
        <div className="hidden sm:block absolute inset-0 opacity-20">
          <div className="h-full w-full grid grid-rows-6">
            <div className="bg-pride-red"></div>
            <div className="bg-pride-orange"></div>
            <div className="bg-pride-yellow"></div>
            <div className="bg-pride-green"></div>
            <div className="bg-pride-blue"></div>
            <div className="bg-pride-purple"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-pride-purple rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute top-40 left-20 w-16 h-16 bg-pride-red rounded-full opacity-15 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-pride-yellow rounded-full opacity-15 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-pride-blue rounded-full opacity-15 animate-pulse"></div>
        
        {/* Large pride gradient backdrop */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-pink-100/60 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-purple-100/40 to-transparent"></div>
        
        <div className="relative pt-8 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
          <main className="mt-16 sm:mt-24">
            <div className="mx-auto w-full">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                  <div>
                    <div className="inline-flex items-center mb-4">
                      <span className="relative bg-gradient-to-r from-[#ff0000] via-[#ff8d00] via-[#ffee00] via-[#008e00] via-[#00d5ff] to-[#9c00ff] text-white px-5 py-2 text-sm font-bold rounded-full shadow-md overflow-hidden animate-gradient">
                        <span className="relative z-10">LGBTQ+ Focused Dating</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#ff0000] via-[#ff8d00] via-[#ffee00] via-[#008e00] via-[#00d5ff] to-[#9c00ff] opacity-70 blur-sm"></span>
                      </span>
                    </div>
                    
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-5xl lg:mt-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl">Dating for the</span>
                        <span className="identity-capsule relative inline-flex items-center justify-center px-10 py-3 rounded-full bg-white shadow-sm overflow-hidden min-w-[240px]">
                          {identities.map((identity, index) => {
                            // Define different colors for variety
                            const colors = [
                              'text-pride-red',
                              'text-pride-orange',
                              'text-pride-yellow',
                              'text-pride-green', 
                              'text-pride-blue',
                              'text-pride-purple'
                            ];
                            
                            return (
                              <span 
                                key={identity} 
                                className={`
                                  identity-tag absolute
                                  ${colors[index % colors.length]}
                                  font-bold text-2xl sm:text-3xl lg:text-4xl whitespace-nowrap
                                  flex items-center justify-center
                                `}
                                aria-hidden={index !== 0}
                              >
                                {identity}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                      
                      <p className="mt-6 text-base text-gray-600 sm:mt-7 sm:text-xl lg:text-lg xl:text-xl">
                        Find real connections in a bold, safe space celebrating every LGBTQ+ identity!
                      </p>
                    </h1>
                    
                    <div className="mt-8 sm:mt-12">
                      {currentUser ? (
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                          <Link
                            to="/matches"
                            className="btn btn-pride text-center px-8 py-3.5 text-base font-medium rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          >
                            <HeartIcon className="w-5 h-5 inline-block mr-2 animated-heart" />
                            Find Matches
                          </Link>
                          <Link
                            to="/profile"
                            className="btn btn-secondary text-center px-8 py-3.5 text-base font-medium rounded-full shadow hover:shadow-md transform transition-all duration-300 hover:scale-105 border-2 border-primary-100"
                          >
                            View Profile
                          </Link>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                          <Link
                            to="/register"
                            className="btn btn-pride text-center px-8 py-3.5 text-base font-medium rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          >
                            <SparklesIcon className="w-5 h-5 inline-block mr-2" />
                            Join Now
                          </Link>
                          <Link
                            to="/login"
                            className="btn btn-secondary text-center px-8 py-3.5 text-base font-medium rounded-full shadow hover:shadow-md transform transition-all duration-300 hover:scale-105 border-2 border-primary-100"
                          >
                            Sign In
                          </Link>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 sm:mt-10">
                      <div className="flex items-center justify-center lg:justify-start">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-pride-red"></div>
                          <div className="w-3 h-3 rounded-full bg-pride-orange"></div>
                          <div className="w-3 h-3 rounded-full bg-pride-yellow"></div>
                          <div className="w-3 h-3 rounded-full bg-pride-green"></div>
                          <div className="w-3 h-3 rounded-full bg-pride-blue"></div>
                          <div className="w-3 h-3 rounded-full bg-pride-purple"></div>
                        </div>
                        <p className="ml-3 text-sm text-gray-600">
                          Amouré is committed to the UN Sustainable Development Goals of 
                          Gender Equality (SDG 5) and Reduced Inequalities (SDG 10).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                  <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-2xl sm:overflow-hidden shadow-xl transform transition-all duration-500 hover:-rotate-2 hover:shadow-2xl">
                    <div className="p-2 pride-gradient rounded-2xl">
                      <div className="relative overflow-hidden rounded-xl bg-white">
                        <div className="absolute inset-0 pride-gradient opacity-10 animate-pulse"></div>
                        <img 
                          src="/amoure.jpeg" 
                          alt="Two people holding rainbow pride hearts" 
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                          <div className="flex items-center">
                            <HeartIconSolid className="h-6 w-6 text-pride-red mr-2" />
                            <span className="font-medium">Find your authentic connection</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* LGBTQ+ Community Focus Section */}
      <div className="relative py-12 bg-gradient-to-br from-white via-gray-50 to-purple-50 overflow-hidden w-full">
        {/* Background pride corner accent */}
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg mx-auto">
            <div className="absolute top-0 right-0 w-40 h-40 pride-gradient opacity-20 transform rotate-45 rounded-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 trans-gradient opacity-20 transform rotate-45 rounded-3xl"></div>
          </div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Our Community</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Made By and For <span className="text-primary-600">LGBTQ+</span> Individuals
            </p>
            <p className="max-w-2xl mt-5 mx-auto text-xl text-gray-500">
              Amouré was created specifically to address the unique needs and experiences of the LGBTQ+ community.
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {communityBenefits.map((benefit) => (
                <div key={benefit.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg shadow-lg px-6 pb-8 h-full pride-card transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 pride-gradient rounded-md shadow-lg">
                          <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-gray-900">{benefit.name}</h3>
                      <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-12 bg-white relative overflow-hidden w-full">
        {/* Decorative elements */}
        <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
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
                <div key={feature.name} className="relative group">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 group-hover:bg-primary-600 text-white rainbow-shimmer transition-colors duration-300">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="pride-gradient relative overflow-hidden w-full">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="rainbow-shimmer w-full h-full"></div>
        </div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full opacity-10"></div>
        
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl drop-shadow-md">
            <span className="block">Ready to find your connection?</span>
            <span className="block mt-2">Join our LGBTQ+ community today!</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white drop-shadow">
            Join thousands of LGBTQ+ individuals finding community, friendship, and love on Amouré.
          </p>
          <div className="mt-8 flex justify-center">
            {currentUser ? (
              <Link
                to="/matches"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-white hover:bg-gray-50 text-primary-600 transform transition-transform duration-300 hover:scale-105 shadow-lg"
              >
                Find Matches
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-white hover:bg-gray-50 text-primary-600 transform transition-transform duration-300 hover:scale-105 shadow-lg"
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