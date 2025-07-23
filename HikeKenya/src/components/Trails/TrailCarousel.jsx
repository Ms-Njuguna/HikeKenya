import React from "react";

const TrailCarousel = ({ photos }) => {
  return (
    <div className="flex gap-4 overflow-x-auto p-2">
      {photos.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Trail photo ${index + 1}`}
          className="h-48 rounded-xl object-cover flex-shrink-0"
        />
      ))}
    </div>
  );
};

export default TrailCarousel;
