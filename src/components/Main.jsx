import { useState, useEffect } from "react";
import "../styles/Main.css";

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

  const getTypeColor = (type) => {
    switch (type) {
      case "Fire":
        return "red";
      case "Water":
        return "blue";
      case "Grass":
        return "green";
      case "Bug":
        return "violet";
      case "Flying":
        return "lightblue";
      case "Poison":
        return "darkviolet";
      case "Electric":
        return "yellow";
      case "Ground":
        return "brown";
      case "Fairy":
        return "pink";
      case "Fighting":
        return "grey";
      case "Psychic":
        return "lightblue";
      case "Bug":
        return "violet";
      case "Rock":
        return "darkbrown";
      case "Steel":
        return "grey";
      case "Ice":
        return "iceblue";
      case "Ghost":
        return "violet";
      default:
        return "lightgray";
    }
  };

  return (
    <>
      <section className="pokedex-grid">
        {pokemon.length > 0 ? (
          pokemon.map((poke) => (
            <div
              key={poke.id}
              className="poke-card"
            //   style={{ backgroundColor: getTypeColor(poke.type[0]) }}
            style={{
                background: `linear-gradient(to right, ${getTypeColor(poke.type[0])} 50%, ${getTypeColor(poke.type[1] || poke.type[0])} 50%)`
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
