import { useState, useContext } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";
import { SERVER } from "../../constants/server";
import axios from "axios";
import "../../styles/Form.css";
import UserAndPassword from "./UserAndPassword";
import { Button } from "@mui/material";
import ModalGallery from "../ModalGallery";
import bulbasaur from "../../assets/1.gif";
import charmander from "../../assets/4.gif";
import squirtle from "../../assets/7.gif";

const createUser = async (user, setMessage, setErrorMessage) => {
  try {
    const response = await axios.post(`${SERVER}/user/`, user);
    console.log(`Server responded`, response.data);
    setErrorMessage(null);
    setMessage(response.data.message);
  } catch (error) {
    setMessage(null);
    setErrorMessage(error.response.data.message);
  }
};

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    pokemonId: 1,
  });
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { userIsLoggedIn } = useContext(PokemonContext);
  const [imageIndex, setImageIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const images = [bulbasaur, charmander, squirtle];
  const pokemonNames = {
    1: "Bulbasaur",
    4: "Charmander",
    7: "Squirtle",
  };

  const handleNext = () => {
    setImageIndex((index) => {
      let newIndex = index === images.length - 1 ? 0 : index + 1;
      handleChange("pokemonId", newIndex === 0 ? 1 : newIndex === 1 ? 4 : 7);
      return newIndex;
    });
  };
  const handlePrevious = () => {
    setImageIndex((index) => {
      let newIndex = index === 0 ? images.length - 1 : index - 1;
      handleChange("pokemonId", newIndex === 0 ? 1 : newIndex === 1 ? 4 : 7);
      return newIndex;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    createUser(input, setMessage, setErrorMessage);
  };

  const handleChange = (key, value) => {
    if (key === "pokemonId") {
      value = Number(value);
    }
    setInput({ ...input, [key]: value });
    console.log(input);
  };

  return (
    <>
      {!userIsLoggedIn && (
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <UserAndPassword
              handleChange={handleChange}
              input={input}
              submitted={submitted}
            />

            <label>Select your starting Pokemon</label>

            <ModalGallery
              images={images}
              imageIndex={imageIndex}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
            <p className="pokemon-name">{pokemonNames[input.pokemonId]}</p>
            <Button type="submit" variant="contained">
              Sign up
            </Button>
          </form>
          {message && <p className="message">{message}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      )}
    </>
  );
};

export default SignUp;
