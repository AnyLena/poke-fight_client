import { useState, useContext } from "react";
import { PokemonContext } from "../../provider/PokemonProvider";
import { SERVER } from "../../constants/server";
import axios from "axios";
import "../../styles/Form.css";

const createUser = async (user, setMessage) => {
  try {
    const response = await axios.post(`${SERVER}/user/`, user);
    console.log(`Server responded`, response.data);
    setMessage(response.data.message);
  } catch (error) {
    setMessage(error.response.data.message);
  }
};

const SignUp = () => {
  const [input, setInput] = useState({});
  const [message, setMessage] = useState(null);
  const { userIsLoggedIn } = useContext(PokemonContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(input, setMessage);
  };

  const handleChange = (key, value) => {
    setInput({ ...input, [key]: value });
    console.log(input);
  };

  return (
    <>
      {!userIsLoggedIn && (
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
              Username
              <input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="username"
                type="text"
                placeholder="Username"
                required
              />
            </label>
            <label>
              Password
              <input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </label>
            <label>
              Select starting Pokemon
              <select
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                name="pokemonId"
                required
              >
                <option disabled selected value="">
                  Select a Pokemon
                </option>
                <option value="1">Bulbasaur</option>
                <option value="4">Charmander</option>
                <option value="7">Squirtle</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </>
  );
};

export default SignUp;
