import React from "react";

const TrailCard = ({ trail }) => {
  return (
    <div className="border shadow-lg rounded-xl overflow-hidden">
      <img
        src={trail.photos[0]}
        alt={trail.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-700">{trail.title}</h3>
        <p className="text-sm text-gray-500">{trail.location}</p>
        <p className="mt-2 text-gray-700">{trail.description}</p>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span>Date: {trail.date}</span>
          <span>Price: KES {trail.price}</span>
        </div>
        <div className="flex justify-between mt-1 text-sm text-gray-600">
          <span>Difficulty: {trail.difficulty}</span>
          <span>Category: {trail.category}</span>
        </div>
      </div>
    </div>
  );
};

export default TrailCard;
