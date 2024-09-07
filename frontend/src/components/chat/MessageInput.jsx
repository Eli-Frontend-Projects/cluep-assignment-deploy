import React, { useState, useRef, useEffect } from 'react';

const MessageInput = ({ message, onMessageChange, onSend, onFileChange }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    onFileChange(e);
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex items-center rounded-xl mt-4 mb-4 border border-gray-400 p-2 relative">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />

      <div
        className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded-full ${
          isMenuVisible ? "" : "btn"
        }`} 
        onClick={toggleMenu}
      >
        <img
          src={isMenuVisible ? "/Icons/x_icon.svg" : "/Icons/plus-icon.svg"}
          alt={isMenuVisible ? "Cancel" : "Attach"}
          className="w-full h-full"
        />
      </div>

      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="What's on your mind?"
        className="flex-1 text-black focus:outline-none mx-2 rounded-md resize-none overflow-auto h-[40px] min-h-[40px] max-h-[120px]"
        rows="1" // Ensure initial height fits one row
  style={{
    overflow: 'hidden',
    paddingTop: '6px', // Adjust padding to center text vertically
    paddingBottom: '6px', // Adjust padding to center text vertically
  }}
      />

      <button
        onClick={onSend}
        className="bg-gray-400 text-white w-8 h-8 flex items-center justify-center cursor-pointer rounded-xl hover:bg-gray-500"
      >
        <img
          src="/Icons/arrow-up-icon.svg"
          alt="Send"
          className="w-4 h-4"
        />
      </button>

      {isMenuVisible && (
        <div className="absolute bottom-12 left-2 bg-gray-100 border border-gray-300 p-2 rounded-md shadow-lg flex items-center space-x-2">
          <img
            src="/Icons/upload_file_black_24dp.svg"
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
