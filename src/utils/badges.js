export const getBadgeColor = (number) => {
    if (number > 500) {
        return "Gold"
    } else if (number > 250) {
        return "Silver"
    } else {
        return "Bronze"
    }
  };