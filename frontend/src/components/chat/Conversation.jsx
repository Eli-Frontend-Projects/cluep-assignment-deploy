// Conversation.js
import React, { useEffect, useRef } from 'react';
import '../../css/Conversation.css'; // Import the CSS file from the src folder

const Conversation = ({ conversations }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [conversations]);

  return (
    <div className="flex flex-col space-y-2 mt-3 ml-2 mb-4 overflow-y-auto overflow-x-hidden h-full">
      {conversations.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${index === conversations.length - 1 ? 'tail' : ''}`}
        >
          {msg}
        </div>
      ))}
      <div ref={endOfMessagesRef} /> {/* This div will act as the scroll anchor */}
    </div>
  );
};

export default Conversation;
