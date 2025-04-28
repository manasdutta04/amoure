import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { motion } from 'framer-motion';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import SafetyPage from './pages/SafetyPage';

// Import styles
import './styles/index.css';

// Import Protected Route component
import PrivateRoute from './components/PrivateRoute';

/**
 * Main App component with complete routing setup
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing equal access to all app features
 * - SDG 10 (Reduced Inequalities): By creating an inclusive platform for the LGBTQ+ community
 */
function App() {
  // Page transition animation
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes with page transitions */}
          <Route path="/" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <HomePage />
            </motion.div>
          } />
          
          <Route path="/login" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <LoginPage />
            </motion.div>
          } />
          
          <Route path="/register" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <RegisterPage />
            </motion.div>
          } />
          
          <Route path="/about" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AboutPage />
            </motion.div>
          } />
          
          <Route path="/safety" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <SafetyPage />
            </motion.div>
          } />
          
          {/* Protected routes - wrapped in transition effects */}
          <Route path="/profile" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <PrivateRoute component={ProfilePage} />
            </motion.div>
          } />
          
          <Route path="/matches" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <PrivateRoute component={MatchesPage} />
            </motion.div>
          } />
          
          {/* Fallback routes */}
          <Route path="/404" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <NotFoundPage />
            </motion.div>
          } />
          
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

/**
 * Simple protected route component
 */
function ProtectedRoute({ element }) {
  const isAuthenticated = !!localStorage.getItem('mockUser');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
}

export default App; 