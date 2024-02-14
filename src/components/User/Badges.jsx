import { getBadgeColor } from "../../utils/badges.js";
import fightBronze from "../../assets/badges/fight-badge_bronze.png";
import fightSilver from "../../assets/badges/fight-badge_silver.png";
import fightGold from "../../assets/badges/fight-badge_gold.png";
import catchBronze from "../../assets/badges/catch-badge_bronze.png";
import catchSilver from "../../assets/badges/catch-badge_silver.png";
import catchGold from "../../assets/badges/catch-badge_gold.png";
import dexBronze from "../../assets/badges/dex-badge_bronze.png";
import dexSilver from "../../assets/badges/dex-badge_silver.png";
import dexGold from "../../assets/badges/dex-badge_gold.png";

const badges = {
  fightBronze,
  fightSilver,
  fightGold,
  catchBronze,
  catchSilver,
  catchGold,
  dexBronze,
  dexSilver,
  dexGold,
};

const getText = (badge) => {
  switch (badge) {
    case "dex":
      return "PokéDex";
    case "fight":
      return "Battle";
    case "catch":
      return "Catch-Em-All";
    default:
      return "nix";
  }
};

const getVerb = (badge) => {
    switch (badge) {
      case "dex":
        return "seen";
      case "fight":
        return "batteled";
      case "catch":
        return "caught";
      default:
        return "nix";
    }
  };

const Badges = ({ badge, number, mastery }) => {
  return (
    <div className="badge-section">
      <img
        src={badges[badge + getBadgeColor(number)]}
        alt={badge + getBadgeColor(number)}
      />
      <div>
        <h3>{getText(badge)}-Mastery: {mastery}.</h3>
        <p>
          Pokémons {getVerb(badge)}: {number}
          {number === 1 ? " pokémon" : " pokémons"}
        </p>
      </div>
    </div>
  );
};

export default Badges;
