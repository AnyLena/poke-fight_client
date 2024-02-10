import SignUp from "./SignUp";
import LogIn from "./LogIn";
import React, { useState, useContext } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";
import FormToggle from './FormToggle.jsx'
import "../../styles/Form.css"

const Form = () => {
  const { userIsLoggedIn } = useContext(PokemonContext);
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="form">
      {!userIsLoggedIn && (
        <FormToggle isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>
      )}
      {isSignUp ? <SignUp /> : <LogIn />}
    </div>
  );
};

export default Form;
