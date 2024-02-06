import { useState, useEffect } from "react";
import "../styles/Main.css";
import PokemonModal from "./PokemonModal";
import { getTypeColor } from "../utils/strings";

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
              <img
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fpokemon-logo-png-pokemon-logo-text-png-1428-1390.png&f=1&nofb=1&ipt=a6000bf82b5cc75d945e6609d6d6d22cf695d813fee1fab31ffb2395aeb6d40a&ipo=images"
                alt={poke.name.english}
              />
              <h2> {poke.name.english}</h2>
              <p>No. {poke.id}</p>
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
