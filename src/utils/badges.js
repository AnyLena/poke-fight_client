export const getBadgeColor = (number) => {
    if (number > 100) {
        return "Gold"
    } else if (number > 50) {
        return "Silver"
    } else {
        return "Bronze"
    }
  };