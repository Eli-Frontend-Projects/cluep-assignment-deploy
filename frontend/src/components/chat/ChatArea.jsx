import React, { useState } from 'react';
import Search from '../search/Search.jsx';
import Conversation from './Conversation';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([
    'Hello! How can I help you today?',
    'I need some information about your services.',
    'Sure, what would you like to know?',
    'We offer a variety of services including...',
    'Can you tell me more about pricing?',
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Add the new message to the conversations array
      setConversations([...conversations, message]);
      setMessage('');
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredConversations);

  return (
    <div className="flex flex-col h-full bg-white p-4 rounded-md shadow-md">
      {/* Search Component */}
      <Search
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
      />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        <Conversation conversations={filteredConversations} />
      </div>

      {/* Input and Attach File */}
      <div className="flex items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="bg-gray-700 text-white px-4 py-2 rounded-l-md cursor-pointer"
        >
          Attach
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-200 text-black focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;