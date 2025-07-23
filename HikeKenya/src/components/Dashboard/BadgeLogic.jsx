
export const getEarnedBadges = (points, allBadges) => {
  return allBadges.filter((badge) => points >= badge.pointsRequired);
};