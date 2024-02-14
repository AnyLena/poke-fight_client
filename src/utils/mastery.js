export const getMastery = (number) => {
  if (number < 10) {
    return "Beginner";
  } else if (number < 100) {
    return "Adventurer";
  } else if (number < 200) {
    return "Explorer";
  } else if (number < 300) {
    return "Master";
  } else if (number < 400) {
    return "Elite";
  } else {
    return "Champion";
  }
};
