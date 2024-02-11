import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const UserAndPassword = ({ handleChange, input, submitted }) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        name="username"
        type="text"
        error={submitted && !input.username}
        sx={{
          transition: "all 0.3s ease",
        }}
        
      />
      <TextField
        required
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        name="password"
        type="password"
        error={submitted && !input.username}
        sx={{
          transition: "all 0.3s ease",
        }}
      />
    </Box>
  );
};

export default UserAndPassword;
