import React, { useState, useEffect } from "react";
import { SERVER } from "../constants/server";
import "../styles/HighScores.css";

const HighScores = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER}/user/all`);
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      <div className="high-scores">
      <h1>Ranking</h1>
      <h2>Top 10 Pokémon catchers</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span className="user">{user.username}</span>
              <span className="user">{user.pokemons.length}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HighScores;
