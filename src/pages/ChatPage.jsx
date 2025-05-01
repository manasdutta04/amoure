import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import MessageBubble from '../components/MessageBubble';
import { 
  getUserChats, 
  getMessages, 
  sendMessage, 
  markMessagesAsRead,
  listenToMessages
} from '../services/chatService';
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon, 
  ShieldExclamationIcon,
  HeartIcon,
  SparklesIcon,
  ArrowLeftIcon,
  PhotoIcon,
  FaceSmileIcon,
  MicrophoneIcon,
  GifIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon, 
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon as ChatIconSolid } from '@heroicons/react/24/solid';

/**
 * Chat page for messaging between matched users
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing equal communication tools for all users regardless of gender identity
 * - SDG 10 (Reduced Inequalities): By enabling meaningful connections between diverse LGBTQ+ community members
 */
const ChatPage = () => {
  // Custom CSS for pulse animation
  const pulseAnimationStyle = `
    @keyframes pulse {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
      }
      
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 4px rgba(74, 222, 128, 0);
      }
      
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
      }
    }
    
    .pulse-animation {
      animation: pulse 2s infinite;
    }
    
    /* Custom radial gradient for message background */
    .bg-gradient-radial {
      background-image: radial-gradient(circle at center, #f9fafb 0%, #f3f4f6 100%);
    }
  `;

  const { chatId } = useParams();
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChats, setShowChats] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowChats(true);
        
        // Automatically show sidebar on large screens initially
        if (window.innerWidth > 1280) {
          setSidebarCollapsed(false);
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Switch to chat view on mobile when a chat is selected
  useEffect(() => {
    if (isMobileView && activeChat) {
      setShowChats(false);
    }
  }, [activeChat, isMobileView]);
  
  // Fetch user's chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        
        // Get active matches from localStorage
        const storedMatches = localStorage.getItem('activeMatches');
        let activeMatches = [];
        
        if (storedMatches) {
          activeMatches = JSON.parse(storedMatches);
        }
        
        // For demo purposes, create some mock chats if no matches exist
        // In a real app, this would come from the database
        const mockChats = [
          {
            id: 'chat1',
            participants: [currentUser.uid, 'user1'],
            otherUser: {
              id: 'user1',
              displayName: 'Alex Rivera',
              photoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              online: true
            },
            lastMessage: 'Hey, how are you doing?',
            lastMessageTime: new Date(),
            lastMessageSender: 'user1',
            unreadCount: 1
          },
          {
            id: 'chat2',
            participants: [currentUser.uid, 'user2'],
            otherUser: {
              id: 'user2',
              displayName: 'Jordan Lee',
              photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              online: false
            },
            lastMessage: 'Would you like to meet for coffee?',
            lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
            lastMessageSender: currentUser.uid,
            unreadCount: 0
          },
          {
            id: 'chat3',
            participants: [currentUser.uid, 'user3'],
            otherUser: {
              id: 'user3',
              displayName: 'Sam Johnson',
              photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              online: true
            },
            lastMessage: 'I enjoyed our conversation!',
            lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
            lastMessageSender: 'user3',
            unreadCount: 2
          }
        ];
        
        // Add any active matches from localStorage to the chat list
        activeMatches.forEach(match => {
          // Check if this match already exists in mockChats
          const existingChatIndex = mockChats.findIndex(chat => chat.id === match.id);
          
          if (existingChatIndex === -1) {
            // Add new chat for this match
            mockChats.push({
              id: match.id,
              participants: [currentUser.uid, match.userId],
              otherUser: {
                id: match.userId,
                displayName: match.displayName,
                photoURL: match.photoURL,
                online: Math.random() > 0.5 // Randomly set online status for demo
              },
              lastMessage: 'You matched! Say hello!',
              lastMessageTime: new Date(match.lastAccessed),
              lastMessageSender: 'system',
              unreadCount: 1
            });
          }
        });
        
        // In a real app, we would use the getUserChats function
        // const { chats: userChats, error: chatsError } = await getUserChats(currentUser.uid);
        // if (chatsError) throw new Error(chatsError);
        
        setChats(mockChats);
        
        // If chatId is provided in URL, set it as active
        if (chatId) {
          const selectedChat = mockChats.find(chat => chat.id === chatId);
          if (selectedChat) {
          setActiveChat(selectedChat);
            
            // Update lastAccessed time for this match in localStorage
            if (storedMatches) {
              const matches = JSON.parse(storedMatches);
              const matchIndex = matches.findIndex(match => match.id === chatId);
              
              if (matchIndex >= 0) {
                matches[matchIndex].lastAccessed = new Date().toISOString();
                localStorage.setItem('activeMatches', JSON.stringify(matches));
              }
            }
          } else if (mockChats.length > 0) {
            // If chatId not found, select the first chat
            setActiveChat(mockChats[0]);
          }
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
              senderId: activeChat.otherUser.id,
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
              content: 'That sounds amazing! I\'ve been working on a new project. Would love to hear more about your hike! What trail did you take?',
              senderId: activeChat.otherUser.id,
              timestamp: new Date(Date.now() - 3400000), // 56 minutes ago
              read: true
            },
            {
              id: 'msg4',
              content: 'I went to the Rainbow Falls trail. It was absolutely beautiful with all the spring flowers blooming! Would you like to join me next time?',
              senderId: currentUser.uid,
              timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
              read: true
            },
            {
              id: 'msg5',
              content: "Would you like to meet up this weekend? I'm free on Saturday afternoon.",
              senderId: activeChat.otherUser.id,
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
      
      // Focus the input after sending
      inputRef.current?.focus();
    } catch (err) {
      setError('Failed to send message');
    }
  };
  
  // Handle reporting a message
  const handleReportMessage = (messageId) => {
    // In a real app, this would open a modal or form for reporting
    alert(`Message reported. ID: ${messageId}`);
  };
  
  // Handle navigating back to chats list on mobile
  const handleBackToChats = () => {
    setShowChats(true);
  };
  
  // Format timestamp for chat list
  const formatChatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      // Today, return time in 12-hour format
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      // Less than a week, return day name
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // More than a week, return date
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Truncate message text for preview
  const truncateMessage = (text, maxLength = 40) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };
  
  // Toggle sidebar on desktop
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <Layout>
      <style>{pulseAnimationStyle}</style>
      <div className="md:px-0 md:pt-0 md:pb-0">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-[calc(100vh-200px)]"
            >
              <div className="text-center">
                <div className="pride-gradient w-16 h-16 rounded-full flex items-center justify-center animate-pulse mx-auto">
                  <ChatIconSolid className="h-8 w-8 text-white animate-bounce" />
                </div>
                <p className="mt-4 text-xl font-medium text-gray-800">Loading conversations...</p>
                <p className="mt-2 text-sm text-gray-500">Connecting you with your matches</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col md:h-[calc(100vh-64px)]">
              {/* Page Header - Only visible on smaller screens */}
              <div className="md:hidden text-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Messages
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                  Connect with your matches through meaningful conversations.
                </p>
              </div>
        
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <div className="flex">
                    <ShieldExclamationIcon className="h-5 w-5 text-red-400 mr-2" />
                    <div className="ml-1">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}
        
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 md:rounded-none md:shadow-none md:border-0 md:h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:h-full">
                  {/* Chat list sidebar - Only show if not collapsed on desktop */}
                  {((showChats || !isMobileView) && (!sidebarCollapsed || isMobileView)) && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="md:border-r border-gray-200 md:col-span-1 md:h-full relative"
                    >
                      <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center">
                          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-primary-600" />
                          Conversations
                        </h2>
                        <div className="flex items-center space-x-2">
                          <button 
                            className="p-1.5 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                            aria-label="New message"
                          >
                            <PaperAirplaneIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                
                      <div className="overflow-y-auto h-[calc(100vh-260px)] md:h-[calc(100vh-130px)]">
                        {chats.length === 0 ? (
                          <div className="p-8 text-center">
                            <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                              <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />
                            </div>
                            <p className="text-gray-500 mb-4">No conversations yet</p>
                            <Link 
                              to="/matches" 
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <HeartIcon className="h-5 w-5 mr-2" />
                              Find Matches
                        </Link>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {chats.map((chat) => {
                        const isActive = activeChat && activeChat.id === chat.id;
                        
                        return (
                          <li key={chat.id}>
                            <button
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                                      isActive ? 'bg-primary-50' : ''
                                    }`}
                              onClick={() => setActiveChat(chat)}
                                  >
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 relative">
                                        <img 
                                          src={chat.otherUser.photoURL} 
                                          alt={chat.otherUser.displayName}
                                          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                        {chat.otherUser.online && (
                                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                        )}
                                  </div>
                                      <div className="ml-4 flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                            {chat.otherUser.displayName}
                                  </p>
                                          <p className="text-xs text-gray-500">
                                            {formatChatTimestamp(chat.lastMessageTime)}
                                  </p>
                                </div>
                                        <div className="flex items-center justify-between mt-1">
                                          <p className="text-sm text-gray-500 truncate">
                                            {chat.lastMessageSender === currentUser.uid ? 'You: ' : ''}
                                            {truncateMessage(chat.lastMessage || 'No messages yet')}
                                          </p>
                                          {chat.unreadCount > 0 && (
                                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full pride-gradient text-white text-xs font-bold shadow-sm">
                                              {chat.unreadCount}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                    </motion.div>
                  )}
              
              {/* Chat window - Adjust columns based on sidebar state */}
                  {(!showChats || !isMobileView) && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className={`${sidebarCollapsed && !isMobileView ? 'md:col-span-3 lg:col-span-4 xl:col-span-5' : 'md:col-span-2 lg:col-span-3 xl:col-span-4'} flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-64px)]`}
                    >
                {activeChat ? (
                  <>
                    {/* Chat header */}
                          <div className="sticky top-0 z-10 flex items-center bg-white border-b border-gray-200 px-4 py-3">
                            {isMobileView ? (
                              <button
                                onClick={handleBackToChats}
                                className="mr-3 p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                                aria-label="Back to chat list"
                              >
                                <ArrowLeftIcon className="h-5 w-5" />
                              </button>
                            ) : (
                              /* Toggle sidebar button for desktop */
                              <button
                                onClick={toggleSidebar}
                                className="mr-3 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hidden md:block"
                                aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
                              >
                                {sidebarCollapsed ? (
                                  <ChevronRightIcon className="h-5 w-5" />
                                ) : (
                                  <ChevronLeftIcon className="h-5 w-5" />
                                )}
                              </button>
                            )}
                            <div className="flex-shrink-0 relative mr-3">
                              <motion.img 
                                src={activeChat.otherUser.photoURL} 
                                alt={activeChat.otherUser.displayName}
                                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(`/profile/${activeChat.otherUser.id}`)}
                              />
                              {activeChat.otherUser.online && (
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white pulse-animation"></span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base font-medium text-gray-900 truncate flex items-center">
                                {activeChat.otherUser.displayName}
                                <span className="ml-2">
                                  {/* Pride flag indicator */}
                                  <span className="inline-block h-4 w-4 rounded-full overflow-hidden">
                                    <span className="pride-gradient w-full h-full block"></span>
                                  </span>
                          </span>
                              </h3>
                              <p className="text-xs text-gray-500 flex items-center">
                                {activeChat.otherUser.online ? (
                                  <>
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                    <span>Active now</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300 mr-1.5"></span>
                                    <span>Last active 2h ago</span>
                                  </>
                                )}
                              </p>
                        </div>
                            <div className="flex space-x-2">
                              {/* Search in conversation button */}
                              <button
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hidden md:block"
                                aria-label="Search in conversation"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                              </button>
                              
                              {/* Video call button */}
                              <button
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                                aria-label="Video call"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" d="M15.75 10.5 9 6.75v10.5l6.75-3.75Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                              </button>
                              
                              {/* View profile button */}
                              <button
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                                aria-label="View profile"
                                onClick={() => navigate(`/matches`)}
                              >
                                <HeartIcon className="h-5 w-5" />
                              </button>
                              
                              {/* Options button */}
                              <button
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                                aria-label="More options"
                              >
                                <EllipsisHorizontalIcon className="h-5 w-5" />
                              </button>
                      </div>
                    </div>
                    
                    {/* Messages */}
                          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white md:from-white md:to-white md:bg-gradient-radial">
                      {messages.length === 0 ? (
                              <div className="flex flex-col items-center justify-center h-full p-6">
                                <div className="pride-gradient w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                                  <SparklesIcon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Start the conversation</h3>
                                <p className="text-gray-500 text-center mb-6 max-w-md">
                                  Send a message to start chatting with {activeChat.otherUser.displayName}
                                </p>
                                <button
                                  onClick={() => inputRef.current?.focus()}
                                  className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors transform hover:scale-105"
                                >
                                  Say Hello
                                </button>
                        </div>
                      ) : (
                        <div className="space-y-4 px-2 md:px-4 md:py-2" role="list" aria-label="Message list">
                                {messages.map((message, index) => {
                                  // Group messages by date
                                  const messageDate = new Date(message.timestamp.toDate ? message.timestamp.toDate() : message.timestamp);
                                  const previousMessage = index > 0 ? messages[index - 1] : null;
                                  const previousMessageDate = previousMessage ? new Date(previousMessage.timestamp.toDate ? previousMessage.timestamp.toDate() : previousMessage.timestamp) : null;
                                  
                                  // Show date separator if this is the first message or if the date changed
                                  const showDateSeparator = !previousMessageDate || 
                                    messageDate.toDateString() !== previousMessageDate.toDateString();
                                  
                                  // Consecutive messages from same sender
                                  const isConsecutive = previousMessage && 
                                    previousMessage.senderId === message.senderId &&
                                    !showDateSeparator;
                                    
                                  return (
                                    <React.Fragment key={message.id}>
                                      {showDateSeparator && (
                                        <div className="flex justify-center my-6">
                                          <div className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                                            {messageDate.toDateString() === new Date().toDateString() 
                                              ? 'Today' 
                                              : messageDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {/* Show typing indicator after the last message from other user */}
                                      {index === messages.length - 1 && 
                                       message.senderId === activeChat.otherUser.id && 
                                       activeChat.otherUser.online && 
                                       Math.random() > 0.7 && (
                                        <div className="flex items-center ml-4 mt-2">
                                          <div className="flex space-x-1 bg-gray-100 p-3 rounded-full">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                          </div>
                                        </div>
                                      )}
                                      
                            <MessageBubble
                              message={message}
                              isOwnMessage={message.senderId === currentUser.uid}
                              onReport={handleReportMessage}
                                        isConsecutive={isConsecutive}
                            />
                                    </React.Fragment>
                                  );
                                })}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </div>
                    
                    {/* Message input */}
                          <div className="bg-white border-t border-gray-200 p-3 md:p-4">
                      <form onSubmit={handleSendMessage} className="flex space-x-2 md:space-x-3 md:mx-auto md:max-w-4xl">
                              <div className="flex items-center space-x-1 md:space-x-2">
                                <button
                                  type="button"
                                  className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition transform hover:scale-110"
                                  aria-label="Add attachment"
                                >
                                  <PhotoIcon className="h-5 w-5 md:h-6 md:w-6" />
                                </button>
                                <button
                                  type="button"
                                  className="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition transform hover:scale-110 group"
                                  aria-label="Add emoji"
                                >
                                  <FaceSmileIcon className="h-5 w-5 md:h-6 md:w-6" />
                                  {/* Emoji picker preview (would be replaced with real component) */}
                                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block shadow-lg rounded-lg bg-white border border-gray-200 p-2 w-64 z-30">
                                    <div className="grid grid-cols-7 gap-1">
                                      {['😀','😂','😍','🥰','😊','😎','🙌','👍','❤️','🔥','✨','🎉'].map(emoji => (
                                        <button 
                                          key={emoji}
                                          type="button"
                                          onClick={() => setNewMessage(prev => prev + emoji)}
                                          className="text-xl hover:bg-gray-100 rounded p-1"
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 text-center">Quick emojis (hover to view)</div>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition transform hover:scale-110 md:block hidden"
                                  aria-label="Add GIF"
                                >
                                  <GifIcon className="h-5 w-5 md:h-6 md:w-6" />
                                </button>
                                <button
                                  type="button"
                                  className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition transform hover:scale-110"
                                  aria-label="Voice message"
                                >
                                  <MicrophoneIcon className="h-5 w-5 md:h-6 md:w-6" />
                                </button>
                              </div>
                              <div className="relative flex-1 group">
                        <input
                                  ref={inputRef}
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                                  className="pr-10 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-full sm:text-sm md:text-base border-gray-300 bg-gray-50 transition-all duration-200 focus:shadow-inner md:py-3"
                          aria-label="Message input"
                        />
                                {!newMessage.trim() && (
                                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs md:text-sm text-gray-400 pointer-events-none">
                                    Press Enter to send
                                  </div>
                                )}
                                {activeChat?.otherUser.online && Math.random() > 0.7 && (
                                  <div className="absolute -top-6 left-4 text-xs text-gray-500 flex items-center">
                                    <span className="flex h-2 w-2 relative mr-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                    </span>
                                    {activeChat.otherUser.displayName} is typing...
                                  </div>
                                )}
                              </div>
                              <motion.button
                          type="submit"
                          disabled={!newMessage.trim()}
                                className="inline-flex items-center justify-center p-2 md:p-3 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-110"
                          aria-label="Send message"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                        >
                                <PaperAirplaneIcon className="h-5 w-5 md:h-6 md:w-6 -rotate-45" aria-hidden="true" />
                              </motion.button>
                      </form>
                            {/* Privacy notice */}
                            <div className="mt-2 text-xs text-gray-400 text-center">
                              All messages are encrypted. <button className="text-primary-500 hover:underline">Learn more</button>
                            </div>
                    </div>
                  </>
                ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                          <div className="pride-gradient w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
                          </div>
                          <p className="text-xl font-medium text-gray-900 mb-2">No conversation selected</p>
                          <p className="text-gray-500 mb-6">Select a chat from the sidebar to start messaging</p>
                          <div className="flex">
                    <Link 
                      to="/matches" 
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mx-2"
                    >
                      Find Matches
                    </Link>
                  </div>
                        </div>
                      )}
                    </motion.div>
                )}
                </div>
            </div>
          </div>
        )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default ChatPage;