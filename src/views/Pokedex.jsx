import Main from "../components/Main";
import "../styles/Pokedex.css";
import pokemonLogo from "../assets/pokemon_logo.png";
import { PokemonContext } from "../provider/PokemonProvider";
import { useContext } from "react";

const Pokedex = () => {
  const { userIsLoggedIn } = useContext(PokemonContext);
  return (
    <div className="body">
      <h1 className="hidden">Poke-Fight</h1>
      <img className="pkmn-logo" src={pokemonLogo} alt="Pokemon" />
      {userIsLoggedIn ? (
        <Main />
      ) : (
        <section class="view-not-logged">
          <h2>You want to play the game?</h2>
          <h2>You need to log in yes or yes!</h2>
        </section>
      )}
    </div>
  );
};

export default Pokedex;
