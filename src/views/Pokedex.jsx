import Main from "../components/Main";
import "../styles/Pokedex.css";
import pokemonLogo from "../assets/pokemon_logo.png";

const Pokedex = () => {
  return (
    <>
      <h1 className="hidden">Poke-Fight</h1>
      <img className="pkmn-logo" src={pokemonLogo} alt="Pokemon" />
      <Main />
    </>
  );
};

export default Pokedex;
