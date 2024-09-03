import React from 'react';
import SidebarItem from './SidebarItem';

const SIDEBAR_WIDTH = '200px'; // Define the sidebar width variable

const Sidebar = () => {
  return (
    <div className={`flex flex-col justify-between w-[${SIDEBAR_WIDTH}] bg-black h-screen m-1`}>
      <div>
        <SidebarItem icon="/Icons/ProfilePic.jpg" label="Chats" />
        <SidebarItem icon="/Icons/Chats.png" label="Chats" />
        <SidebarItem icon="/Icons/Sent.png" label="Sent" />
        <SidebarItem icon="/Icons/Draft.png" label="Draft" />
        <SidebarItem icon="/Icons/Spam.png" label="Spam" />
        <SidebarItem icon="/Icons/Trash.png" label="Trash" />
        <SidebarItem icon="/Icons/Connect apps.png" label="Connect apps" />
      </div>

      <div className="flex flex-col">
        <SidebarItem icon="/Icons/Help.png" label="Help" />
        <SidebarItem icon="/Icons/Rate.png" label="Rate" />
        <SidebarItem icon="/Icons/About.png" label="About" />
      </div>
    </div>
  );
};

export default Sidebar;