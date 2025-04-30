import React, { useState } from 'react';
import { ShieldExclamationIcon, CheckIcon, HeartIcon, EllipsisHorizontalIcon, FaceSmileIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MessageBubble component to display chat messages with LGBTQ+ inclusive design
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing equal representation for all users in conversations
 * - SDG 10 (Reduced Inequalities): By creating an accessible and inclusive chat interface
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Message data
 * @param {string} props.message.id - Message ID
 * @param {string} props.message.content - Message content
 * @param {string} props.message.senderId - Sender ID
 * @param {Object} props.message.timestamp - Message timestamp
 * @param {boolean} props.message.read - Whether message has been read
 * @param {boolean} props.isOwnMessage - Whether message was sent by the current user
 * @param {boolean} props.isConsecutive - Whether this message is consecutive from the same sender
 * @param {Function} [props.onReport] - Report button click handler
 * @returns {React.Component} MessageBubble component
 */
const MessageBubble = ({ 
  message, 
  isOwnMessage,
  isConsecutive = false,
  onReport
}) => {
  const [showActions, setShowActions] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);

  // Format timestamp
  const formattedTime = message.timestamp ? 
    formatDistanceToNow(new Date(message.timestamp.toDate ? message.timestamp.toDate() : message.timestamp), { 
      addSuffix: true 
    }) : 
    'Just now';
  
  // Animation variants
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      x: isOwnMessage ? 20 : -20,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 40,
        mass: 1
      } 
    }
  };

  // Reaction options
  const reactionOptions = ['❤️', '👍', '😂', '😮', '😢', '🔥'];
  
  const handleReaction = (emoji) => {
    setReaction(emoji);
    setShowReactions(false);
  };

  return (
    <motion.div 
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} ${isConsecutive ? 'mb-1' : 'mb-4'} group relative`}
      role="listitem"
      aria-label={`Message ${isOwnMessage ? 'sent' : 'received'} ${formattedTime}`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
    >
      {/* Only show avatar/report for first message in consecutive group */}
      {(!isOwnMessage && !isConsecutive) && (
        <div className="flex flex-col items-end mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onReport && (
            <button
              type="button"
              onClick={() => onReport(message.id)}
              className="text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1 transition-colors duration-200"
              aria-label="Report message"
            >
              <ShieldExclamationIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        {/* Action buttons visible on hover */}
        <AnimatePresence>
          {showActions && (
            <motion.div 
              className={`absolute ${isOwnMessage ? 'right-0 -top-8' : 'left-0 -top-8'} bg-white shadow-md rounded-full flex space-x-1 p-1 z-10`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-primary-600 transition-colors"
                onClick={() => setShowReactions(!showReactions)}
              >
                <FaceSmileIcon className="h-4 w-4" />
              </button>
              <button 
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-primary-600 transition-colors"
              >
                <ArrowUturnLeftIcon className="h-4 w-4" />
              </button>
              <button 
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-primary-600 transition-colors"
              >
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Reaction picker */}
        <AnimatePresence>
          {showReactions && (
            <motion.div 
              className="absolute -top-16 bg-white rounded-full shadow-lg p-1 flex space-x-1 z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {reactionOptions.map(emoji => (
                <button
                  key={emoji}
                  className="text-lg hover:bg-gray-100 rounded-full p-1 transition-colors"
                  onClick={() => handleReaction(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div 
          className={`
            ${isOwnMessage 
              ? `pride-bubble-gradient text-black ${isConsecutive 
                  ? 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-md' 
                  : 'rounded-tl-2xl rounded-bl-2xl rounded-tr-md'} shadow-md transform hover:scale-[1.01] transition-transform duration-200` 
              : `bg-white text-gray-800 ${isConsecutive 
                  ? 'rounded-tr-2xl rounded-bl-2xl rounded-tl-2xl rounded-br-md' 
                  : 'rounded-tr-2xl rounded-bl-2xl rounded-br-md'} shadow-sm border border-gray-100 hover:border-primary-200 transform hover:scale-[1.01] transition-all duration-200`
            }
            px-4 py-3 break-words relative
          `}
        >
          {message.content}
          
          {/* Reaction display */}
          {reaction && (
            <div className="absolute -bottom-3 right-0 bg-white rounded-full shadow-md p-1 border border-gray-100">
              <span className="text-sm">{reaction}</span>
            </div>
          )}
          
          {/* Like button that appears on hover */}
          <div className={`mt-1 pt-1 border-t ${isOwnMessage ? 'border-primary-400/30' : 'border-gray-100'} opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-end`}>
            <button 
              className={`text-xs flex items-center ${isOwnMessage ? 'text-black/70 hover:text-black' : 'text-gray-400 hover:text-red-500'} transition-colors duration-200`}
              aria-label="Like message"
            >
              <HeartIcon className="h-3.5 w-3.5 mr-1" />
              Like
            </button>
          </div>
        </div>
        
        {/* Only show timestamp for last message in consecutive group or standalone messages */}
        {!isConsecutive && (
          <div className={`text-xs text-gray-500 mt-1.5 flex items-center ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            {formattedTime}
            {isOwnMessage && (
              <span className={`ml-2 flex items-center ${message.read ? 'text-primary-600' : 'text-gray-400'}`}>
                <CheckIcon className={`h-3.5 w-3.5 mr-0.5 ${message.read ? 'text-primary-600' : 'text-gray-400'}`} />
                {message.read ? 'Read' : 'Sent'}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Only show avatar/report for first message in consecutive group */}
      {(isOwnMessage && !isConsecutive) && (
        <div className="flex flex-col items-start ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onReport && (
            <button
              type="button"
              onClick={() => onReport(message.id)}
              className="text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1 transition-colors duration-200"
              aria-label="Report message"
            >
              <ShieldExclamationIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble; 