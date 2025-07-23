import React from "react";

const Badges = ({ userPoints, allBadges }) => {
  const earned = allBadges.filter(b => userPoints >= b.pointsRequired);

  return (
    <div className="flex flex-wrap gap-4">
      {earned.map((badge) => (
        <div
          key={badge.id}
          className="w-24 h-24 bg-green-100 rounded-full flex flex-col items-center justify-center shadow-md"
        >
          <img src={badge.icon} alt={badge.title} className="w-12 h-12" />
          <span className="text-xs mt-1 text-center">{badge.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Badges;
