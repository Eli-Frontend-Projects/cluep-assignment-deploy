import React, { useState, useEffect } from 'react';
import useFetchMessages from '../../hooks/useFetchMessages';
import useSendMessage from '../../hooks/useSendMessage'; 
import SearchBox from '../search/SearchBox';
import Conversation from './Conversation';
import TaskPanel from './TaskPanel';
import MessageInput from './MessageInput'; 
import SearchButton from '../search/SearchButton'; 
import {jwtDecode} from 'jwt-decode';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [messages, setMessages] = useState([]); 

  const token = localStorage.getItem('authToken');
  const userId = jwtDecode(token).sub;

  const { messages: fetchedMessages, error, loading } = useFetchMessages(userId, token);
  const { sendMessage } = useSendMessage(userId, token);

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  const handleSend = async () => {
    if (message.trim()) {
      try {
        await sendMessage(message); 
        setMessages(prevMessages => [...prevMessages, message]);
        setMessage(''); 
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchQuery(''); 
    }
  };

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
      />
    </div>
  ); 
};

export default ChatArea;
