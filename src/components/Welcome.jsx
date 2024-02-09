import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../provider/PokemonProvider";
import { SERVER } from "../constants/server";
import axios from "axios";

const Welcome = () => {
  const { user, userIsLoggedIn, setUserIsLoggedIn } = useContext(PokemonContext);
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const arrayOfPromises = user.pokemons.map((id) => {
        return axios.get(`${SERVER}/pokemon/${id}`);
      });
      const arrayOfResponses = await Promise.all(arrayOfPromises);
      const arrayOfData = arrayOfResponses.map((res) => res.data);
      console.log(arrayOfData);
      setPokemons(arrayOfData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userIsLoggedIn) fetchPokemons();
  }, [userIsLoggedIn]);

  const handleLogOut = () => {
    setUserIsLoggedIn(false);
    setUser({});
  };

  return (
    <div>
      {userIsLoggedIn && (
        <>
          <button onClick={handleLogOut}>Log Out</button>
          <h2>Welcome {user.username}!</h2>
          <h3>Your pokemons:</h3>
          {pokemons.map((poke) => {
            return (
              <>
                <p key={poke.id}>{poke.name.en}</p>
                <img
                  key={poke.id}
                  src={poke.sprites.front_default}
                  alt={poke.name.en}
                />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Welcome;
