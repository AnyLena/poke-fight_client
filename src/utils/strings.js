export const getTypeColor = (type) => {
  switch (type.toLowerCase()) {
    case "fire":
      return "red";
    case "water":
      return "blue";
    case "grass":
      return "green";
    case "bug":
      return "violet";
    case "flying":
      return "lightblue";
    case "poison":
      return "darkviolet";
    case "electric":
      return "yellow";
    case "ground":
      return "brown";
    case "fairy":
      return "pink";
    case "fighting":
      return "grey";
    case "psychic":
      return "lightblue";
    case "rock":
      return "darkbrown";
    case "steel":
      return "grey";
    case "ice":
      return "iceblue";
    case "ghost":
      return "violet";
    default:
      return "lightgray";
  }
};