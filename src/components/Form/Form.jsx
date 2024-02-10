import SignUp from "./SignUp";
import LogIn from "./LogIn";
import React, { useState, useContext } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";

const Form = () => {
  const { userIsLoggedIn } = useContext(PokemonContext);
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <>
      {isSignUp ? <SignUp /> : <LogIn />}
      {!userIsLoggedIn && (
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      )}
    </>
  );
};

export default Form;
