import React, { useState } from 'react';
import SearchBox from '../search/SearchBox.jsx';
import Conversation from './Conversation';

const ChatArea = () => {
  // State variables
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Unified state for search visibility
  const [conversations, setConversations] = useState([
    'Hello! How can I help you today?',
    'I need some information about your services.',
    'Sure, what would you like to know?',
    'We offer a variety of services including...',
    'Can you tell me more about pricing?',
  ]);

  // Function to handle sending messages
  const handleSend = () => {
    if (message.trim()) {
      // Add the new message to the conversations array
      setConversations([...conversations, message]);
      setMessage('');
      setFile(null);
    }
  };

  // Function to handle file attachment
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to toggle search visibility
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchQuery(''); // Clear search query when hiding the search box
    }
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation =>
    conversation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full justify-between bg-green-100 rounded-md">
      <div className='flex flex-col justify-between w-full bg-red-100 conversation-input-panel-section'>
        {/* Conditionally render Search Component */}
        {isSearchVisible && (
          <div>
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              showSearchBox={isSearchVisible}
              setShowSearchBox={setIsSearchVisible}
            />
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4">
          <Conversation conversations={filteredConversations} />
        </div>

        {/* Input and Attach File */}
        <div className="flex items-center">
          {/* Hidden file input */}
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          {/* Attach button */}
          <label
            htmlFor="fileInput"
            className="bg-gray-700 text-white px-4 py-2 rounded-l-md cursor-pointer"
            style={{ height: '55px' }} // Set height for the Attach button
          >
            Attach
          </label>
          {/* Message input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-200 text-black focus:outline-none"
            style={{ height: '55px' }} // Set height for the input
          />
          {/* Send button */}
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            style={{ height: '55px' }} // Set height for the Send button
          >
            Send
          </button>
        </div>
      </div>
      <div className="search-button-area">
        {/* Search/Cancel button */}
        <div className='w-[70px] flex justify-center mt-[10px]'>
          {!isSearchVisible && 
          <button onClick={toggleSearch} className="hover:opacity-75">
  <img
    className="w-7 h-7 cursor-pointer"
    src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
    alt="search icon"
  />
</button>
}
        </div>
      </div>
    </div>
  );
};

export default ChatArea;