import React, { useState } from "react";
import TrailCarousel from "./TrailCarousel";
import JoinAdventureButton from "./JoinAdventureButton";
import FavoritesButton from "./FavoritesButton";

const TrailCard = ({ trail }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="border shadow-lg rounded-xl overflow-hidden">
      <TrailCarousel photos={trail.photos} />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{trail.title}</h3>
        <p className="mt-2 text-gray-700">{trail.description}</p>
        <p className="text-sm text-gray-500">{trail.location}</p>

        {expanded && (
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Date: {trail.date}</span>
              <span>Price: KES {trail.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Difficulty: {trail.difficulty}</span>
              <span>Category: {trail.category}</span>
            </div>
            {trail.weather && (
              <div>
                <strong>Weather:</strong> {trail.weather}
              </div>
            )}
            {trail.route?.coordinates && (
              <div>
                <strong>Route Coordinates:</strong>
                <ul className="list-disc ml-4">
                  {Array.isArray(trail.route.coordinates[0])
                    ? trail.route.coordinates.map((coord, index) => (
                        <li key={index}>{coord.join(", ")}</li>
                      ))
                    : <li>{trail.route.coordinates.join(", ")}</li>
                  }
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          onClick={toggleExpand}
          className="mt-3 text-green-600 underline text-sm"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default TrailCard;
