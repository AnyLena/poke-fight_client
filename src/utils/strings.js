export const getTypeColor = (type) => {
  switch (type) {
    case "Fire":
      return "red";
    case "Water":
      return "blue";
    case "Grass":
      return "green";
    case "Bug":
      return "violet";
    case "Flying":
      return "lightblue";
    case "Poison":
      return "darkviolet";
    case "Electric":
      return "yellow";
    case "Ground":
      return "brown";
    case "Fairy":
      return "pink";
    case "Fighting":
      return "grey";
    case "Psychic":
      return "lightblue";
    case "Bug":
      return "violet";
    case "Rock":
      return "darkbrown";
    case "Steel":
      return "grey";
    case "Ice":
      return "iceblue";
    case "Ghost":
      return "violet";
    default:
      return "lightgray";
  }
};
