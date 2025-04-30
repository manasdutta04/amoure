import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserCircleIcon, 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import '../styles/cursors.css';

/**
 * Layout component for consistent page structure with navigation
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing inclusive, accessible navigation for all users
 * - SDG 10 (Reduced Inequalities): By implementing accessible navigation with ARIA attributes
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Content to render within the layout
 * @returns {React.Component} Layout component with navigation and children
 */
const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get latest match ID from localStorage
  const getLatestMatchId = () => {
    try {
      // Get activeMatches from localStorage
      const storedMatches = localStorage.getItem('activeMatches');
      if (storedMatches) {
        const matches = JSON.parse(storedMatches);
        if (matches.length > 0) {
          // Sort by lastAccessed to get the most recent match
          matches.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
          return matches[0];
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting latest match:", error);
      return null;
    }
  };

  // Navigate to chat with latest match
  const handleGoToLatestMatch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const latestMatch = getLatestMatchId();
    if (latestMatch) {
      navigate(`/chat/${latestMatch.id}`);
    } else {
      // If no latest match, just go to matches page
      navigate('/matches');
    }
  };

  // Navigation items
  const navItems = [
    {
      name: 'Profile',
      path: '/profile',
      icon: UserCircleIcon,
      requiresAuth: true
    },
    {
      name: 'Matches',
      path: '/matches',
      icon: HeartIcon,
      requiresAuth: true
    },
    {
      name: 'Chats',
      path: '/chat',
      icon: ChatBubbleLeftRightIcon,
      requiresAuth: true
    },
    {
      name: 'Safety',
      path: '/safety',
      icon: ShieldCheckIcon,
      requiresAuth: false
    }
  ];
  
  // Check if there are new matches
  const hasNewMatches = () => {
    try {
      // Get activeMatches from localStorage
      const storedMatches = localStorage.getItem('activeMatches');
      if (storedMatches) {
        const matches = JSON.parse(storedMatches);
        // Consider a match "new" if it was created within the last 24 hours
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        return matches.some(match => {
          const matchDate = new Date(match.lastAccessed);
          return matchDate > oneDayAgo;
        });
      }
      return false;
    } catch (error) {
      console.error("Error checking for new matches:", error);
      return false;
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* LGBTQ+ Focus Banner */}
      <div className="bg-gradient-to-r from-pride-purple via-pride-blue to-pride-red overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="rainbow-shimmer w-full h-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-1.5 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-sm font-medium flex items-center justify-center">
            <SparklesIcon className="inline-block h-4 w-4 mr-1 animate-pulse" aria-hidden="true" />
            <span className="relative inline-block">
              <span>Proudly designed for the LGBTQ+ community</span>
              <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white opacity-50"></span>
            </span>
            <SparklesIcon className="inline-block h-4 w-4 ml-1 animate-pulse" aria-hidden="true" />
          </p>
        </div>
      </div>
      
      {/* Header/Navigation with rainbow indicator */}
      <header 
        className={`${
          hasScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
        } sticky top-0 z-40 transition-all duration-300`}
        aria-label="Main navigation"
      >
        {/* Rainbow progress bar at top of navigation */}
        <div className="h-2 w-full pride-gradient"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Rainbow accent in the header background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50 to-transparent opacity-40"></div>
          
          <div className="flex justify-between h-16 relative">
            {/* Logo and App name */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex-shrink-0 flex items-center group transition-transform duration-300 hover:scale-105" 
                aria-label="Amouré home"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full pride-gradient flex items-center justify-center mr-2 rainbow-shimmer">
                    <HeartIconSolid className="h-5 w-5 text-white animated-heart" />
                  </div>
                </div>
                <div className="flex flex-col items-start ml-1">
                  <span className="text-xl font-bold text-primary-600">
                    Amouré
                  </span>
                  <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-md shadow-sm">
                    LGBTQ+
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 items-center bg-white/50 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
              {navItems
                .filter(item => !item.requiresAuth || (item.requiresAuth && currentUser))
                .map((item, index) => {
                  // Define different gradient backgrounds for each nav item
                  const gradients = [
                    'from-pride-red to-pride-orange',
                    'from-pride-orange to-pride-yellow',
                    'from-pride-green to-pride-blue',
                    'from-pride-blue to-pride-purple'
                  ];
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1
                        ${
                          location.pathname === item.path
                            ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-md ring-2 ring-white`
                            : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600 nav-indicator'
                        }
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                        transition-all duration-200
                      `}
                      aria-current={location.pathname === item.path ? 'page' : undefined}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      <span>{item.name}</span>
                      {item.path === '/matches' && currentUser && hasNewMatches() && (
                        <span className="flex h-5 w-5 relative -top-2 -right-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pride-red opacity-75"></span>
                          <button 
                            onClick={handleGoToLatestMatch}
                            className="relative inline-flex cursor-pointer"
                          >
                            <BellAlertIcon className="h-4 w-4 text-pride-red" aria-label="New match! Click to message them" />
                          </button>
                        </span>
                      )}
                    </Link>
                  );
                })}
              
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-primary-600 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 nav-indicator"
                  aria-label="Sign out"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium btn-pride text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-md transition-all duration-200"
                  aria-label="Sign in"
                >
                  Sign In
                </Link>
              )}
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 hover:scale-110 group overflow-hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="absolute inset-0 opacity-0 pride-gradient group-hover:opacity-10 transition-opacity duration-300"></div>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6 group-hover:text-primary-600" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6 group-hover:text-primary-600" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm mt-1">
              {navItems
                .filter(item => !item.requiresAuth || (item.requiresAuth && currentUser))
                .map((item, index) => {
                  // Define different gradient backgrounds for each nav item
                  const gradients = [
                    'from-pride-red to-pride-orange',
                    'from-pride-orange to-pride-yellow',
                    'from-pride-green to-pride-blue',
                    'from-pride-blue to-pride-purple'
                  ];
                  
                  return (
                    <div key={item.name} className="flex items-center">
                      <Link
                        to={item.path}
                        className={`block px-3 py-2 rounded-lg text-base font-medium flex items-center space-x-2 flex-grow
                          ${
                            location.pathname === item.path
                              ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-sm ring-2 ring-white`
                              : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600 nav-indicator'
                          }
                          focus:outline-none focus:ring-2 focus:ring-primary-500
                        `}
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        <span>{item.name}</span>
                      </Link>
                      {item.path === '/matches' && currentUser && hasNewMatches() && (
                        <button
                          onClick={(e) => {
                            handleGoToLatestMatch(e);
                            setIsMenuOpen(false);
                          }}
                          className="ml-2 p-2"
                          aria-label="Go to latest match"
                        >
                          <BellAlertIcon className="h-5 w-5 text-pride-red animate-pulse" />
                        </button>
                      )}
                    </div>
                  );
                })}
                
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-primary-600 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 nav-indicator"
                  aria-label="Sign out"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-lg text-base font-medium btn-pride text-white focus:outline-none focus:ring-2 focus:ring-primary-500 mt-2"
                  aria-label="Sign in"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-grow w-full overflow-hidden">
        <div className="w-full mx-auto">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 relative">
          {/* Subtle background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white opacity-50"></div>
          
          <div className="relative">
            <nav className="flex flex-wrap justify-center -mx-5 -my-2">
              <div className="px-5 py-2">
                <Link to="/about" className="text-base text-gray-600 hover:text-primary-600 transition-colors nav-indicator">
                  About
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link to="/safety" className="text-base text-gray-600 hover:text-primary-600 transition-colors nav-indicator">
                  Safety
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link to="/privacy" className="text-base text-gray-600 hover:text-primary-600 transition-colors nav-indicator">
                  Privacy
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link to="/terms" className="text-base text-gray-600 hover:text-primary-600 transition-colors nav-indicator">
                  Terms
                </Link>
              </div>
            </nav>
            
            {/* LGBTQ+ Focus Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex flex-col items-center justify-center">
                {/* Pride dots removed */}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">
                  © {new Date().getFullYear()} Amouré. All rights reserved.
                </p>
                <p className="text-xs text-gray-400">
                  Proudly created for the LGBTQ+ community with love ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;