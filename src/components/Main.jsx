import { useState, useEffect } from "react";

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div>
        {pokemon.length > 0 ? (
          pokemon.map((poke) => (
            <>
              <h2> {poke.name.english}</h2>
              <p>No. {poke.id}</p>
              <p>No. {poke.type.map((type) => (type))}</p>
            </>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Main;
