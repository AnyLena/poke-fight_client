import { useContext, useState } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";
import { Button } from "@mui/material";
import UserAndPassword from "./UserAndPassword";
import axios from "axios";
import "../../styles/Form.css";


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
    setMessage(`Welcome back, ${response.data.username}.`);
    setUser(response.data);
    setTimeout(() => {
      setUserIsLoggedIn(true);
    }, 2000);
  } catch (error) {
    setErrorMessage(error.response.data.message);
  }
};

const LogIn = ({ setMessage, setErrorMessage, submitted, setSubmitted }) => {
  const SERVER = import.meta.env.SERVER
  const { setUser, userIsLoggedIn, setUserIsLoggedIn } =
    useContext(PokemonContext);
  const [input, setInput] = useState({});

  const handleChange = (key, value) => {
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorMessage(null);
    setMessage(null);
    fetchUser(input, setUser, setMessage, setUserIsLoggedIn, setErrorMessage);
  };

  return (
    <>
      {!userIsLoggedIn && (
        <>
          <div className="login">
            <form onSubmit={handleSubmit}>
              <UserAndPassword
                handleChange={handleChange}
                input={input}
                submitted={submitted}
              />
              <Button submitted={submitted} type="submit" variant="contained">
                Log in
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default LogIn;
