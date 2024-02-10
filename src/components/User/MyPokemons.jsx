import { PokemonContext } from "../../provider/PokemonProvider";
import { useContext, useState, useEffect } from "react";
import { SERVER } from "../../constants/server";
import axios from "axios";

const MyPokemons = () => {
  const { user, userIsLoggedIn } = useContext(PokemonContext);
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

  return (
    <div>
      <h1>My Pokemons</h1>
      {userIsLoggedIn &&
        pokemons.map((poke) => {
          return (
            <>
              <p key={poke.id}>
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </p>
              <img
                key={poke.id}
                src={poke.sprites.front_default}
                alt={poke.name.en}
              />
            </>
          );
        })}
    </div>
  );
};

export default MyPokemons;
