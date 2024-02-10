import Main from "../components/Main";
import "../styles/Pokedex.css";
import pokemonLogo from "../assets/pokemon_logo.png";

const Pokedex = () => {
  return (
    <div className='body'>
      <h1 className="hidden">Poke-Fight</h1>
      <img className="pkmn-logo" src={pokemonLogo} alt="Pokemon" />
      <Main />
    </div>
  );
};

export default Pokedex;
