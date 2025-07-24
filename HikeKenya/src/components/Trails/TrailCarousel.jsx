import React from "react";

const TrailCarousel = ({ photos }) => {
  if (!Array.isArray(photos) || photos.length === 0) {
    return <div className="h-48 flex items-center justify-center bg-gray-100 text-gray-500">No images</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4 px-4 py-2">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Trail ${index}`}
            className="h-48 w-80 object-cover rounded-xl shadow-md flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default TrailCarousel;
