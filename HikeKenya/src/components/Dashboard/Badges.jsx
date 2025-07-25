import React from "react";

const Badges = ({ user, badges }) => {
  return (
    <div className="flex justify-center items-center gap-4 py-10 flex-wrap">
      {badges.map((badge, index) => {
        const isEarned = user.points >= badge.pointsRequired;
        const isLast = index === badges.length - 1;

        return (
          <div key={badge.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 ${
                  isEarned ? "bg-[#FAF7F2]" : "bg-gray-200 opacity-50"
                }`}
              >
                <img
                  src={badge.icon}
                  alt={badge.title}
                  className="w-[60px] h-[60px]"
                  style={{ filter: isEarned ? "none" : "grayscale(100%)" }}
                />
              </div>
              <h5 className="text-xs mt-2 text-center">{badge.title}</h5>
            </div>

            {!isLast && (
              <div className="w-10 h-0.5 bg-orange-400 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Badges;
