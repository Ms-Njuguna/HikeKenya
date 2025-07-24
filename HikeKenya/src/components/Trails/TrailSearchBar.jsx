// src/components/trails/TrailSearchBar.jsx
import React from "react";

const TrailSearchBar = ({ searchTerm, onSearch }) => {

    
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search trails by title..."
        value={searchTerm}
        onChange={onSearch}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm mb-4"
      />
    </div>
  );
};

export default TrailSearchBar;