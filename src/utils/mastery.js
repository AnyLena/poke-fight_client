export const getMastery = (number) => {
  if (number < 25) {
    return "Beginner";
  } else if (number < 50) {
    return "Adventurer";
  } else if (number < 75) {
    return "Explorer";
  } else if (number < 100) {
    return "Master";
  } else if (number < 125) {
    return "Elite";
  } else {
    return "Champion";
  }
};
