import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

/**
 * 404 Not Found page component
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By using inclusive language
 * - SDG 10 (Reduced Inequalities): By implementing accessible error pages with clear navigation
 */
const NotFoundPage = () => {
  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <svg
                className="mx-auto h-24 w-24 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">404</h2>
              <p className="mt-2 text-center text-lg text-gray-600">
                Oops! The page you're looking for doesn't exist.
              </p>
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-6">
                It seems you've taken a wrong turn. Let's get you back on track!
              </p>
              
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Go to Home
                </Link>
                
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage; 