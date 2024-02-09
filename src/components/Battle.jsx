import { useState, useEffect } from "react";
import "../styles/Battle.css";
import "../styles/Pokeball.css";

const Battle = () => {
  const [myPokemon, setMyPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [myHp, setMyHp] = useState(null);
  const [opponentHp, setOpponentHp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fightText, setFightText] = useState("");
  const [opponentHpRate, setOpponentHpRate] = useState(100);
  const [trainerHpRate, setTrainerHpRate] = useState(100);

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
    if (myHp !== null && myHp <= 0) {
      setFightText("FOE defeated TRAINER. TRAINER faints");
      setTimeout(() => {
        getMyPokemon();
        getOpponentPokemon();
      }, 4000);
    } else if (opponentHp !== null && opponentHp <= 0) {
      setFightText("TRAINER defeats FOE. TRAINER wins!");
      setTimeout(() => {
        getOpponentPokemon();
      }, 4000);
    }
  }, [myHp]);

  useEffect(() => {
    let text;
    opponentPokemon
      ? (text = `A wild ${opponentPokemon.name.toUpperCase()} appeared!`)
      : null;
    setFightText(text);
    setOpponentHpRate(100);
  }, [opponentPokemon]);

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
    let trainerText = "You inflict " + myDamage + " DAMAGE";
    setFightText(trainerText);
    opponentHp - myDamage <= 0
      ? setOpponentHp(0)
      : setOpponentHp((prevState) => prevState - myDamage);
    setOpponentHpRate(
      (prev) => (opponentHp / opponentPokemon.stats[0].base_stat) * 100
    );

    // Opponent's turn
    setTimeout(() => {
      const opponentDamage = calculateDamage(opponentPokemon, myPokemon);
      console.log("Opponent Damage", opponentDamage);
      let opponentText = `Foe ${opponentPokemon.name.toUpperCase()} inflicts ${opponentDamage} DAMAGE`;
      setFightText(opponentText);
      myHp - opponentDamage <= 0
        ? setMyHp(0)
        : setMyHp((prevState) => prevState - opponentDamage);
      setTrainerHpRate((prev) => (myHp / myPokemon.stats[0].base_stat) * 100);
    }, 2000);
  };

  return (
    <div className="battle">
      <h1 className="display-none">Battle</h1>
      {loading && <div className="pokeball"></div>}
      {myPokemon && opponentPokemon && (
        <div>
          <section className="opponent">
            {/* <h2>Opponent Pokemon</h2> */}
            <div className="stat-box">
              <h2>
                {opponentPokemon.name.slice(0, 1).toUpperCase() +
                  opponentPokemon.name.slice(1)}
              </h2>
              <div className="health-container hp-opponent">
                <p className="health-hp">HP</p>
                <div className="health-back"></div>
                {opponentHpRate ? (
                  <div
                    style={{ width: `${opponentHpRate}%` }}
                    className="health-bar"
                  ></div>
                ) : null}
              </div>
              {opponentPokemon ? (
                <p className="hp">
                  {opponentHp}/{opponentPokemon.stats[0].base_stat} HP
                </p>
              ) : null}
            </div>
            {/* <h3>{opponentPokemon.stats[1].base_stat} Attack</h3>
            <h3>{opponentPokemon.stats[2].base_stat} Defense</h3> */}
            <img
              src={
                opponentPokemon.sprites.other.showdown.front_default ||
                opponentPokemon.sprites.front_default
              }
              alt={opponentPokemon.name}
            />
            <div className="circle"></div>
          </section>

          <section className="trainer">
            <img
              src={
                myPokemon.sprites.other.showdown.back_default ||
                myPokemon.sprites.front_default
              }
              alt={myPokemon.name}
            />
            <div className="circle"></div>
            {/* <h2>My Pokemon</h2> */}
            <div className="stat-box">
              <h2>
                {myPokemon.name.slice(0, 1).toUpperCase() +
                  myPokemon.name.slice(1)}
              </h2>
              <div className="health-container hp-triner">
                <p className="health-hp">HP</p>
                <div className="health-back"></div>
                {trainerHpRate ? (
                  <div
                    style={{ width: `${trainerHpRate}%` }}
                    className="health-bar"
                  ></div>
                ) : null}
              </div>
              {myPokemon ? (
                <p className="hp">
                  {myHp}/{myPokemon.stats[0].base_stat} HP{" "}
                </p>
              ) : null}
            </div>
            {/* <h3>{myPokemon.stats[1].base_stat} Attack</h3>
            <h3>{myPokemon.stats[2].base_stat} Defense</h3> */}
          </section>
          <section className="text-box">
            <p> {fightText} </p>
          </section>

          <button onClick={startFight}>Fight</button>
          <button onClick={() => getMyPokemon()}>New Pokemon</button>
          <button onClick={() => getOpponentPokemon()}>New Opponent</button>
        </div>
      )}
    </div>
  );
};

export default Battle;
