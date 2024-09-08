import React, { useState, useEffect } from 'react';
import useFetchMessages from '../../hooks/useFetchMessages'; // Updated import
import useSendMessage from '../../hooks/useSendMessage'; // New import
import SearchBox from '../search/SearchBox';
import Conversation from './Conversation';
import TaskPanel from './TaskPanel';
import MessageInput from './MessageInput'; 
import SearchButton from '../search/SearchButton'; 

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [messages, setMessages] = useState([]); // Local state for messages

  // Get the auth token from localStorage
  const token = localStorage.getItem('authToken');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).sub : null; // Extract userId from the JWT

  // Use the custom hooks
  const { messages: fetchedMessages, error, loading } = useFetchMessages(userId, token);
  const { sendMessage } = useSendMessage(userId, token);

  // Update local messages state when fetched messages change
  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  // Function to handle sending messages
  const handleSend = async () => {
    if (message.trim()) {
      try {
        await sendMessage(message); // Use the hook to send the message
        setMessages(prevMessages => [...prevMessages, message]); // Add the new message to the local state
        setMessage(''); // Clear the message input after sending
      } catch (error) {
        console.error('Failed to send message:', error);
      }
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
  const filteredConversations = messages.filter(conversation =>
    conversation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-[auto,70px] grid-rows-[minmax(0,1fr)_53px_auto] rounded-md w-full h-full">
      {/* Left Column - Conversations */}
      <div className="flex flex-col justify-between h-full col-span-1">
        {isSearchVisible && (
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            showSearchBox={isSearchVisible}
            setShowSearchBox={setIsSearchVisible}
          />
        )}

        {/* Handle loading and error states */}
        {loading ? (
          <div>Loading messages...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <Conversation conversations={filteredConversations} />
        )}
      </div>

      {!isSearchVisible && (
        <SearchButton onClick={toggleSearch} />
      )}

      <TaskPanel />
        
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
