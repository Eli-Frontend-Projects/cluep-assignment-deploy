import React, { useState } from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex">
      <div
        className={`flex flex-col justify-between bg-black transition-all duration-300 ${
          isVisible ? 'w-[150px]' : 'w-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col">
          <SidebarItem id="sidebar-profile" icon="/Icons/ProfilePic.jpg" label="Profile" />
          <SidebarItem id="sidebar-chats" icon="/Icons/Chats.png" label="Chats" />
          <SidebarItem id="sidebar-sent" icon="/Icons/Sent.png" label="Sent" />
          <SidebarItem id="sidebar-draft" icon="/Icons/Draft.png" label="Draft" />
          <SidebarItem id="sidebar-spam" icon="/Icons/Spam.png" label="Spam" />
          <SidebarItem id="sidebar-trash" icon="/Icons/Trash.png" label="Trash" />
          <SidebarItem id="sidebar-connect-apps" icon="/Icons/Connect apps.png" label="Connect apps" />
        </div>

        <div className="flex flex-col">
          <SidebarItem id="sidebar-help" icon="/Icons/Help.png" label="Help" />
          <SidebarItem id="sidebar-rate" icon="/Icons/Rate.png" label="Rate" />
          <SidebarItem id="sidebar-about" icon="/Icons/About.png" label="About" />
        </div>
      </div>

      <div
        className={`flex items-center transition-all duration-10 ${
          isVisible ? 'ml-0' : 'ml-1'
        }`}
      >
        <button
          id="sidebar-toggle" 
          onClick={toggleSidebar}
          className=""
        >
          <img
            src={isVisible ? "/Icons/Sidebar-1.png" : "/Icons/chevron_right_black_24dp.svg"}
            alt="Toggle Sidebar"
            className={"h-6 ml-1"}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
