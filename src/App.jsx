import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MatchesPage from './pages/MatchesPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

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
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected routes */}
          <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
          <Route path="/matches" element={<PrivateRoute component={MatchesPage} />} />
          
          {/* Fallback routes */}
          <Route path="/404" element={<NotFoundPage />} />
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