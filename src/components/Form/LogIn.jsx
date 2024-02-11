import React, { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";
import { SERVER } from "../../constants/server";
import axios from "axios";
import "../../styles/Form.css";
import UserAndPassword from "./UserAndPassword";
import { Button } from "@mui/material";

const fetchUser = async (
  input,
  setUser,
  setMessage,
  setUserIsLoggedIn,
  setErrorMessage
) => {
  try {
    const response = await axios.get(
      `${SERVER}/user?username=${input.username}&password=${input.password}`
    );
    setErrorMessage(null);
    setMessage(`Welcome back, ${response.data.username}.`);
    setUser(response.data);
    setTimeout(() => {
      setUserIsLoggedIn(true);
    }, 2000);
  } catch (error) {
    console.log(error);
    setMessage(null);
    setErrorMessage(error.response.data.message);
  }
};

const LogIn = () => {
  const { setUser, userIsLoggedIn, setUserIsLoggedIn } =
    useContext(PokemonContext);

  const [input, setInput] = useState({});
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, value) => {
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    fetchUser(input, setUser, setMessage, setUserIsLoggedIn, setErrorMessage);
  };

  useEffect(() => {
    setMessage(null);
  }, []);

  return (
    <>
      {!userIsLoggedIn && (
        <>
          <div className="login">
            <form onSubmit={handleSubmit}>
              <UserAndPassword handleChange={handleChange} input={input} />
              <Button submitted={submitted} type="submit" variant="contained">
                Log in
              </Button>
            </form>
          </div>
          {message && <p className="message">{message}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </>
      )}
    </>
  );
};

export default LogIn;
