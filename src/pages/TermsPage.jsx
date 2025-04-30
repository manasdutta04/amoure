import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ScaleIcon, 
  ShieldCheckIcon, 
  UserGroupIcon, 
  ExclamationCircleIcon, 
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

/**
 * Terms of Service page with LGBTQ+ focused content
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By establishing inclusive rules for all genders
 * - SDG 10 (Reduced Inequalities): By creating fair terms that protect marginalized communities
 */
const TermsPage = () => {
  const [expandedSection, setExpandedSection] = useState('eligibility');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const rainbowAnimation = {
    initial: { backgroundPosition: "0% 50%" },
    animate: { 
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { 
        repeat: Infinity, 
        duration: 15, 
        ease: "linear" 
      }
    }
  };
  
  const sections = [
    {
      id: 'eligibility',
      title: 'Eligibility & Account Creation',
      icon: UserGroupIcon,
      content: `
        <p class="mb-4">To use Amouré, you must:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>Be at least 18 years old</li>
          <li>Be legally able to form a binding contract</li>
          <li>Not be prohibited from using dating services under applicable law</li>
          <li>Complete the registration process and agree to these Terms</li>
        </ul>
        
        <p class="mb-4">By creating an account, you confirm that:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>All information you provide is accurate, including your identity information</li>
          <li>You will keep your account information current</li>
          <li>You are responsible for maintaining the security of your account and password</li>
          <li>You will not share your account with others or create multiple accounts</li>
        </ul>
        
        <p class="mb-4">We recognize the importance of authentic self-expression for LGBTQ+ individuals. You may use any name you identify with, provided it complies with our community guidelines.</p>
      `
    },
    {
      id: 'community',
      title: 'Community Guidelines',
      icon: HeartIcon,
      content: `
        <p class="mb-4">Amouré is built on respect, inclusivity, and safety. All users must adhere to these community guidelines:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Respect Identity:</strong> Respect other users' gender identity, sexual orientation, pronouns, and expression</li>
          <li><strong>No Harassment:</strong> Do not engage in harassment, hate speech, or discrimination based on gender identity, sexual orientation, race, ethnicity, disability, or any other characteristic</li>
          <li><strong>No Impersonation:</strong> Do not impersonate others or create fake profiles</li>
          <li><strong>No Harmful Content:</strong> Do not share content that is violent, illegal, or explicitly sexual</li>
          <li><strong>No Solicitation:</strong> Do not use Amouré for commercial purposes, solicitation, or advertising</li>
          <li><strong>No Privacy Violations:</strong> Do not share private information about others</li>
        </ul>
        
        <p class="mb-4">We have a zero-tolerance policy for discriminatory behavior against LGBTQ+ individuals. Violations may result in immediate account termination.</p>
      `
    },
    {
      id: 'userContent',
      title: 'User Content & Conduct',
      icon: DocumentTextIcon,
      content: `
        <p class="mb-4">You are responsible for all content you post on Amouré, including photos, messages, and profile information. By posting content, you:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>Grant Amouré a non-exclusive, transferable, royalty-free, worldwide license to use, store, display, and distribute that content in connection with operating and promoting the service</li>
          <li>Represent that you own or have the necessary permissions to use and authorize us to use your content</li>
          <li>Understand that your content may be viewed by other users and, if public, may appear in search results</li>
        </ul>
        
        <p class="mb-4">We value authentic representation and encourage you to express your identity openly. However, we prohibit content that:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>Promotes discrimination or violence against any individual or group</li>
          <li>Contains nudity or explicitly sexual content</li>
          <li>Infringes on the rights of others</li>
          <li>Violates applicable laws or regulations</li>
          <li>Contains personal information about minors</li>
        </ul>
      `
    },
    {
      id: 'safety',
      title: 'Safety & Reporting',
      icon: ShieldCheckIcon,
      content: `
        <p class="mb-4">Your safety is our priority. We provide the following safety features:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Blocking:</strong> You can block any user at any time</li>
          <li><strong>Reporting:</strong> You can report concerning behavior or content</li>
          <li><strong>Privacy Controls:</strong> You control what information is shared on your profile</li>
          <li><strong>Safety Resources:</strong> Access to LGBTQ+ specific safety information and local resources</li>
        </ul>
        
        <p class="mb-4">To report a user or content:</p>
        
        <ol class="list-decimal pl-5 space-y-2 mb-4">
          <li>Use the report function within the app</li>
          <li>Provide as much detail as possible about the issue</li>
          <li>Our moderation team, trained in LGBTQ+ cultural competency, will review the report and take appropriate action</li>
        </ol>
        
        <p class="mb-4">We are committed to maintaining a safe environment for LGBTQ+ individuals and take all reports seriously, especially those involving harassment based on identity.</p>
      `
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions & Purchases',
      icon: ScaleIcon,
      content: `
        <p class="mb-4">Amouré offers both free and premium subscription options:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Free Membership:</strong> Core features including profile creation, browsing, and limited messaging</li>
          <li><strong>Premium Membership:</strong> Additional features such as unlimited likes, advanced filters, and enhanced visibility</li>
          <li><strong>In-App Purchases:</strong> Optional boosts and features to enhance your experience</li>
        </ul>
        
        <p class="mb-4">By subscribing or making a purchase:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>You authorize us to charge the payment method you provide</li>
          <li>Subscriptions automatically renew unless canceled at least 24 hours before the current period ends</li>
          <li>You can manage and cancel subscriptions through your account settings or app store account</li>
          <li>Refunds are governed by our refund policy and applicable app store policies</li>
        </ul>
        
        <p class="mb-4">Amouré is committed to price transparency and will not discriminate in pricing based on user identity information.</p>
      `
    },
    {
      id: 'termination',
      title: 'Termination & Disputes',
      icon: ExclamationCircleIcon,
      content: `
        <p class="mb-4">Either you or Amouré may terminate your account at any time, for any reason, with or without notice. Upon termination:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>You will no longer have access to your account or content</li>
          <li>Amouré may retain your information as required by law or for legitimate business purposes</li>
          <li>These Terms will continue to apply to any remaining obligations</li>
        </ul>
        
        <p class="mb-4">In case of disputes:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>We encourage contacting customer support first to resolve any issues</li>
          <li>Disputes that cannot be resolved informally will be subject to binding arbitration</li>
          <li>Class action waivers may apply subject to applicable law</li>
          <li>Some jurisdictions may provide additional consumer protections</li>
        </ul>
        
        <p class="mb-4">We recognize that LGBTQ+ individuals may face unique challenges in legal systems. We are committed to fair dispute resolution that respects your identity and privacy concerns.</p>
      `
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === section.id ? null : section.id);
  };

  return (
    <Layout>
      <motion.div 
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full pride-gradient animate-pulse"></div>
              </div>
              <DocumentTextIcon className="w-12 h-12 relative z-10 text-white mx-auto" />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent pride-gradient">
            Terms of Service
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to Amouré, the dating platform designed for the LGBTQ+ community. These terms establish our shared commitment to a safe and inclusive environment.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Effective Date: April 28, 2023
          </p>
        </motion.div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={rainbowAnimation}
          className="relative z-10 bg-white shadow-xl rounded-2xl overflow-hidden mb-12 border-2 border-primary-100"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(255,0,0,0.05) 25%, rgba(255,165,0,0.05) 50%, rgba(0,128,0,0.05) 75%, rgba(0,0,255,0.05) 100%)",
            backgroundSize: "400% 400%"
          }}
        >
          <div className="absolute top-0 left-0 w-full h-2 pride-gradient"></div>
          
          <div className="px-4 py-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full pride-gradient flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Our Commitment to Inclusion</h2>
            </div>
            <div className="prose prose-primary max-w-none">
              <p className="text-gray-600">
                Amouré is designed for the diverse LGBTQ+ community and allies. Our terms and policies are crafted to protect all users, with special attention to the unique challenges faced by LGBTQ+ individuals. We're committed to:
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-primary-100">
                  <div className="flex items-center">
                    <SparklesIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="font-medium text-gray-800">Respecting Identity</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Protecting your right to authentic self-expression
                  </p>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-primary-100">
                  <div className="flex items-center">
                    <SparklesIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="font-medium text-gray-800">Community Safety</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Zero tolerance for discrimination and harassment
                  </p>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-primary-100">
                  <div className="flex items-center">
                    <SparklesIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="font-medium text-gray-800">Privacy Protection</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Enhanced privacy controls for sensitive identity information
                  </p>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-primary-100">
                  <div className="flex items-center">
                    <SparklesIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="font-medium text-gray-800">Equitable Treatment</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Fair policies that acknowledge diverse experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className={`bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 ${
                expandedSection === section.id ? 'ring-2 ring-primary-500' : 'hover:shadow-lg'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-5 sm:px-6 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    expandedSection === section.id ? 'pride-gradient' : 'bg-primary-100'
                  }`}>
                    <section.icon className={`h-6 w-6 ${
                      expandedSection === section.id ? 'text-white' : 'text-primary-600'
                    }`} />
                  </div>
                  <h3 className={`text-lg font-medium ${
                    expandedSection === section.id ? 'text-primary-600' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h3>
                </div>
                <div>
                  <span className="ml-6 h-7 flex items-center">
                    <svg 
                      className={`h-6 w-6 transform ${expandedSection === section.id ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </button>
              
              {expandedSection === section.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-5 sm:px-6 border-t border-gray-200"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants} 
          className="mt-12 bg-primary-50 rounded-2xl p-6 shadow-inner"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full pride-gradient flex items-center justify-center">
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-medium text-gray-900">Questions About Our Terms?</h2>
          </div>
          <p className="text-gray-600 mb-4">
            If you have questions about these terms or how they apply to your situation, please contact our support team at <a href="mailto:support@amoure.app" className="text-primary-600 hover:text-primary-500">support@amoure.app</a>.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
            <div>
              <span className="text-sm font-medium text-gray-500 mr-2">By continuing to use Amouré, you agree to these Terms</span>
            </div>
            <div className="flex space-x-2">
              <a href="/privacy" className="px-4 py-2 bg-white rounded-full shadow-sm text-primary-600 text-sm font-medium border border-primary-200 hover:bg-primary-50 transition-colors">
                Privacy Policy
              </a>
              <a href="/safety" className="px-4 py-2 bg-white rounded-full shadow-sm text-primary-600 text-sm font-medium border border-primary-200 hover:bg-primary-50 transition-colors">
                Safety Center
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default TermsPage;