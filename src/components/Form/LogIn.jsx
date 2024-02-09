import React, { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";
import { SERVER } from "../../constants/server";
import axios from "axios";
import "../../styles/Form.css";

const fetchUser = async (input, setUser, setMessage, setUserIsLoggedIn) => {
  try {
    const response = await axios.get(
      `${SERVER}/user?username=${input.username}&password=${input.password}`
    );
    setMessage("User logged in.");
    setUser(response.data);
    setUserIsLoggedIn(true);
  } catch (error) {
    console.log(error);
    setMessage(error.response.data.message);
  }
};

const LogIn = () => {
  const { user, setUser, userIsLoggedIn, setUserIsLoggedIn } =
    useContext(PokemonContext);

  const [input, setInput] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (key, value) => {
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser(input, setUser, setMessage, setUserIsLoggedIn);
  };

  useEffect(() => {
    setMessage(null);
  }, []);

  return (
    <>
      {!userIsLoggedIn && (
        <>
          <div className="login">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username
                <input
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                />
              </label>
              <label>
                Password
                <input
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </label>
              <button type="submit">Log in</button>
            </form>
          </div>
          {message && <p>{message}</p>}
        </>
      )}
    </>
  );
};

export default LogIn;
