// src/components/Hikes/HikeCarousel.jsx
import React, { useState } from "react";

const HikeCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p className="text-gray-500">No images available for this hike.</p>;
  }

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="relative mt-4">
      <img
        src={images[index]}
        alt={`Trail view ${index + 1}`}
        className="w-full h-64 object-cover rounded-xl transition-all duration-300"
      />
      <div className="absolute inset-0 flex justify-between items-center px-3">
        <button
          onClick={prev}
          className="bg-white bg-opacity-70 hover:bg-opacity-100 px-3 py-1 rounded-full shadow"
        >
          ←
        </button>
        <button
          onClick={next}
          className="bg-white bg-opacity-70 hover:bg-opacity-100 px-3 py-1 rounded-full shadow"
        >
          →
        </button>
      </div>
      <div className="text-center mt-2 text-sm text-gray-600">
        Image {index + 1} of {images.length}
      </div>
    </div>
  );
};

export default HikeCarousel;
