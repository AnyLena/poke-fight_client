import { PokemonContext } from "../../provider/PokemonProvider";
import { useContext, useEffect } from "react";
import "../../styles/BattleStats.css";

const BattleStats = () => {
  const { user, setUser, userIsLoggedIn } = useContext(PokemonContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="battlestats">
      <h1>My Battle Stats</h1>
      <div className="won-lost">
        <h2>
          Won: {user.battles.filter((battle) => battle.result === "win").length}
        </h2>
        <h2>
          Lost:
          {user.battles.filter((battle) => battle.result === "lose").length}
        </h2>
      </div>
      {user.battles ? (
        <ul>
          {user.battles.map((battle, index) => (
            <li
              key={index}
              style={{
                backgroundColor: battle.result === "win" ? "rgba(193, 247, 219,.3)" : "rgba(247, 172, 161,.5)", 
              }}
            >
              <img
                src={battle.mypokemon.img}
                alt={battle.mypokemon.name}
              />
              <p>{battle.mypokemon.name}</p>
              <p className="vs">VS</p>
              <img
                src={battle.opponent.img}
                alt={battle.opponent.name}
              />
              <p>{battle.opponent.name}</p>
              <p className="date">
                {new Date(battle.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="result">{battle.result}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No battles yet</p>
      )}
    </div>
  );
};

export default BattleStats;
