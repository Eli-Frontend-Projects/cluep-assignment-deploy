import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

import SidebarItem from './SidebarItem'; 
import SidebarToggleButton from './SidebarToggleButton';
import useFetchUsername from '../../hooks/useFetchUsername';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState("sidebar-chats");
  const token = localStorage.getItem('authToken');
  const userId = token ? jwtDecode(token).sub : null;
  const username = useFetchUsername() ?? "Loading...";

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleItemClick = (id) => {
    setSelectedItem(id);
  };

  return (
    <div className="hidden lg:flex">
      <div
        className={`flex flex-col justify-between bg-black transition-all duration-300 ${
          isVisible ? 'w-[160px]' : 'w-0'
        } overflow-hidden ${isHoveringSidebar ? 'text-gray-400' : ''}`}
      >
        <div className="flex flex-col">
          <SidebarItem
            id="sidebar-profile"
            icon="/Icons/ProfilePic.jpg"
            label={username}
            isSelected={selectedItem === "sidebar-profile"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-profile")}
          />
          <SidebarItem
            id="sidebar-chats"
            icon="/Icons/Chats.png"
            label="Chats"
            isSelected={selectedItem === "sidebar-chats"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-chats")}
          />
          <SidebarItem
            id="sidebar-sent"
            icon="/Icons/Sent.png"
            label="Sent"
            isSelected={selectedItem === "sidebar-sent"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-sent")}
          />
          <SidebarItem
            id="sidebar-draft"
            icon="/Icons/Draft.png"
            label="Draft"
            isSelected={selectedItem === "sidebar-draft"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-draft")}
          />
          <SidebarItem
            id="sidebar-spam"
            icon="/Icons/Spam.png"
            label="Spam"
            isSelected={selectedItem === "sidebar-spam"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-spam")}
          />
          <SidebarItem
            id="sidebar-trash"
            icon="/Icons/Trash.png"
            label="Trash"
            isSelected={selectedItem === "sidebar-trash"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-trash")}
          />
          <SidebarItem
            id="sidebar-connect-apps"
            icon="/Icons/Connect apps.png"
            label="Connect apps"
            isSelected={selectedItem === "sidebar-connect-apps"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-connect-apps")}
          />
        </div>

        <div className="flex flex-col">
          <SidebarItem
            id="sidebar-help"
            icon="/Icons/Help.png"
            label="Help"
            isSelected={selectedItem === "sidebar-help"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-help")}
          />
          <SidebarItem
            id="sidebar-rate"
            icon="/Icons/Rate.png"
            label="Rate"
            isSelected={selectedItem === "sidebar-rate"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-rate")}
          />
          <SidebarItem
            id="sidebar-about"
            icon="/Icons/About.png"
            label="About"
            isSelected={selectedItem === "sidebar-about"}
            isHovering={isHoveringSidebar}
            onClick={() => handleItemClick("sidebar-about")}
          />
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <SidebarToggleButton
        isVisible={isVisible}
        isHoveringSidebar={isHoveringSidebar}
        toggleSidebar={toggleSidebar}
        setIsHoveringSidebar={setIsHoveringSidebar}
      />
    </div>
  );
};

export default Sidebar;
