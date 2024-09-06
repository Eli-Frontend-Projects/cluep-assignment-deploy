// Home.js
import React, { useContext } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import ChatArea from '../components/chat/ChatArea';
import { SidebarContext } from '../components/sidebar/SidebarContext'; // Import the SidebarContext

function Home() {
  const { isVisible } = useContext(SidebarContext); // Get sidebar visibility state from context

  return (
    <div className="h-screen bg-white p-4 flex items-center justify-center">
      <div
        className="flex flex-col md:flex-row border border-gray-300 rounded-lg w-[770px] h-[610px] overflow-hidden"
      >
        <Sidebar />
        <ChatArea isSidebarVisible={isVisible} /> {/* Pass sidebar visibility state */}
      </div>
    </div>
  );
}

export default Home;
