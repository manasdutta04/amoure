import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserCircleIcon, 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

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
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and App name */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex-shrink-0 flex items-center" 
                aria-label="PridePulse home"
              >
                <span className="text-2xl font-bold bg-clip-text text-transparent pride-gradient">
                  PridePulse
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
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1
                      ${
                        location.pathname === item.path
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                    `}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Sign out"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                      ${
                        location.pathname === item.path
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                    `}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Sign out"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-2"
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
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} PridePulse. All rights reserved.
            </p>
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
          <div className="mt-4 text-center text-xs text-gray-400">
            PridePulse is committed to UN SDG 5 (Gender Equality) and SDG 10 (Reduced Inequalities)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 