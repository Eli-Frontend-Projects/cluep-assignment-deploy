import React from 'react';

const Conversation = ({ conversations }) => {
  return (
    <div className="flex flex-col space-y-2">
      {conversations.map((msg, index) => (
        <div
          key={index}
          className="bg-blue-600 text-white p-3 rounded-lg max-w-xs ml-auto"
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

export default Conversation;