import { PokemonContext } from "../../provider/PokemonProvider";
import { useContext, useState, useEffect } from "react";
import { SERVER } from "../../constants/server";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import Grid from "../Grid";

const MyPokemons = () => {
  const { user, setUser, userIsLoggedIn } = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentChunk, setCurrentChunk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [team, setTeam] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const promises = currentChunk.map((id) =>
        axios.get(`${SERVER}/pokemon/${id}`)
      );
      const rawData = await Promise.all(promises);
      const data = rawData.map((item) => item.data);
      setPokemon((prev) => [...prev, ...data]);
      setOffset((prev) => prev + 25);
      setCurrentChunk(user.pokemons.slice(offset, offset + 25));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.team) {
      setTeam(user.team);
    }
    if (pokemon.length <= offset) {
      fetchPokemons();
    }
  }, [user]);

  const updateUser = async (newTeam) => {
    try {
      await axios.put(`${SERVER}/user/${user._id}`, {
        ...user,
        team: newTeam,
      });
      setUser({ ...user, team: newTeam });
      console.log("Updating user", user._id, newTeam);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (poke) => {
    setSelectedPokemon(poke);
    if (team.length < 4 && !team.includes(poke)) {
      const newTeam = [...team, poke];
      setTeam(newTeam);
      if (userIsLoggedIn) {
        await updateUser(newTeam);
      }
    }
  };

  const handleRemove = async (poke) => {
    if (team.length <= 1) {
      return;
    }
    const newTeam = team.filter((p) => p.id !== poke.id);
    setTeam(newTeam);
    if (userIsLoggedIn) {
      await updateUser(newTeam);
    }
  };

  const loadMorePokes = () => {
    if (!loading) {
      fetchPokemons();
    }
  };

  return (
    <div>
      <h1>My Pokémons</h1>
      <h2>My Team</h2>
      <Grid pokemon={team} user={user} lang={lang} handleClick={handleRemove} />
      <h2>All my Pokémons</h2>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMorePokes}
        hasMore={offset <= 975}
        loader={
          <div className="loader" key={0}>
            <div className="pokeball"></div>
          </div>
        }
      >
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

export default MyPokemons;
