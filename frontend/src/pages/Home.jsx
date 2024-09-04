import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import ChatArea from '../components/chat/ChatArea';

function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-64 bg-gray-200 p-4">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <ChatArea />
      </div>
    </div>
  );
}

export default Home;
