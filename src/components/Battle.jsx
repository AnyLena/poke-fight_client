import { useState, useEffect } from "react";
import "../styles/Battle.css";

const Battle = () => {
  const [myPokemon, setMyPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getMyPokemon = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/pokemon/${randomNumber(1, 50)}`
      );
      const data = await res.json();
      setMyPokemon(data);
      console.log("MyPokemon", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOpponentPokemon = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/pokemon/${randomNumber(1, 50)}`
      );
      const data = await res.json();
      setOpponentPokemon(data);
      console.log("Opponent Pokemon", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyPokemon();
    getOpponentPokemon();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (myPokemon && myPokemon.stats[0].base_stat === 0) {
      alert("You lose!");
      return;
    } else if (opponentPokemon && opponentPokemon.stats[0].base_stat === 0) {
      alert("You win!");
      return;
    }
  }, [myPokemon, opponentPokemon]);

  const calculateDamage = (attacker, defender) => {
    let damage = Math.floor(
      (attacker.stats[1].base_stat - defender.stats[2].base_stat) /
        (Math.random() * 2 + 1)
    );
    damage <= 5 ? (damage = Math.floor(Math.random() * 4) + 1) : damage;
    return damage;
  };

  const updatePokemonStats = (pokemon, damage) => ({
    ...pokemon,
    stats: pokemon.stats.map((stat) =>
      stat.stat.name === "hp"
        ? { ...stat, base_stat: Math.max(0, stat.base_stat - damage) }
        : stat
    ),
  });

  const startFight = () => {
    // My turn
    const myDamage = calculateDamage(myPokemon, opponentPokemon);
    console.log("My Damage", myDamage);
    setOpponentPokemon((prevState) => updatePokemonStats(prevState, myDamage));

    // Opponent's turn
    const opponentDamage = calculateDamage(opponentPokemon, myPokemon);
    console.log("Opponent Damage", opponentDamage);
    setMyPokemon((prevState) => updatePokemonStats(prevState, opponentDamage));
  };

  return (
    <div className="battle">
      <h1>Battle</h1>
      {loading && <div className="pokeball"></div>}
      {myPokemon && opponentPokemon && (
        <div>
          <h2>My Pokemon</h2>
          <h3>{myPokemon.name}</h3>
          <h3>{myPokemon.stats[0].base_stat} HP</h3>
          <h3>{myPokemon.stats[1].base_stat} Attack</h3>
          <h3>{myPokemon.stats[2].base_stat} Defense</h3>
          <img
            style={{ width: "100px" }}
            src={
              myPokemon.sprites.other.showdown.back_default ||
              myPokemon.sprites.front_default
            }
            alt={myPokemon.name}
          />
          <h2>Opponent Pokemon</h2>
          <h3>{opponentPokemon.name}</h3>
          <h3>{opponentPokemon.stats[0].base_stat} HP</h3>
          <h3>{opponentPokemon.stats[1].base_stat} Attack</h3>
          <h3>{opponentPokemon.stats[2].base_stat} Defense</h3>
          <img
            style={{ width: "100px" }}
            src={
              opponentPokemon.sprites.other.showdown.front_default ||
              opponentPokemon.sprites.front_default
            }
            alt={opponentPokemon.name}
          />
          <button onClick={startFight}>Fight</button>
          <button onClick={() => getMyPokemon()}>New Pokemon</button>
          <button onClick={() => getOpponentPokemon()}>New Opponent</button>
        </div>
      )}
    </div>
  );
};

export default Battle;
