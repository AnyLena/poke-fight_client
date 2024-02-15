import { useState, useContext } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";
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
    setMessage(response.data.message);
  } catch (error) {
    setErrorMessage(error.response.data.message);
  }
};

const SignUp = ({setMessage, setErrorMessage, submitted, setSubmitted}) => {
  const SERVER = import.meta.env.SERVER
  const [input, setInput] = useState({
    username: "",
    password: "",
    pokemonId: 1,
  });
  const { userIsLoggedIn } = useContext(PokemonContext);
  const [imageIndex, setImageIndex] = useState(0);

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
    setErrorMessage(null);
    setMessage(null);
    createUser(input, setMessage, setErrorMessage);
  };

  const handleChange = (key, value) => {
    if (key === "pokemonId") {
      value = Number(value);
    }
    setInput({ ...input, [key]: value });
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
        </div>
      )}
    </>
  );
};

export default SignUp;
