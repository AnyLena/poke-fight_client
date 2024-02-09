import { createContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const value = {
    user,
    setUser,
    userIsLoggedIn,
    setUserIsLoggedIn
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

// {_id: "60e6f0e", username: "Moustafa", password: "123", pokemons: [1, 2, 3, 4, 5], battles: [{pokemon: 1, opponent: 45, win: false, date: dateStamp}, {pokemon: 2, opponent": 34, win: true, dateStamp: dateStamp}]}

// We ask the user for user and passwod
// The server checks if the user exists in the database.
// MongoDB query: db.users.findOne({username: "Moustafa", password: "123"})
// If the user exists, it sends back the user object

// To add a Pokemon to the user's pokemons array:
// try {
//   const data = await User.updateOne(
//     { _id: userId },
//     { $push: { pokemons: numberToAdd } }
//   );
// }

// to use the context in a component:
// import { useContext } from "react";
// import { PokemonContext } from "../provider/PokemonProvider";
//
// const { user, setUser } = useContext(PokemonContext);
