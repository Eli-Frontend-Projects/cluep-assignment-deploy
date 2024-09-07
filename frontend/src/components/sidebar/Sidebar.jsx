import React, { useState } from 'react';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState("sidebar-chats");

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  const handleItemClick = (id) => {
    setSelectedItem(id);
  };

  return (
    <div
      className="hidden lg:flex"
    >
      {/* Sidebar Content */}
      <div
        className={`flex flex-col justify-between bg-black transition-all duration-300 ${
          isVisible ? 'w-[160px]' : 'w-0'
        } overflow-hidden ${isHoveringSidebar ? 'text-gray-400' : ''}`}
      >
        <div className="flex flex-col">
          <SidebarItem
            id="sidebar-profile"
            icon="/Icons/ProfilePic.jpg"
            label="Jane Cooper"
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
      <div className={`flex justify-center items-center ${!isVisible ? "w-[70px]" :""}`}> 
        <div
        onMouseEnter={() => setIsHoveringSidebar(true)}
        onMouseLeave={() => setIsHoveringSidebar(false)}
          className="flex items-center transition-all duration-10 ml-0 h-6 btn"
        >
          <button
            id="sidebar-toggle"
            onClick={toggleSidebar}
            className="relative"
            onMouseEnter={() => setIsHoveringSidebar(true)}
            onMouseLeave={() => setIsHoveringSidebar(false)}
          >
            <img
              src={isVisible ? (isHoveringSidebar ? "/Icons/Sidebar-2.png" : "/Icons/Sidebar-1.png") : "/Icons/chevron_right_black_24dp.svg"}
              alt="Toggle Sidebar"
              className={`h-6 ml-1 transition-all duration-300`}
            />
          </button>
      </div>

      </div>
    </div>
  );
};

// SidebarItem Component
const SidebarItem = ({ id, icon, label, isSelected, isHovering, onClick }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`flex items-center mb-2 rounded-md p-2 cursor-pointer transition-colors hover:bg-gray-700 ${
        isSelected && !isHovering
          ? 'bg-gray-700 text-white'
          : isHovering
          ? 'hover:bg-gray-700 hover:text-gray-300'
          : 'text-white'
      }`}
    >
      <img 
        src={icon} 
        alt={`${label} icon`} 
        className="w-6 h-6 mr-2 object-contain rounded" 
      />
      <span className="text-center rounded">
        {label}
      </span>
    </div>
  );
};

export default Sidebar;
