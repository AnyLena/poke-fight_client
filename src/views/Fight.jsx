import Battle from "../components/Battle";
import { PokemonContext } from "../provider/PokemonProvider";
import { useContext } from "react";

const Fight = () => {
  const { userIsLoggedIn } = useContext(PokemonContext);
  return (
    <div className="body">
      {userIsLoggedIn ? (
        <Battle />
      ) : (
        <section class="view-not-logged">
          <h2>You want to play the game?</h2>
          <br></br>
          <h2>You need to log in yes or yes!</h2>
        </section>
      )}
    </div>
  );
};

export default Fight;
