import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ searchQuery, setSearchQuery, handleSearch, showSearchBox, setShowSearchBox }) => {
  // Function to clear search input and hide the search box
  const clearSearchInput = () => {
    setSearchQuery(''); // Clear the input field
    setShowSearchBox(false); // Hide the search box
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="relative w-full flex items-center"> 
        {/* The 'relative' class ensures positioning for the input and X button */}
        <div className={`bg-gray-100 flex flex-row items-center border border-gray-300 rounded-2xl w-full transition-all duration-300 ${showSearchBox ? 'visible' : 'invisible'}`}>
          <img
            className="ml-2 w-7 h-7 cursor-pointer"
            src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
            alt="search icon"
          />
          <input
            type="search"
            className="w-full border-0 outline-none py-2 px-5 text-lg bg-gray-100"
            placeholder="Search"
            value={searchQuery}
            onChange={event => {
              setSearchQuery(event.target.value);
              if (handleSearch) {
                handleSearch(event.target.value); // Pass only the value, not the event
              }
            }}
          />
          {/* X button to clear the input and hide the search box */}
          <button
            className="mr-4 text-lg text-gray-600 .btn"
            onClick={clearSearchInput}
          >
            &#x2715; {/* Unicode for X symbol */}
          </button>
        </div>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  searchQuery: PropTypes.string.isRequired, 
  setSearchQuery: PropTypes.func.isRequired, 
  handleSearch: PropTypes.func, 
  showSearchBox: PropTypes.bool.isRequired, 
  setShowSearchBox: PropTypes.func.isRequired, 
};

SearchBox.defaultProps = {
  handleSearch: null, 
};

export default SearchBox;
