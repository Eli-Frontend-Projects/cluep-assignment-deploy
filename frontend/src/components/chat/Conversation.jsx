// Conversation.js
import React from 'react';
import '../../css/Conversation.css'; // Import the CSS file from the src folder

const Conversation = ({ conversations }) => {
  return (
    <div className="flex flex-col space-y-2">
      {conversations.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${index === conversations.length - 1 ? 'tail' : ''}`}
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
