import React from 'react';

const MessageInput = ({ message, onMessageChange, onSend, onFileChange }) => {
  return (
    <div className="bg-white flex items-center justify-between rounded-xl mt-[16px] mb-[16px] border border-gray-400">
      {/* Hidden file input */}
      <input
        type="file"
        onChange={onFileChange}
        className="hidden"
        id="fileInput"
      />
      {/* Attach button replaced with "+" icon from Icons folder */}
      <label
        htmlFor="fileInput"
        className="w-[30px] h-[30px] ml-[32px] flex items-center justify-center cursor-pointer rounded-full"
      >
        <img
          src="/Icons/plus-icon.svg" // Pointing to the plus icon in the /Icons folder
          alt="Attach"
          className="w-full h-full text-gray-400"
        />
      </label>
      {/* Message input */}
      <input
        type="text"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="What's on your mind?"
        className="flex-1 p-4 text-black focus:outline-none mx-2 rounded-md"
      />
      {/* Send button with arrow icon from Icons folder */}
      <button
        onClick={onSend}
        className="bg-gray-400 text-white w-[30px] h-[30px] mr-[32px] flex items-center justify-center cursor-pointer rounded-xl hover:bg-gray-500"
      >
        <img
          src="/Icons/arrow-up-icon.svg" // Pointing to the arrow icon in the /Icons folder
          alt="Send"
          className="w-4 h-4"
        />
      </button>
    </div>
  );
};

export default MessageInput;
