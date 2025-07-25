import React, { useState, useContext } from "react";
import TrailCarousel from "./TrailCarousel";
import JoinTrailsButton from "./JoinTrailsButton";
import FavoritesButton from "./FavoritesButton";
import WeatherCard from "./../Weather/WeatherCard";
import MapPreview from "./../Map/MapPreview";
import Reviews from "./Reviews"; // Import the new Reviews component
import { AuthContext } from "../../context/AuthContext";

const TrailCard = ({ trail }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(prev => !prev);

  return (
    <div className="border shadow-lg rounded-xl overflow-hidden mb-6 transition-all duration-300">
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
          <div className="mt-4 space-y-4 text-sm text-gray-700 transition-opacity duration-300">
            <div className="flex justify-between">
              <span><strong>Date:</strong> {trail.date || "N/A"}</span>
              <span><strong>Price:</strong> KES {trail.price}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Difficulty:</strong> {trail.difficulty}</span>
              <span><strong>Category:</strong> {trail.category}</span>
            </div>

            {trail.weather && typeof trail.weather === "object" && (
              <WeatherCard
                condition={trail.weather.condition}
                temperature={trail.weather.temperature}
                windSpeed={trail.weather.windSpeed}
                tips={trail.weather.tips || []}
              />
            )}

            <MapPreview title={trail.title} route={trail.route} />

            {/* Render the Reviews component here */}
            <Reviews trailId={trail.id} />
          </div>
        )}

        <button
          onClick={toggleExpand}
          className="mt-4 text-green-600 underline text-sm"
        >
          {expanded ? "Show Less" : "Show More Details"}
        </button>
      </div>
    </div>
  );
};

export default TrailCard;