import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import MessageBubble from '../components/MessageBubble';
import { 
  getUserChats, 
  getMessages, 
  sendMessage, 
  markMessagesAsRead,
  listenToMessages
} from '../services/chatService';

/**
 * Chat page for messaging between matched users
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing equal communication tools for all users regardless of gender identity
 * - SDG 10 (Reduced Inequalities): By enabling meaningful connections between diverse LGBTQ+ community members
 */
const ChatPage = () => {
  const { chatId } = useParams();
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Fetch user's chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, create some mock chats if none exist
        // In a real app, this would come from the database
        const mockChats = [
          {
            id: 'chat1',
            participants: [currentUser.uid, 'user1'],
            lastMessage: 'Hey, how are you doing?',
            lastMessageTime: new Date(),
            lastMessageSender: 'user1'
          },
          {
            id: 'chat2',
            participants: [currentUser.uid, 'user2'],
            lastMessage: 'Would you like to meet for coffee?',
            lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
            lastMessageSender: currentUser.uid
          },
          {
            id: 'chat3',
            participants: [currentUser.uid, 'user3'],
            lastMessage: 'I enjoyed our conversation!',
            lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
            lastMessageSender: 'user3'
          }
        ];
        
        // In a real app, we would use the getUserChats function
        // const { chats: userChats, error: chatsError } = await getUserChats(currentUser.uid);
        // if (chatsError) throw new Error(chatsError);
        
        setChats(mockChats);
        
        // If chatId is provided in URL, set it as active
        if (chatId && mockChats.some(chat => chat.id === chatId)) {
          const selectedChat = mockChats.find(chat => chat.id === chatId);
          setActiveChat(selectedChat);
        } else if (mockChats.length > 0) {
          // Otherwise select the first chat
          setActiveChat(mockChats[0]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load chats');
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchChats();
    } else {
      setLoading(false);
    }
  }, [currentUser, chatId]);
  
  // Subscribe to messages for active chat
  useEffect(() => {
    let unsubscribe = null;
    
    const setupChatSubscription = async () => {
      if (activeChat) {
        try {
          // For demo purposes, create some mock messages
          // In a real app, this would come from the database
          const mockMessages = [
            {
              id: 'msg1',
              content: 'Hey there! How are you doing today?',
              senderId: activeChat.participants.find(id => id !== currentUser.uid),
              timestamp: new Date(Date.now() - 3600000), // 1 hour ago
              read: true
            },
            {
              id: 'msg2',
              content: 'I\'m doing great! Just finished a hike. How about you?',
              senderId: currentUser.uid,
              timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
              read: true
            },
            {
              id: 'msg3',
              content: 'That sounds amazing! I\'ve been working on a new project.',
              senderId: activeChat.participants.find(id => id !== currentUser.uid),
              timestamp: new Date(Date.now() - 3400000), // 56 minutes ago
              read: true
            },
            {
              id: 'msg4',
              content: 'Would you like to meet up this weekend?',
              senderId: activeChat.participants.find(id => id !== currentUser.uid),
              timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
              read: false
            }
          ];
          
          // In a real app, we would use the getMessages function
          // const { messages: chatMessages, error: messagesError } = await getMessages(activeChat.id);
          // if (messagesError) throw new Error(messagesError);
          
          setMessages(mockMessages);
          
          // In a real app, we would subscribe to new messages
          // unsubscribe = listenToMessages(activeChat.id, (updatedMessages) => {
          //   setMessages(updatedMessages);
          //   markMessagesAsRead(activeChat.id, currentUser.uid);
          // });
        } catch (err) {
          setError('Failed to load messages');
        }
      } else {
        setMessages([]);
      }
    };
    
    setupChatSubscription();
    
    // Cleanup subscription on unmount or when active chat changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [activeChat, currentUser]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeChat) return;
    
    try {
      // In a real app, we would use the sendMessage function
      // await sendMessage(activeChat.id, currentUser.uid, newMessage.trim());
      
      // For demo purposes, add the message locally
      const newMsg = {
        id: `msg-${Date.now()}`,
        content: newMessage.trim(),
        senderId: currentUser.uid,
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prevMessages => [...prevMessages, newMsg]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };
  
  // Handle reporting a message
  const handleReportMessage = (messageId) => {
    // In a real app, this would open a modal or form for reporting
    alert(`Message reported. ID: ${messageId}`);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Messages
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Connect with your matches through meaningful conversations.
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {/* Chat list sidebar */}
              <div className="border-r border-gray-200 md:col-span-1">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
                </div>
                
                <div className="overflow-y-auto h-[calc(100vh-300px)]">
                  {chats.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <p>No conversations yet</p>
                      <p className="mt-2 text-sm">
                        <Link to="/matches" className="text-primary-600 hover:text-primary-500">
                          Find matches to start chatting
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {chats.map((chat) => {
                        // Find the other participant in the chat
                        const otherUserId = chat.participants.find(id => id !== currentUser.uid);
                        const isActive = activeChat && activeChat.id === chat.id;
                        
                        // In a real app, you would fetch user details from a users collection
                        // For now, we'll use a placeholder
                        const otherUserInitial = otherUserId ? otherUserId.charAt(0).toUpperCase() : '?';
                        
                        return (
                          <li key={chat.id}>
                            <button
                              onClick={() => setActiveChat(chat)}
                              className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${isActive ? 'bg-gray-50' : ''}`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center">
                                    <span className="text-primary-600 font-medium">
                                      {otherUserInitial}
                                    </span>
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {`User ${otherUserInitial}`}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {chat.lastMessage || 'No messages yet'}
                                  </p>
                                </div>
                                {/* In a real app, you would calculate unread count */}
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
              
              {/* Chat window */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col h-[calc(100vh-300px)]">
                {activeChat ? (
                  <>
                    {/* Chat header */}
                    <div className="p-4 border-b border-gray-200 flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {activeChat.participants.find(id => id !== currentUser.uid)?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {`User ${activeChat.participants.find(id => id !== currentUser.uid)?.charAt(0).toUpperCase() || '?'}`}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <p>No messages yet</p>
                          <p className="mt-2 text-sm">Send a message to start the conversation</p>
                        </div>
                      ) : (
                        <div className="space-y-4" role="list" aria-label="Message list">
                          {messages.map((message) => (
                            <MessageBubble
                              key={message.id}
                              message={message}
                              isOwnMessage={message.senderId === currentUser.uid}
                              onReport={handleReportMessage}
                            />
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </div>
                    
                    {/* Message input */}
                    <div className="p-4 border-t border-gray-200">
                      <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                          aria-label="Message input"
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Send message"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <p>Select a conversation or start a new one</p>
                    <Link 
                      to="/matches" 
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Find Matches
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChatPage;