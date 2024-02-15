import { useState, useEffect, useContext } from "react";
import "../styles/Main.css";
import PokemonModal from "./PokemonModal";
import "../styles/Pokeball.css";

import InfiniteScroll from "react-infinite-scroller";
import { PokemonContext } from "../provider/PokemonProvider";
import Grid from "./Grid";

const Main = () => {
  const SERVER = import.meta.env.VITE_SERVER
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [lang, setLang] = useState("en");
  const [type, setType] = useState("");

  const { user, setUser } = useContext(PokemonContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPokemon = async () => {
    const limit = 25;
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
      setOffset((prev) => prev + 25);
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
        hasMore={offset <= 125}
        loader={
          <div className="loader" key={0}>
            <div className="pokeball"></div>
          </div>
        }
      >
        {!loading ? (
          <div className="select-box">
            <label htmlFor="lang">Display Pokémon Names in</label>
            <select
              name="lang"
              id="lang"
              onChange={(event) => setLang(event.target.value)}
            >
              <option value="en"> 🇺🇸 🇬🇧 English</option>
              <option value="jp"> 🇯🇵 Japanese</option>
              <option value="ko"> 🇰🇷 Korean</option>
              <option value="ch"> 🇨🇳 Chinese</option>
              <option value="de"> 🇩🇪 German</option>
              <option value="fr"> 🇫🇷 Fench</option>
              <option value="it"> 🇮🇹 Italian</option>
              <option value="es"> 🇪🇸 Spanish</option>
            </select>
          </div>
        ) : null}
        {/* {!loading ? (
          <div className="select-box">
            <label htmlFor="type">Filter Pokémons by type</label>
            <select
              name="type"
              id="type"
              onChange={(event) => setType(event.target.value)}
            >
              <option style={{backgroundColor: '#a8b820'}} value="Bug">Bug</option>
              <option style={{backgroundColor: '#705848'}} value="Dark">Dark</option>
              <option style={{backgroundColor: '#7038f8'}} value="Dragon">Dragon</option>
              <option style={{backgroundColor: '#f8d030'}} value="Electric">Electric</option>
              <option style={{backgroundColor: '#ee99ac'}} value="Fairy">Fairy</option>
              <option style={{backgroundColor: '#c03028'}} value="Fighting">Fighting</option>
              <option style={{backgroundColor: '#f08030'}} value="Fire">Fire</option>
              <option style={{backgroundColor: '#a890f0'}} value="Flying">Flying</option>
              <option style={{backgroundColor: '#705898'}} value="Ghost">Ghost</option>
              <option style={{backgroundColor: '#78c850'}} value="Grass">Grass</option>
              <option style={{backgroundColor: '#e0c068'}} value="Ground">Ground</option>
              <option style={{backgroundColor: '#98d8d8'}} value="Ice">Ice</option>
              <option style={{backgroundColor: '#a8a878'}} value="Normal">Normal</option>
              <option style={{backgroundColor: '#a040a0'}} value="Poison">Poison</option>
              <option style={{backgroundColor: '#f85888'}} value="Psychic">Psychic</option>
              <option style={{backgroundColor: '#b8a038'}} value="Rock">Rock</option>
              <option style={{backgroundColor: '#b8b8d0'}} value="Steel">Steel</option>
              <option style={{backgroundColor: '#7cc7b2'}} value="Stellar">Stellar</option>
              <option style={{backgroundColor: '#6890f0'}} value="Water">Water</option>
            </select>
          </div>
        ) : null} */}
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
