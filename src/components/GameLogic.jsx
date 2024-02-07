import { useEffect, useState } from "react";

const GameLogic = () => {
  const [poke1, setPoke1] = useState({ attack: 45, defense: 50, hp: 50 });
  const [poke2, setPoke2] = useState({ attack: 50, defense: 45, hp: 50 });
  const [winner, setWinner] = useState("");
  const [myHP, setMyHP] = useState(poke1.hp);
  const [oppHP, setOppHP] = useState(poke2.hp);

  const fightMe = (myHP, oppHP) => {
    let attack = Math.floor(poke1.attack + poke1.attack * Math.random());
    let defense = Math.floor(poke2.defense + poke2.defense * Math.random());
    let result = attack - defense;
    console.log('You: '+attack,defense,result)
    if (result > 0) {
      let oppHPs = oppHP - Math.abs(result);
      console.log('You make ' + result +' damage. Your HP: '+ myHP + ' Opponent HP: '+oppHPs);
      oppHPs > 0 ? fightOpp(myHP, oppHPs) : endFight();
    } else {
        console.log("no damage")
        fightOpp(myHP, oppHP);
    }
  };

  const fightOpp = (myHP, oppHP) => {
    let attack = Math.floor(poke2.attack + poke2.attack * Math.random());
    let defense = Math.floor(poke1.defense + poke1.defense * Math.random());
    let result = attack - defense;
    console.log('Opponent: '+attack,defense,result)
    if (result > 0) {
      let myHPs = myHP - Math.abs(result);
      console.log('Opponent makes ' + result +' damage. Your HP: '+myHPs + ' Opponent HP: '+oppHP);
      myHPs > 0 ? fightMe(myHPs, oppHP) : endFight();
    } else {
      console.log("no damage")
      fightMe(myHP,oppHP)
    }
  };

  const endFight = () => {
    console.log('End of fight.')
  }

  useEffect(() => {
    fightMe(50,50);
  }, []);

  return (
    <>
      <div>
        Poke1: att {poke1.attack} def {poke1.defense} hp: {poke1.hp}
      </div>
      <div>
        Poke2: att {poke2.attack} def {poke2.defense} hp: {poke2.hp}
      </div>
      <div>Winner: {winner}</div>
    </>
  );
};

export default GameLogic;
