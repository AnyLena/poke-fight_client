import { useState, useEffect } from "react";
import "../styles/Main.css";
import PokemonModal from "./PokemonModal";
import { getTypeColor } from "../utils/strings";
import "../styles/Pokeball.css";

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPokemon = async () => {
    try {
      const res = await fetch("http://localhost:3000/pokemon/");
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const res = await getPokemon();
      setPokemon(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleClick = (poke) => {
    setSelectedPokemon(poke);
    handleOpen();
  };

  return (
    <>
      <PokemonModal
        open={open}
        handleClose={handleClose}
        selectedPokemon={selectedPokemon}
      />
      { loading && <div className="pokeball"></div>}
      <section className="pokedex-grid">
        {pokemon.length > 0 ? (
          pokemon.map((poke) => (
            <div
              key={poke.id}
              className="poke-card"
              onClick={() => handleClick(poke)}
              style={{
                background: `linear-gradient(to right, ${getTypeColor(
                  poke.type[0]
                )} 50%, ${getTypeColor(poke.type[1] || poke.type[0])} 50%)`,
              }}
            >
              <div className="dex-img-container">
              <div className="dex-circle"></div><img
                src={poke.sprites.other['official-artwork'].front_default}
                alt={poke.name}
              /></div>
              <p className="dex-number">#{poke.id}</p>
              <h2> {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
              <p>Type: {poke.type.map((type) => type + " ")}</p>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </section>
    </>
  );
};

export default Main;
