import { useState, useEffect, useContext } from "react";
import "../styles/Main.css";
import PokemonModal from "./PokemonModal";
import "../styles/Pokeball.css";
import { SERVER } from "../constants/server";
import InfiniteScroll from "react-infinite-scroller";
import { PokemonContext } from "../provider/PokemonProvider";
import Grid from "./Grid";

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [lang, setLang] = useState("en");

  const { user, setUser } = useContext(PokemonContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPokemon = async () => {
    const limit = 50;
    try {
      const res = await fetch(
        `${SERVER}/pokemon?offset=${offset}&limit=${limit}`
      );
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
  };

  return (
    <div>
      <PokemonModal
        open={open}
        handleClose={handleClose}
        selectedPokemon={selectedPokemon}
        lang={lang}
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
       { !loading ? <div className="language">
          <label htmlFor="lang">Display Pokémon Names in</label>
          <select
            name="lang"
            id="lang"
            onChange={(event) => setLang(event.target.value)}
          >
            <option value="en"><span className="flag"> 🇺🇸 🇬🇧 </span> English</option>
            <option value="jp"> 🇯🇵 Japanese</option>
            <option value="ko"> 🇰🇷 Korean</option>
            <option value="ch"> 🇨🇳 Chinese</option>
            <option value="de"> 🇩🇪 German</option>
            <option value="fr"> 🇫🇷 Fench</option>
            <option value="it"> 🇮🇹 Italian</option>
            <option value="es"> 🇪🇸 Spanish</option>
          </select>
        </div> : null}
        {pokemon && (
          <Grid
            pokemon={pokemon}
            user={user}
            lang={lang}
            handleClick={handleClick}
          />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Main;
