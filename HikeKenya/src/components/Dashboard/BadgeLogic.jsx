
/**
 * Filters and returns all earned badges for the given user points.
 * @param {number} userPoints - User's current total points.
 * @param {Array} allBadges - Full list of available badges.
 * @returns {Array} Array of badge objects the user has earned.
 */
export function getEarnedBadges(userPoints, allBadges) {
  return allBadges.filter(badge => userPoints >= badge.pointsRequired);
}
