import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';

/**
 * Login page component with email and Google authentication options
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing equal access to all genders
 * - SDG 10 (Reduced Inequalities): By creating an accessible login process
 */
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();
  
  // For mock login, we'll just set a user in context
  const mockUser = {
    uid: '123456',
    email: 'user@example.com',
    displayName: 'Demo User'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful login
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      // Reload the page to trigger auth state change
      window.location.href = '/';
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful login
      localStorage.setItem('mockUser', JSON.stringify({
        ...mockUser,
        displayName: 'Google User',
        photoURL: 'https://via.placeholder.com/150'
      }));
      // Reload the page to trigger auth state change
      window.location.href = '/';
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 24
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
    },
    tap: { scale: 0.98 }
  };

  // Pride flag colors for animation
  const prideColors = [
    "rgb(228, 3, 3)",      // Red
    "rgb(255, 140, 0)",    // Orange
    "rgb(255, 237, 0)",    // Yellow
    "rgb(0, 128, 38)",     // Green
    "rgb(0, 77, 255)",     // Blue
    "rgb(117, 7, 135)"     // Purple
  ];

  // Animation for the rainbow border
  const rainbowAnimation = {
    hidden: { 
      backgroundPosition: "0% 50%" 
    },
    visible: { 
      backgroundPosition: "100% 50%",
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse", 
        duration: 3 
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full pride-gradient rainbow-shimmer flex items-center justify-center">
              <HeartIcon className="h-10 w-10 text-white animated-heart" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to <span className="text-primary-600">Amouré</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your LGBTQ+ community awaits
          </p>
          
          {/* Pride identities */}
          <div className="mt-3 flex justify-center flex-wrap gap-2 max-w-xs mx-auto">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full identity-tag-pride">Gay</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full identity-tag-lesbian">Lesbian</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full identity-tag-bi">Bisexual</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full identity-tag-trans">Transgender</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full identity-tag-nonbinary">Non-Binary</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full identity-tag-pan">Pansexual</span>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 pride-border">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <motion.form 
              className="space-y-6 relative z-10" 
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <motion.input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <motion.input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <motion.a 
                    href="#" 
                    className="font-medium text-primary-600 hover:text-primary-500"
                    whileHover={{ scale: 1.05, textDecoration: 'underline' }}
                  >
                    Forgot your password?
                  </motion.a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white btn-pride focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </motion.div>
            </motion.form>

            <motion.div 
              className="mt-6"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.879-1.726-4.358-2.771-7.035-2.771-5.696 0-10.318 4.622-10.318 10.318s4.622 10.318 10.318 10.318c8.834 0 10.761-8.104 9.916-13.366l-9.616 1.143z" />
                  </svg>
                  Google
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-6 text-center"
              variants={itemVariants}
            >
              <p className="text-sm">
                <span className="text-gray-600">New to Amouré? </span>
                <motion.span 
                  whileHover={{ 
                    scale: 1.05, 
                    textDecoration: 'underline' 
                  }}
                >
                  <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                    Join our inclusive community today!
                  </Link>
                </motion.span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage; 