import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrailCarousel = ({ photos }) => {
  const [current, setCurrent] = useState(0);
  const slideInterval = useRef(null);

  const length = photos?.length || 0;

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [current]);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 4s
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(photos) || photos.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center bg-gray-100 text-gray-500">
        No images
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg group">
      {/* Slides */}
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Trail ${index}`}
            className="min-w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 hidden group-hover:block"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 hidden group-hover:block"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {photos.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${current === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrailCarousel;
