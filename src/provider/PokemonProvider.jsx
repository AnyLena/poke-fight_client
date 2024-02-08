import { createContext, useState, useEffect } from "react";
import { SERVER } from "../constants/server";
import axios from "axios";

export const PokemonContext = createContext();

const fetchUser = async () => {
  try {
    const response = await axios.get(`${SERVER}/user/`, {
      params: {
        name: user.name,
        password: user.password,
      },
    });
    setUser(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const PokemonProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  const value = {
    user,
    setUser,
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
