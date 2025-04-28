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
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

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
      path: '/chats',
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
      {/* Header/Navigation with rainbow indicator */}
      <header 
        className={`${
          hasScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
        } sticky top-0 z-40 transition-all duration-300`}
        aria-label="Main navigation"
      >
        {/* Rainbow progress bar at top of navigation */}
        <div className="h-1 w-full pride-gradient"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and App name */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex-shrink-0 flex items-center" 
                aria-label="Amouré home"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full pride-gradient flex items-center justify-center mr-2">
                    <HeartIconSolid className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent pride-gradient">
                  Amouré
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 items-center">
              {navItems
                .filter(item => !item.requiresAuth || (item.requiresAuth && currentUser))
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-1
                      ${
                        location.pathname === item.path
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                      transition-all duration-200
                    `}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                    {item.path === '/matches' && currentUser && (
                      <span className="flex h-5 w-5 relative -top-2 -right-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pride-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-pride-purple items-center justify-center text-white text-xs">2</span>
                      </span>
                    )}
                  </Link>
                ))}
              
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                  aria-label="Sign out"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-md transition-all duration-200"
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
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems
                .filter(item => !item.requiresAuth || (item.requiresAuth && currentUser))
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 rounded-full text-base font-medium flex items-center space-x-2
                      ${
                        location.pathname === item.path
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                    `}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                    {item.path === '/matches' && currentUser && (
                      <span className="inline-flex rounded-full bg-pride-red text-white px-2 py-0.5 text-xs">
                        2
                      </span>
                    )}
                  </Link>
                ))}
                
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-full text-base font-medium text-gray-600 hover:bg-gray-100 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Sign out"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-full text-base font-medium bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-2"
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
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-4 border-t border-gray-200" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full pride-gradient flex items-center justify-center mr-2">
                <HeartIconSolid className="h-4 w-4 text-white" />
              </div>
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Amouré. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/about" className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
                About
              </Link>
              <Link to="/safety" className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
                Safety
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-400 flex items-center justify-center">
            <SparklesIcon className="h-3 w-3 mr-1" />
            <span>Amouré is committed to UN SDG 5 (Gender Equality) and SDG 10 (Reduced Inequalities)</span>
          </div>
        </div>
        {/* Pride flag stripe at bottom */}
        <div className="h-1 w-full pride-gradient mt-4"></div>
      </footer>
    </div>
  );
};

export default Layout; 