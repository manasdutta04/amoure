import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, UserGroupIcon, DocumentTextIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';

/**
 * Privacy Policy page with LGBTQ+ focused content
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By ensuring privacy protections for all gender identities
 * - SDG 10 (Reduced Inequalities): By implementing privacy measures that protect vulnerable communities
 */
const PrivacyPage = () => {
  const [expandedSection, setExpandedSection] = useState('data');
  
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
  
  const sections = [
    {
      id: 'data',
      title: 'Data We Collect',
      icon: DocumentTextIcon,
      content: `
        <p class="mb-4">At Amouré, we understand the sensitivity of your personal information, especially for members of the LGBTQ+ community. We only collect information that's necessary to provide you with a safe and personalized experience:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Profile Information:</strong> Your display name, email, age, photos, gender identity, sexual orientation, pronouns, and bio.</li>
          <li><strong>Communication Data:</strong> Messages exchanged with other users through our platform.</li>
          <li><strong>Usage Information:</strong> How you interact with our app, including swipes, matches, and feature usage.</li>
          <li><strong>Device Information:</strong> Your device type, operating system, and IP address for security purposes.</li>
        </ul>
        
        <p class="mb-4">We never collect or store information about your sexual history, HIV status, or health information unless you explicitly choose to share it in your profile.</p>
      `
    },
    {
      id: 'usage',
      title: 'How We Use Your Data',
      icon: EyeIcon,
      content: `
        <p class="mb-4">We use your information to:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>Provide and improve the Amouré service</li>
          <li>Match you with compatible users based on your preferences</li>
          <li>Ensure a safe environment by monitoring for harmful behavior</li>
          <li>Send important updates about our service</li>
          <li>Comply with legal obligations</li>
        </ul>
        
        <p class="mb-4">We understand that for many LGBTQ+ individuals, privacy is not just about convenience—it can be a matter of safety. We never use your gender identity or sexual orientation data for advertising purposes or sell this information to third parties.</p>
      `
    },
    {
      id: 'protection',
      title: 'How We Protect Your Data',
      icon: ShieldCheckIcon,
      content: `
        <p class="mb-4">We implement robust security measures to protect your personal information:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
          <li><strong>Anonymization:</strong> We anonymize data used for analytics</li>
          <li><strong>Access Controls:</strong> Strict internal controls limit who can access user data</li>
          <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability testing</li>
          <li><strong>Location Privacy:</strong> Enhanced privacy features for users in regions where LGBTQ+ identities may be criminalized</li>
        </ul>
        
        <p class="mb-4">We're committed to maintaining the highest standards of data protection, especially for vulnerable communities.</p>
      `
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: UserGroupIcon,
      content: `
        <p class="mb-4">We limit sharing of your personal information to:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Other Users:</strong> Only the information you choose to include in your profile</li>
          <li><strong>Service Providers:</strong> Who help us deliver our service (with strict contractual protections)</li>
          <li><strong>Legal Requirements:</strong> When required by law, but we assess each request carefully and only provide the minimum necessary information</li>
        </ul>
        
        <p class="mb-4">We recognize that in some regions, disclosure of LGBTQ+ identity can lead to discrimination or safety risks. In such cases, we take additional precautions and will notify you of governmental data requests unless legally prohibited from doing so.</p>
      `
    },
    {
      id: 'rights',
      title: 'Your Rights & Choices',
      icon: HeartIcon,
      content: `
        <p class="mb-4">You have rights regarding your personal information:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Access:</strong> Request copies of your personal data</li>
          <li><strong>Correction:</strong> Update or correct inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
          <li><strong>Restriction:</strong> Limit how we process certain information</li>
          <li><strong>Data Portability:</strong> Request transfer of your data in a structured format</li>
          <li><strong>Privacy Settings:</strong> Control visibility of your profile and identity information</li>
        </ul>
        
        <p class="mb-4">We've designed our privacy controls with the specific needs of LGBTQ+ individuals in mind, allowing granular control over who can see different aspects of your identity.</p>
      `
    },
    {
      id: 'safety',
      title: 'Community Safety',
      icon: LockClosedIcon,
      content: `
        <p class="mb-4">Our commitment to privacy is balanced with our responsibility to maintain a safe community:</p>
        
        <ul class="list-disc pl-5 space-y-2 mb-4">
          <li>We monitor for harassment, hate speech, and discriminatory behavior</li>
          <li>Reports of harmful conduct are reviewed by human moderators trained in LGBTQ+ sensitivity</li>
          <li>We cooperate with authorities in cases of serious threats or illegal activity</li>
          <li>We provide resources for users experiencing harassment or discrimination</li>
        </ul>
        
        <p class="mb-4">We strive to make Amouré a safe space where all identities are respected while protecting your privacy.</p>
      `
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
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
              <ShieldCheckIcon className="w-12 h-12 relative z-10 text-white mx-auto" />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent pride-gradient">
            Privacy Policy
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            At Amouré, we believe that everyone deserves both connection and privacy. Our policies are designed to protect all members, with special attention to the privacy concerns of LGBTQ+ individuals.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Last Updated: April 28, 2023
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative z-10 bg-white shadow-xl rounded-2xl overflow-hidden mb-12"
        >
          <div className="absolute top-0 left-0 w-full h-2 pride-gradient"></div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Our Commitment to the LGBTQ+ Community</h2>
            </div>
            <p className="text-gray-600">
              We've designed our privacy practices with the specific needs of the LGBTQ+ community in mind. We recognize that for many of our users, privacy is not just a preference—it can be essential for safety and wellbeing. That's why we go beyond industry standards to protect your identity information and give you control over how your data is used and shared.
            </p>
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
            <h2 className="text-xl font-medium text-gray-900">Questions About Your Privacy?</h2>
          </div>
          <p className="text-gray-600 mb-4">
            If you have questions or concerns about your privacy, please contact our dedicated privacy team at <a href="mailto:privacy@amoure.app" className="text-primary-600 hover:text-primary-500">privacy@amoure.app</a>.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {['Consent', 'Transparency', 'Control', 'Security', 'Respect', 'Trust'].map((value) => (
              <div 
                key={value}
                className="px-4 py-2 bg-white rounded-full shadow-sm text-primary-600 text-sm font-medium"
              >
                {value}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default PrivacyPage;