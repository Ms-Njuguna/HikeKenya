import React, { useState, useContext } from "react";
import TrailCarousel from "./TrailCarousel";
import JoinTrailsButton from "./JoinTrailsButton";
import FavoritesButton from "./FavoritesButton";
import WeatherCard from "./../Weather/WeatherCard";
import MapPreview from "./../Map/MapPreview";
import Reviews from "./Reviews"; 
import { AuthContext } from "../../context/AuthContext";

const TrailCard = ({ trail }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(prev => !prev);

  return (
    <div className="bg-white rounded-[8px] shadow-[0_12px_24px_-6px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
      <TrailCarousel photos={trail.photos || []} />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{trail.title}</h3>
        <p className="mt-2 text-gray-700">{trail.description}</p>
        <p className="text-sm text-gray-500">{trail.location}</p>

        <div className="flex gap-4 mt-3">
          <JoinTrailsButton userId={userId} trailId={trail.id} />
          <FavoritesButton userId={userId} trailId={trail.id} />
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 text-sm text-gray-700 transition-opacity duration-300 border-t border-gray-100 border-opacity-10 py-4">
            <div className="flex justify-between">
              <span><strong>Date:</strong> {trail.date || "N/A"}</span>
              <span><strong>Price:</strong> KES {trail.price}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Difficulty:</strong> {trail.difficulty}</span>
              <span><strong>Category:</strong> {trail.category}</span>
            </div>

            <div className="relative z-10 overflow-visible">
            {trail.weather && typeof trail.weather === "object" && (
              <WeatherCard
                condition={trail.weather.condition}
                temperature={trail.weather.temperature}
                windSpeed={trail.weather.windSpeed}
                tips={trail.weather.tips || []}
              />
            )}

            <MapPreview title={trail.title} route={trail.route} />
            </div>
            {/* Render the Reviews component here */}
            <Reviews trailId={trail.id} />
          </div>
        )}

        <button
        type="button"
        onClick={toggleExpand}
        className="mt-6 flex items-center gap-2 text-green-700 font-medium text-sm hover:text-green-900 transition-colors"
        >
          {expanded ? (
            <>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
              Show Less
           </>
          ) : (
            <>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              Show More Details
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TrailCard;