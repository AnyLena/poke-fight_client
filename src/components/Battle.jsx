import { useState, useEffect } from "react";
import { SERVER } from "../constants/server";
import "../styles/Battle.css";
import "../styles/Pokeball.css";

const Battle = () => {
  //for Pokemon stats
  const [myPokemonId, setMyPokemonId] = useState();
  const [myPokemon, setMyPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [myHp, setMyHp] = useState(null);
  const [opponentHp, setOpponentHp] = useState(null);
  const [opponentId, setOpponentId] = useState(null);
  //for game status
  const [loading, setLoading] = useState(true);
  const [battleActive, setBattleActive] = useState(false);
  const [fightEnabled, setFightEnabled] = useState(true);
  // for battle animations
  const [fightText, setFightText] = useState("");
  const [opponentHpRate, setOpponentHpRate] = useState(100);
  const [trainerHpRate, setTrainerHpRate] = useState(100);

  const [caughtPokemon, setCaughtPokemon] = useState([]);

  const randomNumber = (max) => Math.floor(Math.random() * max) + 1;

  // FETCHING PKMN DATA FROM API
  const getMyPokemon = async (myPokemonId) => {
    try {
      const res = await fetch(`${SERVER}/pokemon/${myPokemonId}`);
      const data = await res.json();
      setMyPokemon(data);
      setMyHp(data.base.hp);
      console.log("MyPokemon", data);
    } catch (error) {
      console.log(error);
    }
  };


  const getOpponentPokemon = async () => {
    try {
      const res = await fetch(`${SERVER}/pokemon/${randomNumber(150)}`);
      const data = await res.json();
      setOpponentPokemon(data);
      setOpponentHp(data.base.hp);
      setOpponentId(data.id);
      console.log("Opponent Pokemon", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(false);
    setBattleActive(false);
  }, []);

  useEffect(() => {
    console.log(fightEnabled);
  }, [fightEnabled]);

  useEffect(() => {
    getMyPokemon(myPokemonId);
    {
      myPokemonId > 0 ? getOpponentPokemon() : null;
    }
    {
      myPokemonId > 0 ? setBattleActive(true) : setBattleActive(false);
    }
  }, [myPokemonId]);

  // CONTOLLING FIGHT STATUS
  useEffect(() => {
    let timeout;
    if (myHp !== null && myHp <= 0) {
      setFightText("FOE defeated TRAINER. TRAINER faints");
      timeout = setTimeout(() => {
        setBattleActive(false);
      }, 3000);
    } else if (opponentHp !== null && opponentHp <= 0) {
      setFightText("TRAINER defeats FOE. TRAINER wins!");
      setCaughtPokemon((prev) => {
        if (!prev.includes(opponentId)) {
          return [...prev, opponentId];
        } else {
          return prev;
        }
      });
      timeout = setTimeout(() => {
        setBattleActive(false);
      }, 4000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [myHp, opponentHp]);

  // CONTROLLING START OF NEW ROUND
  useEffect(() => {
    let text;
    opponentPokemon
      ? (text = `A wild ${opponentPokemon.name.en.toUpperCase()} appeared!`)
      : null;
    setFightText(text);
    setOpponentHpRate(100);
  }, [opponentPokemon]);

  useEffect(() => {
    setTrainerHpRate(100);
  }, [myPokemon]);

  // CALCULATING DAMAGE
  const calculateDamage = (attacker, defender) => {
    let damage = Math.floor(
      (10 + attacker.base.attack - defender.base.defense) /
        (Math.random() * 2 + 1)
    );
    damage <= 5 ? (damage = Math.floor(Math.random() * 4) + 1) : damage;
    return damage;
  };

  // SINGE FIGHT ROUND LOGIC
  const startFight = () => {
    // My turn
    setFightEnabled(false);
    const myDamage = calculateDamage(myPokemon, opponentPokemon);
    console.log("My Damage", myDamage);
    let trainerText = "You inflict " + myDamage + " DAMAGE";
    setFightText(trainerText);
    opponentHp - myDamage <= 0
      ? setOpponentHp(0)
      : setOpponentHp((prevState) => prevState - myDamage);
    setOpponentHpRate(
      (prev) => (opponentHp / opponentPokemon.base.hp) * 100
    );

    // Opponent's turn
    setTimeout(() => {
      const opponentDamage = calculateDamage(opponentPokemon, myPokemon);
      console.log("Opponent Damage", opponentDamage);
      let opponentText = `Foe ${opponentPokemon.name.en.toUpperCase()} inflicts ${opponentDamage} DAMAGE`;
      setFightText(opponentText);
      myHp - opponentDamage <= 0
        ? setMyHp(0)
        : setMyHp((prevState) => prevState - opponentDamage);
      setTrainerHpRate((prev) => (myHp / myPokemon.base.hp) * 100);
      setFightEnabled(true);
    }, 2000);
  };

  const fleeFight = () => {
    setBattleActive(false);
  };

  return (
    <div className="battle">
      <h1 className="display-none">Battle</h1>
      {loading && <div className="pokeball"></div>}
      <div>
        {/*ANIMATION FOR OPPONENT PKMN */}

        {opponentPokemon ? (
          <section className="opponent">
            {/* <h2>Opponent Pokemon</h2> */}
            <div className="stat-box">
              <h2>
                {opponentPokemon.name.en.slice(0, 1).toUpperCase() +
                  opponentPokemon.name.en.slice(1)}
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
                  {opponentHp}/{opponentPokemon.base.hp} HP
                </p>
              ) : null}
            </div>
            {battleActive ? (
              <img
                src={
                  opponentPokemon.sprites.other.showdown.front_default ||
                  opponentPokemon.sprites.front_default
                }
                alt={opponentPokemon.name.en}
              />
            ) : null}
            <div className="circle"></div>
          </section>
        ) : null}

        {/*ANIMATION FOR TRAINER PKMN*/}

        {myPokemon ? (
          <section className="trainer">
            {battleActive ? (
              <img
                src={
                  myPokemon.sprites.other.showdown.back_default ||
                  myPokemon.sprites.front_default
                }
                alt={myPokemon.name.en}
              />
            ) : null}
            <div className="circle"></div>
            <div className="stat-box">
              <h2>
                {myPokemon.name.en.slice(0, 1).toUpperCase() +
                  myPokemon.name.en.slice(1)}
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
                  {myHp}/{myPokemon.base.hp} HP{" "}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {/*TEXT BOX AND BUTTONS*/}

        <section className="text-box">
          {!battleActive ? (
            <>
              <p>Choose your Pokémon to start the game</p>
              <select
                name="pkmnId"
                id="pkmnId"
                onChange={(e) => setMyPokemonId(e.target.value)}
              >
                <option value="0">Choose</option>
                <option value="150">MewTwo</option>
                <option value="8">Charizard</option>
                <option value="123">Scyther</option>
              </select>
            </>
          ) : (
            <p> {fightText} </p>
          )}
        </section>

        {battleActive && fightEnabled ? (
          <button onClick={startFight}>Fight</button>
        ) : null}
        {battleActive && fightEnabled ? (
          <button onClick={fleeFight}>Flee</button>
        ) : null}
        {/* <button onClick={() => getMyPokemon()}>New Pokemon</button>
          <button onClick={() => getOpponentPokemon()}>New Opponent</button> */}
        <p>Caught Pokémon: {caughtPokemon.map((poke) => poke + ", ")}</p>
      </div>
    </div>
  );
};

export default Battle;
