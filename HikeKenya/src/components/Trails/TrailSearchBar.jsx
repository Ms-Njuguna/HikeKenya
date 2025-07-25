import React from "react";
import { Search } from "lucide-react";

const TrailSearchBar = ({ searchTerm, onSearch }) => {

    
  return (
    <div className="px-6 py-8 bg-[#FAF7F2]">
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0AFAE]" size={20}/>
        <input
        type="text"
        placeholder="Search trails by title..."
        value={searchTerm}
        onChange={onSearch}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white text-sm text-gray-800 shadow-md transition"
        />
      </div>
    </div>
  );
};

export default TrailSearchBar;