import React, { useState } from 'react';
import SearchBox from '../search/SearchBox';
import Conversation from './Conversation';
import TaskPanel from './TaskPanel';
import MessageInput from './MessageInput'; 

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
    <div className="flex h-full justify-between bg-white rounded-md">
      <div className='flex flex-col justify-between w-full bg-white conversation-input-panel-section'>
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

        <TaskPanel/>

        {/* Input and Attach File */}
        <MessageInput
          message={message}
          onMessageChange={setMessage}
          onSend={handleSend}
          onFileChange={handleFileChange}
        />
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
