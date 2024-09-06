import React, { useState } from 'react';

const MessageInput = ({ message, onMessageChange, onSend, onFileChange }) => {
  // State to track whether the menu is visible
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Handle the file input change
  const handleFileChange = (e) => {
    onFileChange(e); // Call the passed-in file change handler
    setMenuVisible(false); // Hide the menu once the file is selected
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState); // Toggle the menu on and off
  };

  return (
    <div className="bg-white flex items-center justify-between rounded-xl mt-[16px] mb-[16px] border border-gray-400 relative">
      {/* Hidden file input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />

      {/* Attach button */}
      <div
        className={`w-[30px] h-[30px] ml-[32px] flex items-center justify-center cursor-pointer rounded-full ${
          isMenuVisible ? "" : "btn" // Conditional class application
        }`}
        onClick={toggleMenu}
      >
        <img
          src={isMenuVisible ? "/Icons/x_icon.svg" : "/Icons/plus-icon.svg"} // Change between "+" and "X"
          alt={isMenuVisible ? "Cancel" : "Attach"}
          className="w-full h-full text-gray-400"
        />
      </div>

      {/* Message input */}
      <input
        type="text"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="What's on your mind?"
        className="flex-1 p-4 text-black focus:outline-none mx-2 rounded-md h-full"
      />

      {/* Send button */}
      <button
        onClick={onSend}
        className="bg-gray-400 text-white w-[30px] h-[30px] mr-[32px] flex items-center justify-center cursor-pointer rounded-xl hover:bg-gray-500"
      >
        <img
          src="/Icons/arrow-up-icon.svg"
          alt="Send"
          className="w-4 h-4"
        />
      </button>

      {/* Pop-up Menu */}
      {isMenuVisible && (
        <div className="absolute bottom-[45px] left-[5px] bg-gray-100 border border-gray-300 p-2 rounded-md shadow-lg flex items-center space-x-2">
          <img
            src="/Icons/upload_file_black_24dp.svg" // Add the upload icon
            alt="Upload"
            className="w-5 h-5 text-gray-700"
          />
          <label
            htmlFor="fileInput"
            className="text-gray-700 cursor-pointer"
          >
            Upload from your computer
          </label>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
