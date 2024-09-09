import React from 'react';

const SearchButton = ({ onClick }) => {
  return (
    <div className="flex flex-col justify-between mt-2">
      <div className=".btn flex justify-center">
        <button onClick={onClick} className="hover:opacity-75" id="search-button"> 
          <img
            className="w-7 h-7 cursor-pointer"
            src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
            alt="search icon"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchButton;