import React, { useContext, useSyncExternalStore, useState } from 'react';
import { SidebarContext } from '../sidebar/SidebarContext'; // Import the SidebarContext
import SearchBox from '../search/SearchBox';
import Conversation from './Conversation';
import TaskPanel from './TaskPanel';
import MessageInput from './MessageInput'; 

const ChatArea = ({ isSidebarVisible }) => {
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
    <div
      className={`grid grid-cols-[auto,70px] grid-rows-[auto,40px,87px] rounded-md w-full`}
    >
        {!isSidebarVisible && (<div className='flex flex-col justify-between h-full col-span-1'>
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
        </div> //here
      )} 

     {( !isSidebarVisible && <div className="w-[70px] col-span-1">
        <div className="search-button-area">
          {/* Search/Cancel button */}
          <div className='flex justify-center'>
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
      )}

      {isSidebarVisible && (
        <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-between h-full col-span-1 w-full'>
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
        </div>
      
      <div>
        <div className="search-button-area w-[70px]">
          {/* Search/Cancel button */}
          <div className='flex justify-center'>
            {!isSearchVisible && 
            <button onClick={toggleSearch} className="btn">
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
          
        </div>
      )}

      {isSidebarVisible && (
        <div>
      </div>
      )}

      {/* TaskPanel spanning two columns */}
      <div className="col-span-2">
        <TaskPanel/>
      </div>
        
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
