import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FormToggle({isSignUp, setIsSignUp}) {
  const [alignment, setAlignment] = React.useState('signup');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setIsSignUp(!isSignUp)
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Form type"
    >
      <ToggleButton value="signup">Sign Up</ToggleButton>
      <ToggleButton value="login">Log In</ToggleButton>
    </ToggleButtonGroup>
  );
}