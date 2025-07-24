// src/components/trails/TrailCard.jsx
import React, { useState } from "react";
import TrailCarousel from "./TrailCarousel";
import JoinTrailsButton from "./JoinTrailsButton";
import FavoritesButton from "./FavoritesButton";
import WeatherCard from "./../Weather/WeatherCard";
import MapPreview from "./../Map/MapPreview";

const TrailCard = ({ trail, userId }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="border shadow-lg rounded-xl overflow-hidden mb-6">
      <TrailCarousel photos={trail.photos} />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{trail.title}</h3>
        <p className="mt-2 text-gray-700">{trail.description}</p>
        <p className="text-sm text-gray-500">{trail.location}</p>

        <div className="flex gap-4 mt-2">
          <JoinTrailsButton userId={userId} trailId={trail.id} />
          <FavoritesButton userId={userId} trailId={trail.id} />
        </div>

        {expanded && (
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span><strong>Date:</strong> {trail.date}</span>
              <span><strong>Price:</strong> KES {trail.price}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Difficulty:</strong> {trail.difficulty}</span>
              <span><strong>Category:</strong> {trail.category}</span>
            </div>

            {/* Weather */}
            {trail.weather && typeof trail.weather === "object" && (
              <div className="mt-2">
                <WeatherCard
                  condition={trail.weather.condition}
                  temperature={trail.weather.temperature}
                  windSpeed={trail.weather.windSpeed}
                  tips={trail.weather.tips}
                />
              </div>
            )}

            {/* Map */}
            {trail.route?.coordinates && (
              <MapPreview
                title={trail.title}
                route={trail.route.coordinates}
              />
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
