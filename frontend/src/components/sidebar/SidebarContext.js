// SidebarContext.js
import React, { createContext, useState } from 'react';

// Create a Context
export const SidebarContext = createContext();

// Create a Provider Component
export const SidebarProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <SidebarContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};