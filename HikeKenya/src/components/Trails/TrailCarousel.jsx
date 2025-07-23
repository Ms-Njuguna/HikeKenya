import React from "react";

const TrailCarousel = ({ photos }) => {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex space-x-2">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Trail ${index}`}
            className="h-48 w-80 object-cover rounded-xl shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default TrailCarousel;
