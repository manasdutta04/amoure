import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

/**
 * About page explaining the app's mission and commitment to UN SDGs
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By highlighting our commitment to gender equality
 * - SDG 10 (Reduced Inequalities): By explaining how the app aims to reduce inequalities for LGBTQ+ community
 */
const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About PridePulse
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Creating meaningful connections in the LGBTQ+ community.
          </p>
        </div>
        
        {/* Our Mission */}
        <div className="mb-16">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                PridePulse was created with a clear mission: to provide a safe, inclusive, and affirming space for the LGBTQ+ community to 
                connect and form meaningful relationships. In a world where dating apps often fail to address the unique needs and 
                experiences of LGBTQ+ individuals, we set out to create a platform that celebrates diversity in gender identity, 
                expression, and sexual orientation.
              </p>
              <p className="text-gray-700 mb-4">
                We believe that everyone deserves to find connection, whether that's friendship, romance, or community, in an environment 
                that respects and validates their identity. PridePulse is more than just a dating app—it's a community built on respect, 
                inclusivity, and genuine human connection.
              </p>
              <p className="text-gray-700">
                Our team is committed to continuous improvement and growth, always listening to our community's needs and evolving 
                to better serve them. We strive to be not just a platform, but a positive force in the lives of LGBTQ+ individuals 
                around the world.
              </p>
            </div>
          </div>
        </div>
        
        {/* UN SDG Commitment */}
        <div className="mb-16">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to UN Sustainable Development Goals</h2>
              
              <div className="mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Gender Equality (SDG 5)</h3>
                </div>
                <div className="ml-16 mt-2">
                  <p className="text-gray-700 mb-4">
                    We are committed to promoting gender equality by:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Creating an inclusive platform that recognizes and respects all gender identities</li>
                    <li>Providing users with the ability to express their gender in a way that's authentic to them</li>
                    <li>Implementing policies that prevent harassment and discrimination based on gender</li>
                    <li>Ensuring our user interface and experience is designed with gender inclusivity in mind</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-white font-bold">10</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Reduced Inequalities (SDG 10)</h3>
                </div>
                <div className="ml-16 mt-2">
                  <p className="text-gray-700 mb-4">
                    We actively work to reduce inequalities by:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Creating a platform that addresses the specific needs of the LGBTQ+ community</li>
                    <li>Developing features that prioritize safety and security for vulnerable users</li>
                    <li>Making our platform accessible to users with diverse abilities and needs</li>
                    <li>Providing resources and support for LGBTQ+ individuals facing discrimination</li>
                    <li>Building community connections that help reduce social isolation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-16">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-700 mb-4">
                PridePulse was developed by a diverse team of developers, designers, and community advocates who are passionate 
                about creating technology that makes a positive impact. Our team members come from various backgrounds and include 
                members of the LGBTQ+ community, allies, and experts in digital safety and community building.
              </p>
              <p className="text-gray-700">
                This project was created for the GNEC Hackathon 2025 Spring, focusing on technology solutions that advance the UN 
                Sustainable Development Goals. We're proud to contribute to the important work of achieving gender equality and 
                reducing inequalities through innovative technology.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact and Feedback */}
        <div>
          <div className="bg-primary-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                We value your feedback and suggestions. If you have ideas for how we can improve PridePulse or questions about our 
                mission and values, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="mailto:feedback@pridepulse.com" 
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Send Feedback
                </a>
                <Link 
                  to="/safety" 
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Visit Safety Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 