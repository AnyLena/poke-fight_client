import React, { useState } from "react";
import FormToggle from "./FormToggle.jsx";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Message from "./Message";
import "../../styles/Form.css";

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="form">
      <FormToggle isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      {isSignUp ? (
        <SignUp
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
      ) : (
        <LogIn
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
      )}
      {message && <Message message={message} severity="success" />}
      {errorMessage && <Message message={errorMessage} severity="error" />}
    </div>
  );
};

export default Form;
