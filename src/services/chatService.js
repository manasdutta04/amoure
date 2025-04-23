// Import Firebase services
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  onSnapshot, 
  doc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  deleteDoc,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Chat services for PridePulse
 * 
 * These services support:
 * - SDG 5 (Gender Equality): By providing a safe space for communication regardless of gender identity
 * - SDG 10 (Reduced Inequalities): By enabling connections between diverse LGBTQ+ community members
 */

// Create a new chat between two users
export const createChat = async (userId1, userId2) => {
  try {
    // Check if a chat already exists between these users
    const existingChat = await findChatByUsers(userId1, userId2);
    
    if (existingChat) {
      return { chatId: existingChat.id };
    }
    
    // Create a new chat document
    const chatRef = await addDoc(collection(db, 'chats'), {
      participants: [userId1, userId2],
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageTime: null
    });
    
    return { chatId: chatRef.id };
  } catch (error) {
    return { error };
  }
};

// Find a chat by the two user IDs
export const findChatByUsers = async (userId1, userId2) => {
  try {
    // Query for chats where both users are participants
    const q1 = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', userId1)
    );
    
    const querySnapshot = await getDocs(q1);
    
    let chat = null;
    
    // Check each chat to see if the other user is a participant
    querySnapshot.forEach((doc) => {
      const chatData = doc.data();
      if (chatData.participants.includes(userId2)) {
        chat = {
          id: doc.id,
          ...chatData
        };
      }
    });
    
    return chat;
  } catch (error) {
    console.error('Error finding chat:', error);
    return null;
  }
};

// Send a message in a chat
export const sendMessage = async (chatId, senderId, content) => {
  try {
    // Add the message to the messages subcollection
    const messageRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
      senderId,
      content,
      timestamp: serverTimestamp(),
      read: false
    });
    
    // Update the chat with the last message info
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: content,
      lastMessageTime: serverTimestamp(),
      lastMessageSender: senderId
    });
    
    return { messageId: messageRef.id };
  } catch (error) {
    return { error };
  }
};

// Get messages for a chat with pagination
export const getMessages = async (chatId, messagesLimit = 50) => {
  try {
    const messagesQuery = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('timestamp', 'desc'),
      limit(messagesLimit)
    );
    
    const querySnapshot = await getDocs(messagesQuery);
    
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Return in reverse order so newest is last
    return { messages: messages.reverse() };
  } catch (error) {
    return { error };
  }
};

// Listen to new messages in a chat
export const listenToMessages = (chatId, callback) => {
  const messagesQuery = query(
    collection(db, `chats/${chatId}/messages`),
    orderBy('timestamp', 'asc')
  );
  
  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    callback(messages);
  });
};

// Get all chats for a user
export const getUserChats = async (userId) => {
  try {
    const chatsQuery = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );
    
    const querySnapshot = await getDocs(chatsQuery);
    
    const chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { chats };
  } catch (error) {
    return { error };
  }
};

// Listen to all chats for a user
export const listenToUserChats = (userId, callback) => {
  const chatsQuery = query(
    collection(db, 'chats'),
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTime', 'desc')
  );
  
  return onSnapshot(chatsQuery, (snapshot) => {
    const chats = [];
    snapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    callback(chats);
  });
};

// Mark all messages in a chat as read
export const markMessagesAsRead = async (chatId, userId) => {
  try {
    const messagesQuery = query(
      collection(db, `chats/${chatId}/messages`),
      where('senderId', '!=', userId),
      where('read', '==', false)
    );
    
    const querySnapshot = await getDocs(messagesQuery);
    
    const batch = [];
    querySnapshot.forEach((doc) => {
      batch.push(updateDoc(doc.ref, { read: true }));
    });
    
    await Promise.all(batch);
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Report a message
export const reportMessage = async (chatId, messageId, reporterId, reason) => {
  try {
    await addDoc(collection(db, 'reports'), {
      chatId,
      messageId,
      reporterId,
      reason,
      timestamp: serverTimestamp(),
      status: 'pending' // pending, reviewed, closed
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Block a user (prevents further messaging)
export const blockUser = async (blockerId, blockedId) => {
  try {
    // Add the blocked user to the blocker's blocked list
    await updateDoc(doc(db, 'users', blockerId), {
      blockedUsers: arrayUnion(blockedId)
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Unblock a user
export const unblockUser = async (blockerId, blockedId) => {
  try {
    await updateDoc(doc(db, 'users', blockerId), {
      blockedUsers: arrayRemove(blockedId)
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
};

// Check if a user is blocked by the current user
export const isUserBlocked = async (currentUserId, userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', currentUserId));
    
    if (userDoc.exists() && userDoc.data().blockedUsers) {
      return userDoc.data().blockedUsers.includes(userId);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking blocked status:', error);
    return false;
  }
};

// Delete a chat (only mark as deleted for the current user)
export const deleteChat = async (chatId, userId) => {
  try {
    // Instead of actually deleting, we mark the chat as deleted for this user
    await updateDoc(doc(db, 'chats', chatId), {
      deletedFor: arrayUnion(userId)
    });
    
    return { success: true };
  } catch (error) {
    return { error };
  }
}; 