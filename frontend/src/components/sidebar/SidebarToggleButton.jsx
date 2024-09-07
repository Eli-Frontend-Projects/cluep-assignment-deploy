import React from 'react';

const SidebarToggleButton = ({ isVisible, isHoveringSidebar, toggleSidebar, setIsHoveringSidebar }) => {
  return (
    <div className={`flex justify-center items-center ${!isVisible ? "w-[70px]" : ""}`}>
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
  );
};

export default SidebarToggleButton;