import React from 'react';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

/**
 * MessageBubble component to display chat messages
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing equal representation for all users in conversations
 * - SDG 10 (Reduced Inequalities): By creating an accessible chat interface for communication
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Message data
 * @param {string} props.message.id - Message ID
 * @param {string} props.message.content - Message content
 * @param {string} props.message.senderId - Sender ID
 * @param {Object} props.message.timestamp - Message timestamp
 * @param {boolean} props.message.read - Whether message has been read
 * @param {boolean} props.isOwnMessage - Whether message was sent by the current user
 * @param {Function} [props.onReport] - Report button click handler
 * @returns {React.Component} MessageBubble component
 */
const MessageBubble = ({ 
  message, 
  isOwnMessage,
  onReport
}) => {
  // Format timestamp
  const formattedTime = message.timestamp ? 
    formatDistanceToNow(new Date(message.timestamp.toDate ? message.timestamp.toDate() : message.timestamp), { 
      addSuffix: true 
    }) : 
    'Just now';
  
  return (
    <div 
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      role="listitem"
      aria-label={`Message ${isOwnMessage ? 'sent' : 'received'} ${formattedTime}`}
    >
      {!isOwnMessage && (
        <div className="flex flex-col items-end mr-2">
          {onReport && (
            <button
              type="button"
              onClick={() => onReport(message.id)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
              aria-label="Report message"
            >
              <ShieldExclamationIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        <div 
          className={`
            ${isOwnMessage 
              ? 'bg-primary-600 text-white rounded-tl-xl rounded-bl-xl rounded-tr-xl' 
              : 'bg-gray-100 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl'
            }
            px-4 py-2 break-words
          `}
        >
          {message.content}
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {formattedTime}
          {isOwnMessage && message.read && (
            <span className="ml-2 text-primary-600">Read</span>
          )}
        </div>
      </div>
      
      {isOwnMessage && (
        <div className="flex flex-col items-start ml-2">
          {onReport && (
            <button
              type="button"
              onClick={() => onReport(message.id)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
              aria-label="Report message"
            >
              <ShieldExclamationIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble; 