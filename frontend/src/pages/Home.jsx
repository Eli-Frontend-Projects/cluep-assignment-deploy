import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import ChatArea from '../components/chat/ChatArea';

function Home() {
  return (
    <div className="h-screen bg-red-100 p-4 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white border border-gray-300 rounded-lg overflow-hidden" style={{ width: '770px', height: '610px' }}>
        {/* Sidebar for desktop */}
        <Sidebar />

        {/* Chat space */}
        <div className="flex-1 flex flex-col">
          <ChatArea />
        </div>
      </div>
    </div>
  );
}

export default Home;
