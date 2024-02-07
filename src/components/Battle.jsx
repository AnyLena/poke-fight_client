import { useState, useEffect } from "react";
import "../styles/Battle.css";

const Battle = () => {
  const [myPokemon, setMyPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [myHp, setMyHp] = useState(null);
  const [opponentHp, setOpponentHp] = useState(null);
  const [loading, setLoading] = useState(true);

  const randomNumber = (max) => Math.floor(Math.random() * max) + 1;

  const getMyPokemon = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/pokemon/${randomNumber(1000)}`
      );
      const data = await res.json();
      setMyPokemon(data);
      setMyHp(data.stats[0].base_stat);
      console.log("MyPokemon", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOpponentPokemon = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/pokemon/${randomNumber(1000)}`
      );
      const data = await res.json();
      setOpponentPokemon(data);
      setOpponentHp(data.stats[0].base_stat);
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
    if (myHp <= 0) {
      alert("You lose");
      getMyPokemon();
    } else if (opponentHp <= 0) {
      alert("You win");
      getOpponentPokemon();
    }
  }, [myHp]);

  const calculateDamage = (attacker, defender) => {
    let damage = Math.floor(
      (attacker.stats[1].base_stat - defender.stats[2].base_stat) /
        (Math.random() * 2 + 1)
    );
    damage <= 5 ? (damage = Math.floor(Math.random() * 4) + 1) : damage;
    return damage;
  };

  const startFight = () => {
    // My turn
    const myDamage = calculateDamage(myPokemon, opponentPokemon);
    console.log("My Damage", myDamage);
    setMyHp((prevState) => prevState - myDamage);

    // Opponent's turn
    const opponentDamage = calculateDamage(opponentPokemon, myPokemon);
    console.log("Opponent Damage", opponentDamage);
    setOpponentHp((prevState) => prevState - opponentDamage);
  };

  return (
    <div className="battle">
      <h1>Battle</h1>
      {loading && <div className="pokeball"></div>}
      {myPokemon && opponentPokemon && (
        <div>
          <h2>My Pokemon</h2>
          <h3>{myPokemon.name}</h3>
          <h3>{myHp} HP</h3>
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
          <h3>{opponentHp} HP</h3>
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
