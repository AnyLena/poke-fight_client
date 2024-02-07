import { useState, useEffect } from "react";

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
    if (myPokemon && opponentPokemon) {
      console.log("My Pokemon", myPokemon);
      console.log("Opponent Pokemon", opponentPokemon);
    }
  }, [myPokemon, opponentPokemon]);

  useEffect(() => {
    if (myPokemon && myPokemon.stats[0].base_stat === 0) {
      alert("You lose!");
      return;
    } else if (opponentPokemon && opponentPokemon.stats[0].base_stat === 0) {
      alert("You win!");
      return;
    }
  }, [myPokemon, opponentPokemon]);

  const startFight = () => {
    // My turn
    let myDamage =
      (myPokemon.stats[1].base_stat - opponentPokemon.stats[2].base_stat) / 2;
    if (myDamage < 0) {
      myDamage = Math.floor(Math.random() * 10) + 1;
    }

    console.log("My Attack", myPokemon.stats[1].base_stat);
    console.log("Opponent Defense", opponentPokemon.stats[2].base_stat);
    console.log("My Damage", myDamage);

    setOpponentPokemon((prevState) => ({
      ...prevState,
      stats: prevState.stats.map((stat) =>
        stat.stat.name === "hp"
          ? { ...stat, base_stat: Math.max(0, stat.base_stat - myDamage) }
          : stat
      ),
    }));

    // Opponent's turn
    let opponentDamage =
      (opponentPokemon.stats[1].base_stat - myPokemon.stats[2].base_stat) / 2;
    if (opponentDamage < 0) {
      opponentDamage = Math.floor(Math.random() * 10) + 1;
    }
    console.log("Opponent Attack", opponentPokemon.stats[1].base_stat);
    console.log("My Defense", myPokemon.stats[2].base_stat);
    console.log("Opponent Damage", opponentDamage);
    setMyPokemon((prevState) => ({
      ...prevState,
      stats: prevState.stats.map((stat) =>
        stat.stat.name === "hp"
          ? { ...stat, base_stat: Math.max(0, stat.base_stat - opponentDamage) }
          : stat
      ),
    }));
  };

  return (
    <>
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
            src={myPokemon.sprites.front_default}
            alt={myPokemon.name}
          />
          <h2>Opponent Pokemon</h2>
          <h3>{opponentPokemon.name}</h3>
          <h3>{opponentPokemon.stats[0].base_stat} HP</h3>
          <h3>{opponentPokemon.stats[1].base_stat} Attack</h3>
          <h3>{opponentPokemon.stats[2].base_stat} Defense</h3>
          <img
            style={{ width: "100px" }}
            src={opponentPokemon.sprites.front_default}
            alt={opponentPokemon.name}
          />
          <button onClick={startFight}>Fight</button>
        </div>
      )}
    </>
  );
};

export default Battle;
