export const getTypeColor = (type) => {
  switch (type.toLowerCase()) {
    case "fire":
      return "#f08030";
    case "water":
      return "#6890f0";
    case "grass":
      return "#78c850";
    case "bug":
      return "#a8b820";
    case "flying":
      return "#a890f0";
    case "poison":
      return "#a040a0";
    case "electric":
      return "#f8d030";
    case "ground":
      return "#e0c068";
    case "fairy":
      return "#ee99ac";
    case "fighting":
      return "#c03028";
    case "psychic":
      return "#f85888";
    case "rock":
      return "#b8a038";
    case "steel":
      return "#b8b8d0";
    case "ice":
      return "#98d8d8";
    case "ghost":
      return "#705898";
    case "dragon":
      return "#7038f8";
    case "dark":
      return "#705848";
    case "stellar":
      return "#7cc7b2";
    default:
      return "#a8a878";
  }
};
