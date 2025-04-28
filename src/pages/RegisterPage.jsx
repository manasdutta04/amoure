import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/solid';

/**
 * Registration page component
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing inclusive gender identity options
 * - SDG 10 (Reduced Inequalities): By creating an accessible registration process
 */
const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSection, setCurrentSection] = useState(1); // 1 = account info, 2 = identity info
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    pronouns: '',
    genderIdentity: '',
    sexualOrientation: '',
    age: '',
    agreeToTerms: false
  });
  
  const genderOptions = [
    { label: 'Select gender identity', value: '' },
    { label: 'Woman', value: 'woman' },
    { label: 'Man', value: 'man' },
    { label: 'Non-binary', value: 'non-binary' },
    { label: 'Transgender', value: 'transgender' },
    { label: 'Genderqueer', value: 'genderqueer' },
    { label: 'Genderfluid', value: 'genderfluid' },
    { label: 'Agender', value: 'agender' },
    { label: 'Prefer to self-describe', value: 'self-describe' },
    { label: 'Prefer not to say', value: 'not-specified' }
  ];
  
  const sexualOrientationOptions = [
    { label: 'Select sexual orientation', value: '' },
    { label: 'Lesbian', value: 'lesbian' },
    { label: 'Gay', value: 'gay' },
    { label: 'Bisexual', value: 'bisexual' },
    { label: 'Pansexual', value: 'pansexual' },
    { label: 'Asexual', value: 'asexual' },
    { label: 'Queer', value: 'queer' },
    { label: 'Questioning', value: 'questioning' },
    { label: 'Straight ally', value: 'straight-ally' },
    { label: 'Prefer to self-describe', value: 'self-describe' },
    { label: 'Prefer not to say', value: 'not-specified' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const nextSection = () => {
    // Basic validation for first section
    if (currentSection === 1) {
      if (!formData.displayName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      
      setError('');
      setCurrentSection(2);
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    setCurrentSection(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    
    if (formData.age < 18) {
      setError('You must be 18 or older to use this service');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful registration and login
      localStorage.setItem('mockUser', JSON.stringify({
        uid: '123456',
        email: formData.email,
        displayName: formData.displayName,
        pronouns: formData.pronouns,
        genderIdentity: formData.genderIdentity,
        sexualOrientation: formData.sexualOrientation,
        age: formData.age
      }));
      
      // Navigate to profile completion page
      window.location.href = '/';
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
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

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Layout>
      <motion.div 
        className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="sm:mx-auto sm:w-full sm:max-w-md text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: 0, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 mx-auto rounded-full pride-gradient flex items-center justify-center">
              <HeartIcon className="h-8 w-8 text-white animate-pulse" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-center text-3xl font-extrabold bg-clip-text text-transparent pride-gradient"
            variants={itemVariants}
          >
            {currentSection === 1 ? 'Join Amouré' : 'Tell Us About Yourself'}
          </motion.h2>
          
          <motion.p 
            className="mt-2 text-center text-base text-gray-600"
            variants={itemVariants}
          >
            {currentSection === 1 
              ? 'Create your account to join our inclusive LGBTQ+ community' 
              : 'Help us create an inclusive experience that celebrates your identity'}
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 relative overflow-hidden"
            variants={itemVariants}
            style={{ 
              borderWidth: '3px',
              borderStyle: 'solid',
              borderImage: 'linear-gradient(to right, #E40303, #FF8C00, #FFED00, #008026, #004DFF, #750787) 1'
            }}
          >
            <motion.div 
              className="absolute -inset-1 opacity-20 rounded-xl"
              style={{ 
                background: 'linear-gradient(90deg, rgb(228, 3, 3), rgb(255, 140, 0), rgb(255, 237, 0), rgb(0, 128, 38), rgb(0, 77, 255), rgb(117, 7, 135), rgb(228, 3, 3))',
                backgroundSize: '200% 200%',
              }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
            
            {error && (
              <motion.div 
                className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 relative z-10"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <motion.form 
              className="space-y-6 relative z-10" 
              onSubmit={handleSubmit}
            >
              {/* Progress indicator */}
              <motion.div 
                className="flex justify-center mb-6"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentSection >= 1 ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-white font-medium">1</span>
                  </motion.div>
                  <div className={`w-10 h-1 ${
                    currentSection > 1 ? 'bg-primary-600' : 'bg-gray-200'
                  }`}></div>
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentSection >= 2 ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-white font-medium">2</span>
                  </motion.div>
                </div>
              </motion.div>
              
              {currentSection === 1 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  transition={pageTransition}
                >
                  {/* Display Name */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                      Display Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <motion.input
                        id="displayName"
                        name="displayName"
                        type="text"
                        required
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <motion.input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <motion.input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">At least 6 characters</p>
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <motion.input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div className="mt-6" variants={itemVariants}>
                    <motion.button
                      type="button"
                      onClick={nextSection}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6 text-center"
                    variants={itemVariants}
                  >
                    <p className="text-sm">
                      <span className="text-gray-600">Already have an account? </span>
                      <motion.span 
                        whileHover={{ 
                          scale: 1.05, 
                          textDecoration: 'underline' 
                        }}
                      >
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                          Sign in instead
                        </Link>
                      </motion.span>
                    </p>
                  </motion.div>
                </motion.div>
              )}
              
              {currentSection === 2 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  transition={pageTransition}
                >
                  {/* Pronouns */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700">
                      Pronouns
                    </label>
                    <div className="mt-1">
                      <motion.input
                        id="pronouns"
                        name="pronouns"
                        type="text"
                        placeholder="e.g. she/her, they/them, he/him"
                        value={formData.pronouns}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </motion.div>

                  {/* Gender Identity */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="genderIdentity" className="block text-sm font-medium text-gray-700">
                      Gender Identity
                    </label>
                    <div className="mt-1">
                      <motion.select
                        id="genderIdentity"
                        name="genderIdentity"
                        value={formData.genderIdentity}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      >
                        {genderOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </motion.select>
                    </div>
                  </motion.div>

                  {/* Sexual Orientation */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="sexualOrientation" className="block text-sm font-medium text-gray-700">
                      Sexual Orientation
                    </label>
                    <div className="mt-1">
                      <motion.select
                        id="sexualOrientation"
                        name="sexualOrientation"
                        value={formData.sexualOrientation}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      >
                        {sexualOrientationOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </motion.select>
                    </div>
                  </motion.div>

                  {/* Age */}
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <motion.input
                        id="age"
                        name="age"
                        type="number"
                        min="18"
                        max="120"
                        placeholder="Must be 18 or older"
                        required
                        value={formData.age}
                        onChange={handleInputChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">You must be 18 or older to use this service</p>
                  </motion.div>

                  {/* Terms and Conditions */}
                  <motion.div className="flex items-start mb-6" variants={itemVariants}>
                    <div className="flex items-center h-5">
                      <motion.input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        whileHover={{ scale: 1.2 }}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </motion.div>

                  <motion.div className="flex space-x-3" variants={itemVariants}>
                    <motion.button
                      type="button"
                      onClick={prevSection}
                      className="flex-1 flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Back
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating...
                        </span>
                      ) : 'Create account'}
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </motion.form>
            
            <motion.div 
              className="absolute bottom-2 right-2 text-xs text-primary-600 flex items-center opacity-75"
              variants={itemVariants}
              whileHover={{ opacity: 1 }}
            >
              <SparklesIcon className="h-3 w-3 mr-1" />
              <span>A safe space for all identities</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default RegisterPage; 