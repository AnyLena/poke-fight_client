import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function FormToggle({ setIsSignUp }) {
  const [alignment, setAlignment] = useState("signup");

  const handleChange = (value) => {
    setAlignment(value);
    setIsSignUp(value === "signup");
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      aria-label="Form type"
    >
      <ToggleButton
        onClick={(e) => handleChange(e.target.value)}
        value="signup"
      >
        Sign Up
      </ToggleButton>
      <ToggleButton onClick={(e) => handleChange(e.target.value)} value="login">
        Log In
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
