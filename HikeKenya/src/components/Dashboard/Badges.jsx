// src/components/Dashboard/Badges.jsx
import React, { useEffect, useState } from "react";
import { getEarnedBadges } from "./BadgeLogic";

const Badges = ({ user }) => {
  const [allBadges, setAllBadges] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/badges")
      .then((res) => res.json())
      .then((data) => {
        setAllBadges(data);
        setEarnedBadges(getEarnedBadges(user.points, data));
      })
      .catch((error) => console.error("Error fetching badges:", error));
  }, [user.points]);

  if (!earnedBadges.length) {
    return (
      <p className="text-gray-500 mt-4">
        No badges earned yet — go on more hikes to earn rewards!
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-3">🎖️ Your Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {earnedBadges.map((badge) => (
          <div
            key={badge.id}
            className="p-4 border rounded-xl shadow bg-white text-center"
          >
            <img
              src={badge.icon}
              alt={badge.title}
              className="w-16 h-16 mx-auto mb-2"
            />
            <p className="font-medium">{badge.title}</p>
            <p className="text-xs text-gray-500">{badge.pointsRequired} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
