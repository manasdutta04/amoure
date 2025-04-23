// Import Firebase services
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Safety services for PridePulse
 * 
 * These services support:
 * - SDG 5 (Gender Equality): By protecting all users from harassment regardless of gender identity
 * - SDG 10 (Reduced Inequalities): By providing safety resources tailored to LGBTQ+ users
 */

// Report a user
export const reportUser = async (reporterId, reportedUserId, reason, details) => {
  try {
    await addDoc(collection(db, 'reports'), {
      type: 'user',
      reporterId,
      reportedUserId,
      reason,
      details,
      timestamp: serverTimestamp(),
      status: 'pending' // pending, reviewed, closed
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Report a profile photo
export const reportPhoto = async (reporterId, reportedUserId, reason) => {
  try {
    await addDoc(collection(db, 'reports'), {
      type: 'photo',
      reporterId,
      reportedUserId,
      reason,
      timestamp: serverTimestamp(),
      status: 'pending' // pending, reviewed, closed
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Report a message (via chat)
export const reportMessage = async (reporterId, chatId, messageId, reason) => {
  try {
    await addDoc(collection(db, 'reports'), {
      type: 'message',
      reporterId,
      chatId,
      messageId,
      reason,
      timestamp: serverTimestamp(),
      status: 'pending' // pending, reviewed, closed
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Get user's report history
export const getUserReports = async (userId) => {
  try {
    const reportsQuery = query(
      collection(db, 'reports'),
      where('reporterId', '==', userId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(reportsQuery);
    
    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { reports };
  } catch (error) {
    return { error };
  }
};

// Get support resources
export const getSupportResources = () => {
  // A static list of LGBTQ+ support resources
  // In a real app, this might come from a database to be updatable
  
  return {
    resources: [
      {
        id: 'trevor',
        name: 'The Trevor Project',
        description: 'Crisis intervention and suicide prevention for LGBTQ young people.',
        phone: '1-866-488-7386',
        website: 'https://www.thetrevorproject.org/',
        chatUrl: 'https://www.thetrevorproject.org/get-help/',
        category: 'crisis'
      },
      {
        id: 'trans-lifeline',
        name: 'Trans Lifeline',
        description: 'Peer support service run by trans people, for trans and questioning callers.',
        phone: '1-877-565-8860',
        website: 'https://translifeline.org/',
        category: 'crisis'
      },
      {
        id: 'glbt-hotline',
        name: 'LGBT National Help Center',
        description: 'Provides peer-support through hotlines and online chat.',
        phone: '1-888-843-4564',
        website: 'https://www.glbthotline.org/',
        category: 'peer-support'
      },
      {
        id: 'pflag',
        name: 'PFLAG',
        description: 'Support for LGBTQ+ people, their families, and allies.',
        website: 'https://pflag.org/find-a-chapter',
        category: 'family-support'
      },
      {
        id: 'glaad',
        name: 'GLAAD',
        description: 'Media advocacy organization promoting LGBTQ+ acceptance.',
        website: 'https://www.glaad.org/',
        category: 'advocacy'
      },
      {
        id: 'hrc',
        name: 'Human Rights Campaign',
        description: 'America\'s largest civil rights organization working for LGBTQ+ equality.',
        website: 'https://www.hrc.org/',
        category: 'advocacy'
      },
      {
        id: 'center-link',
        name: 'CenterLink',
        description: 'Find an LGBTQ+ community center near you.',
        website: 'https://www.lgbtcenters.org/LGBTCenters',
        category: 'community'
      },
      {
        id: 'sage',
        name: 'SAGE',
        description: 'Advocacy and services for LGBTQ+ older adults.',
        phone: '1-212-741-2247',
        website: 'https://www.sageusa.org/',
        category: 'seniors'
      },
      {
        id: 'nclr',
        name: 'National Center for Lesbian Rights',
        description: 'Legal assistance and information for the LGBTQ+ community.',
        phone: '1-800-528-6257',
        website: 'https://www.nclrights.org/',
        category: 'legal'
      },
      {
        id: 'glaad-resources',
        name: 'GLAAD Resources',
        description: 'Resources for LGBTQ+ people and allies, including coming out resources.',
        website: 'https://www.glaad.org/resourcelist',
        category: 'resources'
      }
    ]
  };
};

// Get safety guidelines
export const getSafetyGuidelines = () => {
  return {
    guidelines: [
      {
        title: 'Profile Safety',
        content: [
          'Only share information you\'re comfortable with others knowing.',
          'Consider using a photo that doesn\'t show your face clearly in your public profile.',
          'Avoid sharing your exact address, workplace, or personal contact details in your profile.'
        ]
      },
      {
        title: 'Messaging Safety',
        content: [
          'Take time to get to know someone before sharing personal information.',
          'Be cautious when someone asks for money or financial assistance.',
          'Trust your instincts - if something feels wrong, it probably is.',
          'Report suspicious behavior or inappropriate messages.'
        ]
      },
      {
        title: 'Meeting In Person',
        content: [
          'Meet in a public place for the first time.',
          'Tell a friend or family member where you\'re going and who you\'re meeting.',
          'Consider a video chat before meeting in person.',
          'Have your own transportation or a ride-sharing app available.'
        ]
      },
      {
        title: 'Online Privacy',
        content: [
          'Use a strong, unique password for your account.',
          'Be careful when clicking links sent in messages.',
          'Log out of your account when using shared devices.',
          'Regularly review your privacy settings.'
        ]
      },
      {
        title: 'Reporting Issues',
        content: [
          'Report suspicious or offensive behavior immediately.',
          'Block users who make you uncomfortable.',
          'Contact local authorities if you feel unsafe or threatened.',
          'Save evidence of threatening or harassing behavior.'
        ]
      }
    ]
  };
}; 