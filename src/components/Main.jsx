import { useState, useEffect } from "react";
import "../styles/Main.css";
import PokemonModal from "./PokemonModal";
import { getTypeColor } from "../utils/strings";
import "../styles/Pokeball.css";
import { SERVER } from "../constants/server";
import InfiniteScroll from "react-infinite-scroller";

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPokemon = async () => {
    const limit = 50;
    try {
      const res = await fetch(`${SERVER}?offset=${offset}&limit=${limit}`);
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
      setPokemon((prev) => [...prev, ...res]);
      setOffset((prev) => prev + 50);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching pokemons from useEffect");
    fetchPokemon();
  }, []);

  const handleClick = (poke) => {
    setSelectedPokemon(poke);
    handleOpen();
  };

  const loadMorePokes = () => {
    if (!loading) {
      fetchPokemon();
      console.log("Loading more pokemons from InfiniteScroll");
    }
  }

  return (
    <>
      <PokemonModal
        open={open}
        handleClose={handleClose}
        selectedPokemon={selectedPokemon}
      />

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMorePokes}
        hasMore={offset <= 950}
        loader={
          <div className="loader" key={0}>
            <div className="pokeball"></div>
          </div>
        }
      >
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
                  <div className="dex-circle"></div>
                  <img
                    src={poke.sprites.other["official-artwork"].front_default}
                    alt={poke.name}
                  />
                </div>
                <p className="dex-number">#{poke.id}</p>
                <h2>
                  {" "}
                  {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                </h2>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </section>
      </InfiniteScroll>
    </>
  );
};

export default Main;
