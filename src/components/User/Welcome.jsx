import { PokemonContext } from "../../provider/PokemonProvider";
import { useContext } from "react";
import BasicPie from "./PieChart";
import "../../styles/Welcome.css";
import Badges from "./Badges";
import { getMastery } from "../../utils/mastery.js";

const Welcome = () => {
  const { user } = useContext(PokemonContext);

  console.log(user);
  
  return (
    <>
      <div className="welcome">
        <h1>Welcome, {user.username}!</h1>

        <div className="profile">
          <div className="left">
            <div className="circle">
              {user.team.length > 0 ? <img
                src={user.team[0].sprites["front_default"]}
                alt={user.team[0].name.en}
              />: null}
            </div>
          </div>

          <div className="right">
            <div className="user-info">
              <h2>Trainer Stats</h2>
              <h3>Name</h3>
              <p>{user ? user.username : ""}</p>
              <h3>Your Adventure started on</h3>
              <p>14/02/2023</p>
            </div>
          </div>
        </div>
        <section className="badges">
          <h2>Trainer Achievements</h2>

         <Badges badge="dex" number={user.seen.length} mastery={getMastery(user.seen.length)}/>
         <Badges badge="catch" number={user.pokemons.length} mastery={getMastery(user.pokemons.length)}/>
         <Badges badge="fight" number={user.battles.length} mastery={getMastery(user.battles.length)}/>

        </section>

        <section className="pie-chart">
          <h2 className="dex">PokéDex Status</h2>

          <BasicPie user={user} />
        </section>

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
