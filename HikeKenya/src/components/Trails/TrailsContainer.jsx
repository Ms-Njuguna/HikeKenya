import React from "react";
import TrailCard from "./TrailCard";

function TrailsContainer({ trails }) {
    return (
        <div>
            {trails.map((trail) => {
                return (
                    <TrailCard key={trail.id} trail={trail}/>
                );
            })}
        </div>
    );
};

export default TrailsContainer;