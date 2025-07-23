import React, { useState } from "react";
import TrailCarousel from "./TrailCarousel";
import JoinAdventureButton from "./JoinAdventureButton";
import FavoritesButton from "./FavoritesButton";

const HikeCard = ({ hike }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="border p-4 rounded-xl shadow-md mb-6 bg-white transition-all duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{hike.title}</h2>
        <button
          onClick={toggleExpand}
          className="text-sm text-blue-600 hover:underline"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-1">
        {hike.date} • <span className="capitalize">{hike.difficulty}</span>
      </p>

      {expanded && (
        <div className="mt-3">
          <HikeCarousel images={hike.photos} />
          <p className="mt-3 text-gray-700">{hike.description}</p>

          <div className="flex flex-wrap gap-4 mt-4">
            <JoinAdventureButton hikeId={hike.id} />
            <FavoritesButton hike={hike} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HikeCard;
