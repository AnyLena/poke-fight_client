import { PokemonContext } from "../../provider/PokemonProvider";
import { useContext } from "react";

const Welcome = () => {
  const { user } = useContext(PokemonContext);
  return (
    <>
      <>
        <h2>Welcome {user.username}!</h2>
        <p>You have caught {user.pokemons.length - 1} Pokemons so far.</p>
      </>
    </>
  );
};

export default Welcome;
