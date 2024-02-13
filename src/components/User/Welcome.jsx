import { PokemonContext } from "../../provider/PokemonProvider";
import { useContext } from "react";
import BasicPie from "./PieChart";
import "../../styles/Welcome.css";

const Welcome = () => {
  const { user } = useContext(PokemonContext);

  let masteryLevel;

  if (user.pokemons.length < 10) {
    masteryLevel = "Beginner";
  } else if (user.pokemons.length < 100) {
    masteryLevel = "Adventurer";
  } else if (user.pokemons.length < 200) {
    masteryLevel = "Explorer";
  } else if (user.pokemons.length < 300) {
    masteryLevel = "Master";
  } else if (user.pokemons.length < 400) {
    masteryLevel = "Elite";
  } else {
    masteryLevel = "Champion";
  }

  return (
    <>
      <div className="welcome">
        <h2>Welcome {user.username}!</h2>

        <div className="profile">
          <div className="left">
            <div className="circle"></div>
            <p className="initial">{user.username[0]}</p>
          </div>

          <div className="right">
            <div className="user-info">
              <p>
                You have {user.pokemons.length} 
                {user.pokemons.length === 1 ? " pokémon" : " pokémons"} so far.
              </p>
              <p>Your mastery level is: {masteryLevel}.</p>
            </div>
          </div>
        </div>

        <BasicPie user={user} />

        <div className="team">
          {user.team.length > 0 ? (
            <div></div>
          ) : (
            <p className="teamnotready">
              You don't have a team yet. Go to MyPokemons and make a team!
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default Welcome;
