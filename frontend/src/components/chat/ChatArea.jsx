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
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
    <div className="grid grid-cols-[auto,70px] grid-rows-[minmax(0,1fr)_53px_auto] rounded-md w-full h-full">
      {/* Left Column - Conversations */}
      <div className="flex flex-col justify-between h-full col-span-1">
        {/* Conditionally render Search Component */}
        {isSearchVisible && (
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            showSearchBox={isSearchVisible}
            setShowSearchBox={setIsSearchVisible}
          />
        )}

        {/* Chat Messages */}
        <div className="mt-3 ml-2 mb-4 overflow-y-auto overflow-x-hidden h-full">
          <Conversation conversations={filteredConversations} />
        </div>
      </div>

      {/* Right Column - Search Button */}
      {!isSearchVisible && (
        <div className="flex flex-col justify-between col-span-1 mt-2">
          <div className="search-button-area flex justify-center">
            <button onClick={toggleSearch} className="hover:opacity-75">
              <img
                className="w-7 h-7 cursor-pointer"
                src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
                alt="search icon"
              />
            </button>
          </div>
        </div>
      )}

      {/* TaskPanel spanning two columns */}
      <TaskPanel />
        
      {/* Input and Attach File */}
      <MessageInput
        message={message}
        onMessageChange={setMessage}
        onSend={handleSend}
        onFileChange={handleFileChange}
      />
    </div>
  ); 
};

export default ChatArea;
