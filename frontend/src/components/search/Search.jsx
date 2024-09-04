import React from 'react';

const Search = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <div className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 p-2 bg-gray-700 text-white rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;