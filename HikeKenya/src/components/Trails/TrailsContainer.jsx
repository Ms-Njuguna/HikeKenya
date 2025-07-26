import React from "react";
import TrailCard from "./TrailCard";

function TrailsContainer({ trails }) {
  return (
    <div className="flex flex-wrap gap-6 p-4 mx-16">
      {trails.map((trail) => (
        <div key={trail.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
          <TrailCard trail={trail} />
        </div>
      ))}
    </div>
  );
}


export default TrailsContainer;