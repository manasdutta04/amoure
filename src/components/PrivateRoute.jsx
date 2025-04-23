import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute component to protect routes that require authentication
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By protecting user data equally for all genders
 * - SDG 10 (Reduced Inequalities): By ensuring equal access controls for all users
 * 
 * @param {Object} props Component props
 * @param {React.Component} props.component The component to render if the user is authenticated
 * @returns {React.Component} The component or redirect to login
 */
const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.getItem('mockUser');

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Render the protected component
  return <Component />;
};

export default PrivateRoute; 