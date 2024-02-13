import { PokemonContext } from "../../provider/PokemonProvider";
import { useContext, useState, useEffect } from "react";
import { SERVER } from "../../constants/server";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import Grid from "../Grid";
import "../../styles/MyPokemons.css";
import Message from "../Form/Message";

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
  const [message, setMessage] = useState("");

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

  const handleAdd = async (poke) => {
    setSelectedPokemon(poke);
    if (team.length < 4 && !team.some((p) => p.id === poke.id)) {
      const newTeam = [...team, poke];
      setTeam(newTeam);
      if (userIsLoggedIn) {
        await updateUser(newTeam);
      }
    } else if (team.some((p) => p.id === poke.id)) {
      setMessage("You already have this Pokémon in your team");
    } else {
      setMessage("You can only have 4 Pokémon in your team");
    }
  };

  const handleRemove = async (poke) => {
    if (team.length <= 1) {
      setMessage("You need at least one Pokémon in your team");
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
      <div className="myteam">
        <h2>My Team</h2>
        <Grid
          pokemon={team}
          user={user}
          lang={lang}
          handleClick={handleRemove}
          key="myteam"
        />
        {message && <Message message={message} severity="error" />}
      </div>
      <div className="allpokes">
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
              handleClick={handleAdd}
              key="allpokes"
            />
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MyPokemons;
