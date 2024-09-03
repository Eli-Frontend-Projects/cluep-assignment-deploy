import React from 'react';

const SidebarItem = ({ icon, label }) => {
  return (
    <div className="flex items-center  mb-2 rounded-md p-2">
      <img 
        src={icon} 
        alt={`${label} icon`} 
        className="w-6 h-6 mr-2 object-contain rounded" 
      />
      <span className="text-center rounded text-white">{label}</span>
    </div>
  );
};

export default SidebarItem;
