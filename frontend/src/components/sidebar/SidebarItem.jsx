import React from 'react';

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

export default SidebarItem;