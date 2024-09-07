// Home.js
import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import ChatArea from '../components/chat/ChatArea';

function Home() {
  return (
    <div className="bg-white p-4 flex items-center justify-center">
      <div
        className="flex flex-row border border-gray-300 rounded-lg w-[770px] h-[610px]"
      >
        {<Sidebar />}
        <ChatArea />
      </div>
    </div>
  );
}

export default Home;

