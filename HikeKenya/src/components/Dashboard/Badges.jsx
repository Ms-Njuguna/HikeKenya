import React from "react";

const Badges = ({ user, badges }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {badges.map((badge) => {
        const isEarned = user.points >= badge.pointsRequired;

        return (
          <div
            key={badge.id}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-md ${
              isEarned ? "bg-green-100" : "bg-gray-200 opacity-50"
            }`}
          >
        
            <img
              src={badge.icon}
              alt={badge.title}
              className="w-12 h-12"
              style={{ filter: isEarned ? "none" : "grayscale(100%)" }}
            />
            <span className="text-xs mt-1 text-center">
              {badge.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Badges;
